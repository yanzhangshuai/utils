// const { build } = require('esbuild')
// const glob = require('glob')
// const { dtsPlugin } = require("esbuild-plugin-d.ts");

// const outdir= 'dist';

// //  获取src目录下所有的ts文件 过滤的d.ts和test.ts文件
// const entries = glob.sync('src/**/*.ts').filter(file => !file.endsWith('.d.ts') && !file.endsWith('.test.ts'))

// const options = {
//   entryPoints: entries,
//   outdir: outdir,
//   bundle: true,
//   loader: {
//     '.ts': 'ts',
//     '.d.ts': 'ts',
//   },
//   format: 'esm',
//   sourcemap: false,
//   target: ['es6'],
//   write: true,
//   plugins: [
//   ],
// };

// Promise.all([
//   build({
//     ...options,
//     outExtension: {
//       '.js': '.min.js',
//     },
//     minify: true,
//   }), build({
//     ...options,
//     outExtension: {
//       '.js': '.js',
//     },
//     minify: false,
//   })]).then(() => {
// }).catch(() => process.exit(1));