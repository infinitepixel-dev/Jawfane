/* eslint-disable no-undef */
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3040;

app.use(cors());

const SANDBOX_APPLICATION_ID = process.env.SANDBOX_APPLICATION_ID;
const SANDBOX_APPLICATION_SECRET = process.env.SANDBOX_APPLICATION_SECRET;
const TOKEN_STORE_PATH = "./stores.json"; // Simulating DB with a JSON file

// Helper function to load all stores
function loadAllStores() {
  if (fs.existsSync(TOKEN_STORE_PATH)) {
    const data = fs.readFileSync(TOKEN_STORE_PATH);
    return JSON.parse(data);
  }
  return {};
}

// Helper function to check if store exists and create it if not
function createStoreIfNotExists(storeId) {
  const allStores = loadAllStores();
  if (!allStores[storeId]) {
    allStores[storeId] = {}; // Create an empty object for the new store
    fs.writeFileSync(TOKEN_STORE_PATH, JSON.stringify(allStores, null, 2));
    console.log(`Store ${storeId} created.`);
  }
}

// Store tokens for each store/merchant
function storeTokens(merchant_id, tokenData) {
  const allStores = loadAllStores();
  createStoreIfNotExists(merchant_id); // Ensure store is created
  allStores[merchant_id] = tokenData;
  fs.writeFileSync(TOKEN_STORE_PATH, JSON.stringify(allStores, null, 2));
  console.log(`Tokens for merchant ${merchant_id} stored.`);
}

// Load tokens for a specific store/merchant
function loadTokens(merchant_id) {
  const allStores = loadAllStores();
  return allStores[merchant_id] || null;
}

// Delete store by merchant_id
function deleteStore(merchant_id) {
  const allStores = loadAllStores();
  delete allStores[merchant_id];
  fs.writeFileSync(TOKEN_STORE_PATH, JSON.stringify(allStores, null, 2));
}

// Check if token is expired
function isTokenExpired(expires_at) {
  const currentTime = new Date();
  const expiryTime = new Date(expires_at);
  return expiryTime <= currentTime;
}

// Refresh token for a specific store/merchant
async function refreshToken(merchant_id) {
  const tokenData = loadTokens(merchant_id);
  if (!tokenData || !tokenData.refresh_token) {
    throw new Error("No refresh token available for merchant " + merchant_id);
  }

  try {
    const response = await axios.post(
      "https://connect.squareupsandbox.com/oauth2/token",
      {
        client_id: SANDBOX_APPLICATION_ID,
        client_secret: SANDBOX_APPLICATION_SECRET,
        grant_type: "refresh_token",
        refresh_token: tokenData.refresh_token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      `Token refreshed for merchant ${merchant_id}:`,
      response.data.access_token
    );

    // Update stored token data for this merchant
    storeTokens(merchant_id, response.data);

    return response.data.access_token;
  } catch (error) {
    console.error(
      `Error refreshing token for merchant ${merchant_id}:`,
      error.response.data
    );
    throw error;
  }
}

// Middleware to ensure token is valid for a given merchant
async function ensureValidToken(req, res, next) {
  const { merchant_id } = req.query; // Assuming merchant_id is passed in the query or header

  if (!merchant_id) {
    return res.status(400).json({ error: "No merchant_id provided" });
  }

  let tokenData = loadTokens(merchant_id);
  if (!tokenData) {
    return res
      .status(401)
      .json({ error: `No token found for merchant ${merchant_id}` });
  }

  // Refresh the token if expired
  if (isTokenExpired(tokenData.expires_at)) {
    try {
      tokenData.access_token = await refreshToken(merchant_id);
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Failed to refresh token for merchant ${merchant_id}` });
    }
  }

  // Attach token to the request for further use
  req.tokenData = tokenData;
  req.merchant_id = merchant_id;
  next();
}

// OAuth flow for connecting Square
app.get("/connect", async (req, res) => {
  const { storeId, originalUrl } = req.query;

  console.log("Store ID:", storeId);
  console.log("Original URL:", originalUrl);

  if (!storeId || !originalUrl) {
    return res.status(400).json({ error: "Missing storeId or originalUrl" });
  }

  console.log(`Received storeId: ${storeId}, Original URL: ${originalUrl}`);

  // Store the original URL in session or append it as a query parameter to the redirect_uri
  const redirectUri = `http://localhost:3040/callback?storeId=${encodeURIComponent(
    storeId
  )}&originalUrl=${encodeURIComponent(originalUrl)}`;
  const authUrl = `https://connect.squareupsandbox.com/oauth2/authorize?client_id=${SANDBOX_APPLICATION_ID}&scope=MERCHANT_PROFILE_READ%20PAYMENTS_WRITE&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;

  console.log("Redirecting to:", authUrl);
  res.redirect(authUrl);
});

// OAuth callback to get and store the tokens for a merchant
//v2
app.get("/callback", async (req, res) => {
  const { code, storeId, originalUrl } = req.query;

  if (!code) {
    return res.status(400).json({ error: "No authorization code received" });
  }

  console.log("Authorization code received:", code);
  console.log("Store ID:", storeId);
  console.log("Original URL:", originalUrl);

  try {
    const response = await axios.post(
      "https://connect.squareupsandbox.com/oauth2/token",
      {
        client_id: SANDBOX_APPLICATION_ID,
        client_secret: SANDBOX_APPLICATION_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: `http://localhost:3040/callback?storeId=${encodeURIComponent(
          storeId
        )}&originalUrl=${encodeURIComponent(originalUrl)}`,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token, refresh_token, expires_at, merchant_id } =
      response.data;

    // Store merchant_id along with tokens
    createStoreIfNotExists(storeId);
    storeTokens(storeId, {
      access_token,
      refresh_token,
      expires_at,
      merchant_id,
    });

    // Redirect the user to the original URL (their dashboard)
    res.redirect(`${originalUrl}`);
  } catch (error) {
    console.error("Error during token exchange:", error.message);
    res.status(500).json({ error: "Error during token exchange with Square" });
  }
});

// Example API route using the access token for a specific merchant
app.get("/some-square-api", ensureValidToken, async (req, res) => {
  const { access_token, merchant_id } = req.tokenData;

  try {
    // Example API call to Square
    const squareResponse = await axios.get(
      `https://connect.squareupsandbox.com/v2/merchants/${merchant_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    res.json(squareResponse.data);
  } catch (error) {
    console.error("Square API error:", error.response.data);
    res.status(500).json({ error: error.response.data });
  }
});

// CRUD Operations

// Read all stores
app.get("/stores", (req, res) => {
  const allStores = loadAllStores();
  res.json(allStores);
});

// Read specific store by merchant_id
app.get("/stores/:merchant_id", (req, res) => {
  const { merchant_id } = req.params;
  const store = loadTokens(merchant_id);
  if (store) {
    res.json(store);
  } else {
    res
      .status(404)
      .json({ error: `Store with merchant_id ${merchant_id} not found` });
  }
});

// Delete store by merchant_id
app.delete("/stores/:merchant_id", (req, res) => {
  const { merchant_id } = req.params;
  const store = loadTokens(merchant_id);
  if (store) {
    deleteStore(merchant_id);
    res.json({ message: `Store with merchant_id ${merchant_id} deleted` });
  } else {
    res
      .status(404)
      .json({ error: `Store with merchant_id ${merchant_id} not found` });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening to requests on http://localhost:${PORT}`);
});

/*API Create Payment Example

https://developer.squareup.com/explorer/square/payments-api/create-payment?env=sandbox&appId=sq0idp-PpZIHa9qOQe8wG4e2NoMMg&prefill=create-payment

try {
  const response = await client.paymentsApi.createPayment({
    sourceId: 'cnon:card-nonce-ok',
    idempotencyKey: '4632aec9-c2e4-4e73-a663-91c51bc7991c',
    amountMoney: {
      amount: 100,
      currency: 'USD'
    },
    autocomplete: true,
    customerId: '123-2024',
    buyerEmailAddress: 'mattdrummerguy@gmail.com'
  });

  console.log(response.result);
} catch(error) {
  console.log(error);
}
*/
