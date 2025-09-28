import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"
import sitemap from "vite-plugin-sitemap" // Import sitemap plugin

// Helper function to get __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Define site URL
const siteUrl = "https://www.jawfane.com"

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: siteUrl,
      exclude: ["/admin", "/private"], // Exclude any private pages
      routes: ["/", "/about", "/music", "/tour", "/merch", "/contact"], // Define your main pages
    }),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true, // Clean the output directory before building
  },
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 5173,
    cors: {
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  },
  resolve: {
    alias: {
      "@public": resolve(__dirname, "public"),
    },
  },
})
