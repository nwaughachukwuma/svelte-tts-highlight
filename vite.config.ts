import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve("./src/lib/index.ts"),
      name: "svelte-tts-highlighter",
    },
  },
});
