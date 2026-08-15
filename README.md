# @dive-your-mind/dym-design-system

The base React design system for DYM (Dive Your Mind) products — shared design tokens, theming, and accessible React components.

> Status: pre-release (`0.x`). API may change between minor versions until `1.0.0`.

## Installation

Published to [GitHub Packages](https://github.com/Dive-Your-Mind/dym-design-system/packages). Point npm/pnpm at the GitHub Packages registry for the `@dive-your-mind` scope — add to your project's `.npmrc`:

```
@dive-your-mind:registry=https://npm.pkg.github.com
```

Then install:

```bash
pnpm add @dive-your-mind/dym-design-system react react-dom
```

Import the stylesheet once, at your app's entry point:

```ts
import "@dive-your-mind/dym-design-system/styles.css";
```

## Usage

```tsx
import { ThemeProvider, Button, Stack, Text } from "@dive-your-mind/dym-design-system";

function App() {
  return (
    <ThemeProvider>
      <Stack gap="4">
        <Text>Hello, DYM.</Text>
        <Button>Click me</Button>
      </Stack>
    </ThemeProvider>
  );
}
```

`ThemeProvider` defaults to following the OS `prefers-color-scheme`. Pass `defaultPreference="light"` or `"dark"` to pin a theme.

## Development

```bash
pnpm install
pnpm build:tokens   # compile src/tokens/*.ts -> src/theme/generated/*.css
pnpm storybook      # component playground + docs at localhost:6006
pnpm test           # unit + accessibility tests
pnpm build          # production build to dist/
pnpm verify         # lint + typecheck + test + build (what CI runs)
```

See `.design-sync/conventions.md` (once authored) or `openspec/changes/base-react-design-system/design.md` for the architectural rationale behind these choices.

## Release process

This package uses [Changesets](https://github.com/changesets/changesets) for versioning, publishing to GitHub Packages under the `Dive-Your-Mind` org.

1. After making a change, run `pnpm changeset` and describe it (patch/minor/major).
2. Commit the generated `.changeset/*.md` file with your PR.
3. On merge to `main`, CI opens/updates a "Version Packages" PR aggregating pending changesets.
4. Merging that PR triggers the release workflow, which builds and publishes the new version to `npm.pkg.github.com`.

Publishing authenticates with the repo's built-in `GITHUB_TOKEN` (via the release workflow's `packages: write` permission) — no manual token setup needed.

## License

UNLICENSED — internal DYM package.
