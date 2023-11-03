# Gallery - an image gallery made with Nuxt 3

[![gallery preview](https://github.com/avocadace/gallery/assets/47639656/fbcfe88d-8445-4796-9010-f882f52869ab)](https://gallery-nuxt.netlify.app/)

## :sparkles: Features

All your images are automatically imported from the `images` folder.

-   Self-hosted (just copy your images to `images`) 🧑‍💻️
-   Can be hosted on any static site hosting with Nuxt generate 📄
-   Arrow key / mouse / touch navigation ➡️
-   Search based on filename or description text 🔍 - <kbd>Ctrl</kbd> or <kbd>⌘</kbd> + <kbd>k</kbd> to open when enabled.
-   Image support includes `.webp` `.jpg` `.png` `.avif` `.gif` 📸
-   Support of different aspect ratios
-   Image optimisation, provided by [@nuxt/image](https://github.com/nuxt/image)
-   Tailwind CSS for styling 🎨
-   ESLint + Prettier for code format and styling
-   Vitest + Vue test utils + Nuxt Devtools + Playwright for tests

## :rocket: Quick Start

These instructions will help you set up a deployment as fast as possible.
It is assumed that you have Node 16+ and pnpm installed.

1. Clone the repo and install dependencies.

2. Delete all images in `images` and replace with your own.

3. Edit the configuration in [`gallery.config.ts`](/gallery.config.ts)

4. Build Nuxt in static mode with `pnpm generate`.

5. Deploy the static build on hosting of your choosing. 
Netlify is used for the demo and they make it easy to deploy with their [CLI](https://docs.netlify.com/cli/get-started/) or alternatively,
there are Github Actions available to build & deploy to Netlify.

## :computer: Local Development

_Note_ this project uses `pnpm` as the package manager. Replace with `npm run` or `yarn` if needed.

Get started

```
git clone https://github.com/avocadace/gallery.git
```

```
cd gallery
```

```
pnpm install
```

Development mode

```
pnpm dev
```

## Important directories

-   `images` stores all your images
-   `src`
    -   `src/components`
    -   `src/composables`
    -   `src/pages`
    -   `src/types`
-   `test`
    -   `test/e2e` stores all Playwright E2E tests

## Running the tests

Vitest + Playwright

Unit tests:

`pnpm test:unit`

E2E tests (this may require other Playwright dependencies to be installed):

`pnpm test:e2e`

## Commands Index:

[see package.json](package.json)

Here is a brief explanation of each command:

-   `build`: This script command builds the Nuxt.js application in a production environment.

-   `dev`: This script command starts a development server and watches for changes in the application.

-   `generate`: This script command generates the static version of the Nuxt.js application.

-   `preview`: This script command previews the application.

-   `postinstall`: This script command runs the `nuxt prepare` command after the project dependencies have been installed.

-   `images`: This script command generates the Nuxt.js application and copies the generated images to the `src/public` directory.

-   `lint`: This script command runs the ESLint linter on the project's TypeScript, JavaScript, and Vue.js files.

-   `lint:fix`: This script command runs the ESLint linter and automatically fixes any linting errors found in the project's TypeScript, JavaScript, and Vue.js files.

-   `prettier`: This script command checks the code format of the project's source files using Prettier.

-   `prettier:fix`: This script command checks the code format of the project's source files using Prettier and automatically fixes any formatting issues.

-   `test:unit`: This script command runs the unit tests for the project using Vitest.

-   `test:e2e`: This script command runs the end-to-end tests for the project using Playwright.

-   `test:coverage`: This script command runs the code coverage tests for the project using Vitest.

-   `prepare`: This script command installs the Husky library, which is used for Git hooks in the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
