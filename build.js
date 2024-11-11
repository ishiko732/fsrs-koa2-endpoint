/* eslint-disable @typescript-eslint/no-require-imports */
const { nodeExternalsPlugin } = require('esbuild-node-externals')

require('esbuild')
    .build({
        entryPoints: ['src/index.ts'],
        bundle: true,
        outfile: 'dist/index.js',
        platform: 'node',
        plugins: [
            nodeExternalsPlugin({
                dependencies: false,
            }),
        ],
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    })