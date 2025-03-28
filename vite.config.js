import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { dirname, resolve } from "path"

// Helper function to get __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [react()],
  // base: "/Jawfane", // Set base path to match the GitHub Pages URL
  build: {
    outDir: "build", // Change output directory to 'build' for gh-pages
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
