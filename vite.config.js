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
      /*
      General
      */
      //public
      "@public": resolve(__dirname, "public"),

      //components
      "@components": resolve(__dirname, "src/components"),

      //assets
      "@assets": resolve(__dirname, "src/assets"),

      //pages
      "@pages": resolve(__dirname, "src/components/pages"),

      /*
      Product Management
      */
      //admin
      "@admin_product_management": resolve(
        __dirname,
        "src/components/product_management/admin"
      ),

      //assets
      "@assets_product_management": resolve(
        __dirname,
        "src/components/product_management/assets"
      ),

      //pages
      "@pages_product_management": resolve(
        __dirname,
        "src/components/product_management/pages"
      ),
      /*
      Sub Components
      */
      //Apis
      "@apis_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/apis"
      ),

      //audio
      "@audio_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/audio"
      ),

      //buttons
      "@buttons_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/buttons"
      ),

      //contexts
      "@contexts_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/contexts"
      ),

      //logos
      "@logos_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/logos"
      ),

      //navigation
      "@navigation_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/navigation"
      ),

      //sub-menus
      "@sub-menus_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/sub-menus"
      ),

      //tailwind modules
      "@tailwind-modules_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/tailwindModules"
      ),

      //themes
      "@themes_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/themes"
      ),

      //utilities
      "@utilities_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/utilities"
      ),

      //widgets
      "@widgets_product_management": resolve(
        __dirname,
        "src/components/product_management/sub_components/widgets"
      ),
    },
  },
});
