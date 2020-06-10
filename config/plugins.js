/* eslint-plugin-disable @typescript-eslint */

const path = require('path')
const fs = require('fs')
const {
  isProd,
  extensions,
  reactNamedExports,
  reactDOMNamedExports,
  reactIsNamedExports,
  apolloServerExpress,
  reactRouterNamedExports,
  reactDOMServerNamedExports
} = require('./constants')

const replace = require('@rollup/plugin-replace')
const typescript = require('rollup-plugin-typescript2')
const babel = require('@rollup/plugin-babel').default
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const visualizer = require('rollup-plugin-visualizer')
const filesize = require('rollup-plugin-filesize')
const progress = require('rollup-plugin-progress')
const run = require('@rollup/plugin-run')
const json = require('@rollup/plugin-json')
const { uglify } = require('rollup-plugin-uglify')
const alias = require('@rollup/plugin-alias')

const resolverPlugin = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  resolveId(source, importer) {
    console.log('importer', importer)
    if (/\.(gif|jpe?g|tiff|png|svg|webp|bmp)$/i.test(source)) {
      return path.resolve(path.dirname(importer), source)
    }
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  load(id) {
    if (/\.(gif|jpe?g|tiff|png|svg|webp|bmp)$/i.test(id)) {
      const referenceId = this.emitFile({
        type: 'asset',
        name: path.basename(id),
        source: fs.readFileSync(id)
      })
      return `export default import.meta.ROLLUP_FILE_URL_${referenceId};`
    }
  }
}

const sourceMapLoaderPlugin = {
  load(id) {
    if (id.endsWith('.esm.js')) {
      try {
        const map = JSON.parse(fs.readFileSync(id + '.map'))
        map.sources.forEach((source, i) => {
          map.sources[i] = path.normalize(path.join(id, source))
        })
        return {
          code: fs.readFileSync(id, 'utf8'),
          map: map
        }
      } catch (e) {
        console.log('failed to find source map for ' + id)
      }
    }
    return null
  }
}

const commonPlugins = [
  alias({
    entries: [
      { find: '@atoms', replacement: path.resolve(__dirname, '../src/shared/atoms') },
      { find: '@molecules', replacement: path.resolve(__dirname, '../src/shared/molecules') },
      { find: '@organisms', replacement: path.resolve(__dirname, '../src/shared/organisms') },
      { find: '@templates', replacement: path.resolve(__dirname, '../src/shared/templates') },
      { find: '@pages', replacement: path.resolve(__dirname, '../src/shared/pages') },
      { find: '@constants', replacement: path.resolve(__dirname, '../src/shared/constants') },
      { find: '@utils', replacement: path.resolve(__dirname, '../src/shared/utils') },
      { find: '@assets', replacement: path.resolve(__dirname, '../src/assets') },
      { find: '@types', replacement: path.resolve(__dirname, '../src/types') },
      { find: '@pkg', replacement: path.resolve(__dirname, '../package.json') }
    ]
  }),
  commonjs({
    include: 'node_modules/**',
    exclude: ['node_modules/process-es6/**', 'node_modules/symbol-observable/es/*.js'],
    extensions,
    namedExports: {
      react: reactNamedExports,
      'react-dom': reactDOMNamedExports,
      'react-dom/server': reactDOMServerNamedExports,
      'react-is': reactIsNamedExports,
      'react-router-dom': reactRouterNamedExports,
      'apollo-link-rest': ['RestLink']
    }
  }),
  resolverPlugin,
  sourceMapLoaderPlugin,
  babel({
    extensions,
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
  }),
  json({
    compact: true,
    namedExports: false
  }),
  isProd &&
    progress({
      clearLine: true
    }),
  isProd && filesize()
]

module.exports = {
  replace,
  typescript,
  babel,
  commonjs,
  resolve,
  visualizer,
  filesize,
  progress,
  json,
  uglify,
  resolverPlugin,
  run,
  commonPlugins
}
