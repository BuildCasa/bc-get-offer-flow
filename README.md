# BuildCasa - Web - Custom Scripts

This repo stores and serves the custom JavaScript code for the various BuildCasa.com web properties. These scripts power the interactive experiences by providing the state management and business logic for the site UI built and hosted via Webflow.

## Development

This project uses Vite for optimizing and building (bundling and code-splitting) the production code for each BuildCasa site.

Each web property should have an entry script file located in the `src` directory:

```
├── src
│   ├── bc-adu.js
│   ├── bc-home.js
│   ├── bc-nestegg.js
│   ├── webuycalots.js
```

`modules` should be developed independently, and imported into these entry files as standard ES modules.

`sandbox.html` is a development-only HTML page that can be used to locally test site functionality during the development process. You can load any development or distribution script by adding a `<script type="module" src="..."></script>` tag. It uses [TailwindCSS](https://tailwindcss.com/) for fast/convenient styling. Neither this HTML file, nor the repo's TailwindCSS config, have any impact or connection with the code that gets imported into the production Webflow site.

## Deployment

To build the production JavaScript files for the live web properties, there must be an item in the `ENTRY_FILES` array in `vite.config.js` for each script:

```
const ENTRY_FILES = [
  {
    inputPath: './src/bc-home.js',
    outputName: 'bc-home',
  },
  {
    inputPath: './src/bc-nestegg.js',
    outputName: 'bc-nestegg',
  },
  {
    inputPath: './src/bc-adu.js',
    outputName: 'bc-adu',
  },
  {
    inputPath: './src/webuycalots.js',
    outputName: 'webuycalots',
  },
]
```

Running the build script will generate corresponding production script files for each site, and optimized shared script files, in the `dist` directory:

```
npm run build
```

```
├── dist
│   ├── bc-adu.js
│   ├── bc-home.js
│   ├── bc-nestegg.js
│   ├── bc-shared-1bUUMsGq.js
│   └── webuycalots.js
```

The production Webflow sites use [JSDelivr](https://www.jsdelivr.com/?docs=gh) to import versioned and hosted (via CDN) copies of their respective custom scripts.

This repo must remain public to maintain access for the existing BuildCasa sites. Old versions continue to be hosted and importable, even if newer versions are released going forward.

To 'deploy' new versions of the code, run the build process, commit repo changes to the `main` branch, add a git tag to the commit with a [SemVer](https://semver.org/) compliant version number — e.g. `v8.0.0` (it is good practice to update the version in `package.json` as well), and push the changes to the GitHub repo.

That new scripts can then be imported directly into their BuildCasa sites (in Webflow, or otherwise) by adding `script` tags (with the desired version number) to each page that needs one:

```
<script type="module" src="https://cdn.jsdelivr.net/gh/BuildCasa/bc-get-offer-flow@8.0.0/dist/bc-home.js" defer></script>
```

## Webflow / HTML Integration

### AplineJS

[AlpineJS](https://alpinejs.dev/start-here) is the only external code / development dependency, and the lightweight frontend framework that makes this possible.

It provides a simple set of directives, globals, and methods to integrate our custom JavaScript logic with HTML elements via element attributes.

### Webflow

[Webflow](https://webflow.com/) is a no/low-code website design, development, and publishing platform.

This code is designed specifically for a tight integration with the BuildCasa sites currently built and hosted in Webflow. So many of the design choices were made with the capabilities and constraints of that platform in mind.

That said, it should be possible / easy to integrate these scripts into any future version of the site, in Webflow or any other platform. As long as you can import the appropriate JavaScript file, and have access to edit the attributes of the HTML elements, you should be able to wire up a working flow with any of this custom code.
