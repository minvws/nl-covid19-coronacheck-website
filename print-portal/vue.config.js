const webpack = require("webpack")

module.exports = {
    publicPath: '/nl/print/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].unique = Math.round(Math.random() * 99999999);
                return args;
            })
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer']
            })
        ],
        resolve: {
            fallback: {
                stream: require.resolve('stream-browserify'),
                buffer: require.resolve('buffer')
            }
        }
    },
    transpileDependencies: [
        'nl-covid19-coronacheck-web-pdf-tools',
        'jspdf',
        'vue-i18n',
        'oidc-client',
        'date-fns',
        'pdfjs-dist'
    ]
    // , devServer: {
    //     open: process.platform === 'darwin',
    //     host: '0.0.0.0',
    //     port: 8080, // CHANGE YOUR PORT HERE!
    //     https: true,
    //     hotOnly: false,
    // }
}
