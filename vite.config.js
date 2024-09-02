import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Helper function to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: "/dev/",
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    // port: 5173,
    cors: {
      origin: ["*"],
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  },
  resolve: {
    alias: {
      "@public": resolve(__dirname, "public"),
      "@components": resolve(__dirname, "src/components"),
      "@assets": resolve(__dirname, "src/assets"),
      "@admin_product_management": resolve(
        __dirname,
        "src/components/product_management/admin"
      ),
      "@assets_product_management": resolve(
        __dirname,
        "src/components/product_management/assets"
      ),
      "@pages_product_management": resolve(
        __dirname,
        "src/components/product_management/pages"
      ),
      "@apis_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/apis"
      ),
      "@contexts_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/contexts"
      ),
      "@sub-menus_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/sub-menus"
      ),
      "@tailwindModules_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/tailwindModules"
      ),
      "@utilities_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/utilities"
      ),
      "@widgets_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/widgets"
      ),
    },
  },
});
