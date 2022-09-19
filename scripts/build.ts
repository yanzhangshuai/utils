import fs from 'fs'
import glob from 'glob'
import type { RollupOptions } from 'rollup'
import { rollup } from 'rollup'
import dts from 'rollup-plugin-dts'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'

build().then(() => {
  console.log('build success')
  copyTypes()
}).catch((err) => {
  console.error(err)
})

function build() {
  const buildConfig = (input: string): RollupOptions[] => {
    return [
      // file
      {
        input,
        output: [
          { file: input.replace('src/', 'dist/').replace('.ts', '.mjs'), format: 'esm' },
          { file: input.replace('src/', 'dist/').replace('.ts', '.cjs'), format: 'cjs' },
        ],
        plugins: [
          alias({ entries: [{ find: /^node:(.+)$/, replacement: '$1' }] }),
          resolve({ preferBuiltins: true }),
          json(),
          commonjs(),
          esbuild({ target: 'es2015', minify: true }),
        ],
      },
      // d.ts
      {
        input,
        output: { file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'), format: 'esm' },
        plugins: [dts({ respectExternal: true })],
      },
    ]
  }

  const entries = ['src/index.ts']

  const config = entries.map(buildConfig).flat()

  return Promise.all(config.map(async (options) => {
    const bundle = await rollup(options)

    if (!options.output)
      return

    const output = Array.isArray(options.output) ? options.output : [options.output]
    await output.map(bundle.write)
  }))
}

/**
 * 拷贝声明文件
 */
function copyTypes() {

  //  获取src目录下所有的ts文件 过滤的d.ts和test.ts文件
  const types = glob.sync('src/@types/*.d.ts')
  types.forEach((type) => {
    const content = fs.readFileSync(type, 'utf-8')
    const dist = type.replace('src/@types/', 'dist/')
    fs.writeFileSync(dist, content)
  })
}

