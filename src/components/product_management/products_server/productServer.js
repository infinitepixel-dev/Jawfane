//WINDOWS
//nodemon --exec "cls && node" ./productServer.js

/* eslint-disable no-undef */
// Import dependencies
const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");
// const https = require("https");
const cors = require("cors");
const multer = require("multer"); // For handling file uploads
const sharp = require("sharp");
// const { promisify } = require('util')
// const fs = require('fs')
// const { getSSLConfig } = require("/home/vpsinfinitepixel/Servers/sslUtils");

const dotenv = require("dotenv");
const Stripe = require("stripe"); // Import Stripe

dotenv.config();

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// console.log('stripe secret key: ', process.env.STRIPE_SECRET_KEY)
// Import the dynamic pool creation function
const createPoolWithDB = require("./createPoolWithDB");

const app = express();

// Get the db_name associated with the store_id from the OmniStoreDB
const omniPool = mysql.createPool({
  host: process.env.DB_OMNI_HOST,
  user: process.env.DB_OMNI_USER,
  password: process.env.DB_OMNI_PASSWORD,
  database: process.env.DB_OMNI_NAME,
});

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
  console.log("Request headers: ", req.headers);

  try {
    const store_id = req.headers["store_id"]; // Pass store_id in headers (can also be passed via URL or query params)

    console.log("Store ID: ", store_id);

    if (!store_id) {
      return res.status(400).json({ error: "store_id is required" });
    }

    console.log(`
      host: ${process.env.DB_OMNI_HOST}
      user: ${process.env.DB_OMNI_USER}
      password: ${process.env.DB_OMNI_PASSWORD}
      database: ${process.env.DB_OMNI_NAME}
      `);

    // console.log("OmniPool: ", omniPool);

    const [storeRows] = await omniPool.execute(
      "SELECT db_name FROM stores WHERE id = ?",
      [store_id]
    );

    // console.log("Store Rows: ", storeRows);

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

//ANCHOR Helper function to format JavaScript Date to MySQL DATETIME format
function formatDateForMySQL(date) {
  console.log("date: ", date);

  const d = new Date(date);
  return d.toISOString().slice(0, 19).replace("T", " ");
}

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
    id,
    title,
    price,
    quantity,
    description,
    category,
    product_id,
    created_at,
    image_url,
    product_weight,
    weight_unit,
    product_dimensions,
    meta_title,
    meta_description,
    meta_keywords,
    status,
    featured,
    sale,
    discount_price,
    discount_start,
    discount_end,
  } = req.body;

  let image = null;

  //compress and resize the image if it exists in the request
  if (req.file) {
    image = await sharp(req.file.buffer)
      .resize(800) // Resize to a max width of 800px
      .jpeg({ quality: 70 }) // Compress the image to 70% quality
      .toBuffer();
  }

  console.log("created_at: ", created_at);

  const formattedCreatedAt = formatDateForMySQL(created_at);

  let formattedDiscountStart;
  if (discount_start != "null") {
    console.log("discount_start: ", discount_start);

    formattedDiscountStart = formatDateForMySQL(discount_start);
  }

  let formattedDiscountEnd = null;
  if (discount_end != "null") {
    console.log();

    formattedDiscountEnd = formatDateForMySQL(discount_end);
  }

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
      "INSERT INTO products (id, title, price, quantity, description, category, product_id, created_at, image_url, image, product_weight, weight_unit, product_dimensions, meta_title, meta_description, meta_keywords, status, featured, sale, discount_price, discount_start, discount_end) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        id,
        title,
        price,
        quantity,
        description,
        category,
        product_id,
        formattedCreatedAt, // Use formatted date
        image_url || "",
        image,
        product_weight,
        weight_unit,
        product_dimensions,
        meta_title,
        meta_description,
        meta_keywords,
        status,
        featured,
        sale,
        discount_price,
        formattedDiscountStart,
        formattedDiscountEnd,
      ]
    );
    return res.status(201).json({
      id: result.insertId,
      message: "Product added successfully ;).",
    });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Failed to add product" });
  }
});

//API GET a single product from the dynamically selected database
app.get("/api/products/:id", async (req, res) => {
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
  console.log("PUT request received...");

  const storePool = req.storePool; // Use the dynamic store connection pool
  const { id } = req.params;

  console.log("PUT Id: ", id);

  const {
    title,
    price,
    quantity,
    description,
    category,
    product_id,
    created_at,
    image_url,
    product_weight,
    weight_unit,
    product_dimensions,
    meta_title,
    meta_description,
    meta_keywords,
    status,
    featured,
    sale,
    discount_price,
    discount_start,
    discount_end,
  } = req.body;

  let image = null;

  // Compress and optimize the image if it exists in the request
  if (req.file) {
    image = await sharp(req.file.buffer)
      .resize(800) // Resize to a max width of 800px
      .jpeg({ quality: 70 }) // Compress the image to 70% quality
      .toBuffer();
  }

  if (!title || !price) {
    return res.status(400).json({ error: "Title and price are required." });
  }

  try {
    console.log("created_at: ", created_at);

    const formattedCreatedAt = formatDateForMySQL(created_at);

    let formattedDiscountStart;
    if (discount_start != "null") {
      console.log("discount_start: ", discount_start);

      formattedDiscountStart = formatDateForMySQL(discount_start);
    }

    let formattedDiscountEnd = null;
    if (discount_end != "null") {
      console.log();

      formattedDiscountEnd = formatDateForMySQL(discount_end);
    }

    const [result] = await storePool.query(
      "UPDATE products SET title = ?, price = ?, quantity = ?, description = ?, category = ?, product_id = ?, created_at = ?, image_url = ?, image = ?, product_weight = ?, weight_unit = ?, product_dimensions = ?, meta_title = ?, meta_description = ?, meta_keywords = ?, status = ?, featured = ?, sale = ?, discount_price = ?, discount_start = ?, discount_end = ? WHERE id = ?",
      [
        title,
        price,
        quantity,
        description,
        category,
        product_id,
        formattedCreatedAt, // Use formatted date
        image_url || "",
        image, // Store optimized image
        product_weight,
        weight_unit,
        product_dimensions,
        meta_title,
        meta_description,
        meta_keywords,
        status,
        featured,
        sale,
        discount_price,
        formattedDiscountStart,
        formattedDiscountEnd,
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
  const { store_id } = req.params;
  const storePool = req.storePool; // Use the dynamic store connection pool

  try {
    // Get the db_name associated with the store_id from the OmniStoreDB
    const [storeRows] = await omniPool.execute(
      "SELECT db_name FROM stores WHERE id = ?",
      [store_id]
    );

    if (storeRows.length === 0) {
      return res.status(404).json({ error: "Store not found" });
    }

    // const dbName = storeRows[0].db_name;

    // Query the products table from the store's database
    const [productRows] = await storePool.execute("SELECT * FROM products");

    res.status(200).json(productRows);
  } catch (error) {
    console.error("Error retrieving store products:", error);
    res.status(500).json({ error: error.message });
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

//ANCHOR Set server to public on a port
// app.listen(3082, "0.0.0.0", () => console.log(`Server started on port 3082`));

const port = 3082;

// Set server to public on a port
app.listen(port, "0.0.0.0", () =>
  console.log(`Server started on port ${port}`)
);
