import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    dts({
      outDir: "./dist",
      insertTypesEntry: true,
      include: "./src/lib/**/*.ts",
    }),
  ],
  build: {
    lib: {
      entry: resolve("./src/lib/index.ts"),
      name: "svelte-tts-highlighter",
    },
  },
});
