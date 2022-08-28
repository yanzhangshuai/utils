import glob from 'glob'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

//  获取src目录下所有的ts文件 过滤的d.ts和test.ts文件
const entries = glob.sync('src/**/*.ts').filter(file => !file.endsWith('.d.ts') && !file.endsWith('.test.ts'))

const plugins = [
  alias({ entries: [{ find: /^node:(.+)$/, replacement: '$1' }] }),
  resolve({ preferBuiltins: true }),
  json(),
  commonjs(),
  esbuild({ target: 'es2015', minify: false }),
]

export default [
  ...entries.map(input => ({
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        format: 'cjs',
      },
    ],
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    output: {
      file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    external: [],
    plugins: [
      dts({ respectExternal: true }),
    ],
  })),
]
