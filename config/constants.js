/* eslint-plugin-disable @typescript-eslint */
const { DEFAULT_EXTENSIONS } = require('@babel/core')

const pkg = require('../package.json')

const isProd = process.env.BUILD === 'production'

const builtinModules = Object.keys(process.binding('natives'))
// console.log('sdhjdkhj', builtinModules.find(module => module == '@apollo/client/core'));

const reactNamedExports = [
  'Children',
  'Component',
  'Fragment',
  'Profiler',
  'PureComponent',
  'StrictMode',
  'Suspense',
  '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
  'cloneElement',
  'createContext',
  'createElement',
  'createFactory',
  'createRef',
  'forwardRef',
  'isValidElement',
  'lazy',
  'memo',
  'useCallback',
  'useContext',
  'useDebugValue',
  'useEffect',
  'useImperativeHandle',
  'useLayoutEffect',
  'useMemo',
  'useReducer',
  'useRef',
  'useState',
  'version'
]

const reactDOMNamedExports = [
  '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
  'createPortal',
  'findDOMNode',
  'flushSync',
  'hydrate',
  'render',
  'unmountComponentAtNode',
  'unstable_batchedUpdates',
  'unstable_createPortal',
  'unstable_renderSubtreeIntoContainer',
  'version'
]

const reactDOMServerNamedExports = ['renderToNodeStream']

const reactIsNamedExports = [
  'AsyncMode',
  'ConcurrentMode',
  'ContextConsumer',
  'ContextProvider',
  'Element',
  'ForwardRef',
  'Fragment',
  'Lazy',
  'Memo',
  'Portal',
  'Profiler',
  'StrictMode',
  'Suspense',
  'isAsyncMode',
  'isConcurrentMode',
  'isContextConsumer',
  'isContextProvider',
  'isElement',
  'isForwardRef',
  'isFragment',
  'isLazy',
  'isMemo',
  'isPortal',
  'isProfiler',
  'isStrictMode',
  'isSuspense',
  'isValidElementType',
  'typeOf'
]

const reactRouterNamedExports = [
  'BrowserRouter',
  'StaticRouter',
  'matchPath',
  'Route',
  'NavLink',
  'Link',
  'Redirect',
  'Switch'
]

const extensions = [...DEFAULT_EXTENSIONS, '.jsx', '.ts', '.tsx', '.png']

const commonExternal = [
  ...builtinModules,
  'react',
  'react-router',
  'react-router-dom',
  'react-is',
  'prop-types',
  'styled-components',
  'isomorphic-fetch'
]

module.exports = {
  DEFAULT_EXTENSIONS,
  pkg,
  isProd,
  builtinModules,
  reactNamedExports,
  reactDOMNamedExports,
  reactDOMServerNamedExports,
  reactIsNamedExports,
  reactRouterNamedExports,
  extensions,
  commonExternal
}
