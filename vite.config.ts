import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import paths from "vite-plugin-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    reactRouter(),
    paths(),
    tailwindcss(),
    Unfonts({
      custom: {
        families: [{ name: "Geist", src: "./src/styles/fonts/*.woff2" }],
      },
    }),
  ],
  server: {
    port: 4280,
  },
});
