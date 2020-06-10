/* eslint-plugin-disable @typescript-eslint */

const { commonExternal, isProd, extensions } = require('./constants')
const { typescript, run, commonPlugins, resolve } = require('./plugins')

const plugins = [
  resolve({
    extensions,
    preferBuiltins: true,
    browser: false
  }),
  typescript({
    check: false, // TODO (enes sefa) isProd,
    tsconfigOverride: { module: 'commonjs', jsx: 'react' }
  }),
  ...commonPlugins,
  !isProd &&
    run({
      execArgv: ['-r', 'source-map-support/register']
    })
]

const input = 'src/server/index.tsx'

const output = {
  name: 'server',
  dir: 'dist',
  entryFileNames: '[name].js',
  format: 'cjs',
  sourcemap: !isProd,
  exports: 'named'
}

const external = [
  ...commonExternal,
  'react-dom/server',
  'cors',
  'reload',
  '@apollo/client',
  '@apollo/react-hooks',
  'apollo-cache-inmemory',
  'apollo-link',
  'apollo-link-http',
  '@apollo/react-common',
  '@apollo/react-ssr'
]

const options = {
  cache: true,
  treeshake: true,
  external,
  preserveModules: true,
  onwarn(warning, warn) {
    // skip certain warnings
    if (warning.code === 'UNRESOLVED_IMPORT' || warning.code === 'EVAL') return

    // Use default for everything else
    warn(warning)
  }
}

const watchOptions = {
  input,
  output,
  plugins,
  ...options,
  watch: {
    exclude: 'node_modules/**',
    include: 'src/**'
  }
}

const rollupInputOptions = {
  input,
  ...options,
  plugins
}

const rollupOutputOptions = output

module.exports = {
  watchOptions,
  rollupInputOptions,
  rollupOutputOptions
}
