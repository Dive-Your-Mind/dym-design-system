/**
 * Smoke-tests that the built package is tree-shakeable: bundling an entry
 * that imports a single component from dist/index.js should not pull in
 * unrelated components. Run after `npm run build`.
 */
import { build } from "esbuild";
import { writeFileSync, rmSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distIndex = resolve(__dirname, "../dist/index.js");

if (!existsSync(distIndex)) {
  console.error("dist/index.js not found — run `npm run build` first.");
  process.exit(1);
}

const entryPath = resolve(__dirname, "../.treeshake-entry.mjs");
writeFileSync(entryPath, `export { Button } from ${JSON.stringify(distIndex)};\n`);

try {
  const result = await build({
    entryPoints: [entryPath],
    bundle: true,
    treeShaking: true,
    format: "esm",
    platform: "browser",
    external: ["react", "react-dom", "react/jsx-runtime"],
    write: false,
    metafile: false,
  });

  const output = result.outputFiles[0].text;

  // Markers unique to components NOT imported here — their absence proves
  // the bundler dropped them rather than pulling in the whole library.
  const unrelatedMarkers = [
    ["Modal", "dym-Modal-overlay"],
    ["Select", "dym-Select-trigger"],
    ["Toast", "dym-Toast-viewport"],
    ["Tooltip", "dym-Tooltip-content"],
    ["Avatar", "dym-Avatar-initials"],
  ];

  const leaked = unrelatedMarkers.filter(([, marker]) => output.includes(marker));

  if (leaked.length > 0) {
    console.error("Tree-shake check failed — unrelated components leaked into the bundle:");
    for (const [name] of leaked) console.error(`  - ${name}`);
    process.exit(1);
  }

  if (!output.includes("dym-Button")) {
    console.error(
      "Tree-shake check failed — the imported Button component was NOT found in the bundle.",
    );
    process.exit(1);
  }

  console.log(
    `Tree-shake check passed: importing only Button produced a ${(output.length / 1024).toFixed(1)}KB bundle with no unrelated components.`,
  );
} finally {
  rmSync(entryPath, { force: true });
}
