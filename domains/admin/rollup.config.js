import typescript from 'rollup-plugin-typescript2'
import { babel as pluginBabel } from '@rollup/plugin-babel'
import image from '@rollup/plugin-image'
import * as path from 'path'
import pkg from './package.json'

const extensions = [".ts", ".tsx", ".js", ".jsx"]

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: 'src/Admin.tsx',
  output: [
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    'react/jsx-runtime',
    '@material-ui/icons',
    '@material-ui/core'
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    pluginBabel({
      babelHelpers: 'bundled',
      extensions,
      configFile: path.resolve(__dirname, '.babelrc.js')
    }),
    image()
  ]
}
