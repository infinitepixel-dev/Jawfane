//WINDOWS
//nodemon --exec "cls && node" ./productServer.js

/* eslint-disable no-undef */
// Import dependencies
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer"); // For handling file uploads
const sharp = require("sharp");
const dotenv = require("dotenv");
const Stripe = require("stripe"); // Import Stripe

// Import the dynamic pool creation function
const createPoolWithDB = require("./createPoolWithDB");

dotenv.config();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

// Add this CORS configuration to allow React on port 5173
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://66.128.253.47:5173",
        "https://vps.infinitepixel.dev",
      ];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Configure multer for handling file uploads (store image in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to dynamically select the correct database based on the store_id
app.use(async (req, res, next) => {
  try {
    const store_id = req.headers["store-id"]; // Pass store_id in headers (can also be passed via URL or query params)
    if (!store_id) {
      return res.status(400).json({ error: "store_id is required" });
    }

    // Get the db_name associated with the store_id from the OmniStoreDB
    const omniPool = mysql.createPool({
      host: process.env.DB_OMNI_HOST,
      user: process.env.DB_OMNI_USER,
      password: process.env.DB_OMNI_PASSWORD,
      database: process.env.DB_OMNI_NAME,
    });

    const [storeRows] = await omniPool.execute(
      "SELECT db_name FROM stores WHERE id = ?",
      [store_id]
    );

    if (storeRows.length === 0) {
      return res.status(404).json({ error: "Store not found" });
    }

    const dbName = storeRows[0].db_name;

    // Create a new connection pool for the store's database
    req.storePool = createPoolWithDB(dbName);

    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error("Error selecting store database:", error);
    return res.status(500).json({ error: "Failed to select store database" });
  }
});

//API GETS all products from the dynamically selected database
app.get("/api/products", async (req, res) => {
  const storePool = req.storePool; // Use the dynamic store connection pool

  try {
    const [products] = await storePool.query("SELECT * FROM products");
    res.json(products);
  } catch (err) {
    console.error("Error retrieving products:", err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

//API Creates a new product in the 'products' table of the dynamically selected database
app.post("/api/products", upload.single("image"), async (req, res) => {
  const storePool = req.storePool; // Use the dynamic store connection pool
  const {
    title,
    price,
    description,
    category,
    payment_id,
    image_url,
    meta_title,
    meta_description,
    meta_keywords,
  } = req.body;

  let image = null;

  if (req.file) {
    // Compress and resize the image
    const compressedImage = await sharp(req.file.buffer)
      .resize(800) // Resize to 800px width, maintaining aspect ratio
      .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
      .toBuffer();

    image = compressedImage;
  }

  // Validate title and price fields
  if (!title || !price) {
    return res.status(400).json({ error: "Title and price are required." });
  }

  // Insert into the database
  try {
    const [result] = await storePool.query(
      "INSERT INTO products (title, price, description, category, payment_id, image_url, image, meta_title, meta_description, meta_keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        price,
        description,
        category,
        payment_id,
        image_url,
        image,
        meta_title,
        meta_description,
        meta_keywords,
      ]
    );
    return res.status(201).json({
      id: result.insertId,
      message: "Product added successfully.",
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

//API GET a single product from the dynamically selected database
app.get("/api/products/:id", async (req, res) => {
  req.storePool = createPoolWithDB(dbName);

  const storePool = req.storePool; // Use the dynamic store connection pool
  const { id } = req.params;

  try {
    const [product] = await storePool.query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    );

    if (product.length === 0) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json(product[0]);
  } catch (err) {
    console.error("Error retrieving product:", err);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
});

//API DELETES a product from the dynamically selected database
app.delete("/api/products/:id", async (req, res) => {
  const storePool = req.storePool; // Use the dynamic store connection pool
  const { id } = req.params;

  try {
    const [result] = await storePool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found." });
    }
    return res.json({ message: "Product deleted successfully." });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

//API UPDATES a product in the dynamically selected database
app.put("/api/products/:id", upload.single("image"), async (req, res) => {
  const storePool = req.storePool; // Use the dynamic store connection pool
  const { id } = req.params;
  console.log("Product ID:", id);

  const {
    title,
    price,
    description,
    category,
    payment_id,
    image_url,
    meta_title,
    meta_description,
    meta_keywords,
  } = req.body;

  let image = null;

  if (req.file) {
    image = req.file.buffer; // Store the image as a buffer in the database
  }

  if (!title || !price) {
    return res.status(400).json({ error: "Title and price are required." });
  }

  try {
    const [result] = await storePool.query(
      `UPDATE products 
       SET title = ?, price = ?, description = ?, category = ?, payment_id = ?, 
           image_url = ?, image = ?, meta_title = ?, meta_description = ?, meta_keywords = ?
       WHERE id = ?`,
      [
        title,
        price,
        description,
        category,
        payment_id,
        image_url || "",
        image,
        meta_title,
        meta_description,
        meta_keywords,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found." });
    }

    return res.json({ message: "Product updated successfully." });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

//REVIEW Access correct db dynamically based on store id:
app.get("/api/store/:store_id/products", async (req, res) => {
  const { store_id } = req.params; // Get store_id from the URL path
  console.log("Store ID:", store_id);

  try {
    // Get the db_name associated with the store_id from the OmniStoreDB
    const [storeRows] = await pool.execute(
      "SELECT db_name FROM stores WHERE id = ?",
      [store_id]
    );

    if (storeRows.length === 0) {
      return res.status(404).json({ error: "Store not found" });
    }

    const dbName = storeRows[0].db_name;

    // Create a new connection to the store's database
    const storePool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: dbName, // Use the dynamically retrieved database name
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    // Query the products table from the store's database
    const [productRows] = await storePool.execute("SELECT * FROM products");

    res.status(200).json(productRows);
  } catch (error) {
    console.error("Error retrieving store products:", error);
    res.status(500).json({ error: "Uh Oh!!! " + error.message });
  }
});

// Stripe payment route
app.post("/api/payment", async (req, res) => {
  const { amount, currency, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount is now in cents and correctly rounded
      currency,
      description,
      payment_method_types: ["card"],
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return res.status(500).json({ error: "Payment failed." });
  }
});

// Set server to public on a port
app.listen(3082, "0.0.0.0", () => console.log(`Server started on port 3082`));
