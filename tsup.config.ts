import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    styles: "src/styles.css",
  },
  format: ["esm"],
  dts: {
    entry: "src/index.ts",
  },
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  minify: false,
  external: ["react", "react-dom"],
});
