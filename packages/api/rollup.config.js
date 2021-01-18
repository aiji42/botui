import typescript from 'rollup-plugin-typescript2'
import { babel as pluginBabel } from '@rollup/plugin-babel'
import * as path from 'path'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: 'inline'
    },
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: 'inline'
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ],
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    pluginBabel({
      babelHelpers: 'bundled',
      configFile: path.resolve(__dirname, '.babelrc.js')
    })
  ]
}
