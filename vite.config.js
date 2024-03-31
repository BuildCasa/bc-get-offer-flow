import { defineConfig } from 'vite'

// Entry files (from `src`) to be bundled into separate output files (in `dist`) during production builds.
// Add any others as objects with `inputPath` and `outputName` properties (output extensions are added automatically).
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

export default defineConfig({
  build: {
    lib: {
      entry: ENTRY_FILES.reduce((entries, { inputPath, outputName }) => {
        entries[outputName] = inputPath
        return entries
      }, {}),
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'bc-shared-[hash].js',
      },
    },
  },
  server: {
    // Automatically open the sandbox page in the browser when the dev server starts.
    // If you aren't using the sandbox page, or don't want this behavior, remove this setting:
    open: '/sandbox.html',
  },
})
