/**
 * Guards the design-tokens spec's "Token-Only Styling" requirement: fails
 * if any component CSS file uses a raw color/spacing value instead of a
 * `var(--dym-*)` token reference for a themable property.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const COMPONENTS_DIR = join(process.cwd(), "src/components");

const THEMABLE_PROPS =
  /(color|background(-color)?|border(-top|-bottom|-left|-right)?(-color)?|fill|stroke|box-shadow|padding[a-z-]*|margin[a-z-]*|gap|border-radius|font-size|font-family|font-weight|line-height)\s*:/i;

const RAW_HEX = /#[0-9a-f]{3,8}\b/i;
const RAW_RGB = /\brgba?\(/i;
const RAW_PX = /:\s*-?\d+(\.\d+)?px/;

function walk(dir: string): string[] {
  const entries = readdirSync(dir);
  let files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files = files.concat(walk(full));
    } else if (entry.endsWith(".css")) {
      files.push(full);
    }
  }
  return files;
}

function checkFile(filePath: string): string[] {
  const violations: string[] = [];
  const lines = readFileSync(filePath, "utf-8").split("\n");

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("/*") || trimmed.startsWith("*") || trimmed === "") return;
    if (!THEMABLE_PROPS.test(trimmed)) return;
    if (trimmed.includes("var(--dym-")) return;
    // Allow explicit escape hatches: 0, transparent, currentColor, inherit, none, 1px (hairline widths are structural, not tokens)
    if (/:\s*(0|0px|transparent|currentcolor|inherit|none|auto)\s*;?$/i.test(trimmed)) return;
    if (/^(border(-\w+)?)\s*:\s*1px\s+solid\s+(var\(--dym-|transparent\b)/i.test(trimmed)) return;

    if (RAW_HEX.test(trimmed) || RAW_RGB.test(trimmed) || RAW_PX.test(trimmed)) {
      violations.push(`${relative(process.cwd(), filePath)}:${idx + 1}  ${trimmed}`);
    }
  });

  return violations;
}

let hasExistingComponents = false;
try {
  hasExistingComponents = statSync(COMPONENTS_DIR).isDirectory();
} catch {
  hasExistingComponents = false;
}

if (!hasExistingComponents) {
  console.log("No component CSS yet — nothing to check.");
  process.exit(0);
}

const files = walk(COMPONENTS_DIR);
const allViolations = files.flatMap(checkFile);

if (allViolations.length > 0) {
  console.error("Token-only styling check failed. Raw values found instead of design tokens:\n");
  for (const v of allViolations) console.error(`  ${v}`);
  console.error(`\n${allViolations.length} violation(s). Use var(--dym-*) tokens instead.`);
  process.exit(1);
}

console.log(`Token-only styling check passed (${files.length} CSS file(s) scanned).`);
