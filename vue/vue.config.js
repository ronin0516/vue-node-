module.exports = {
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-px2rem-exclude')({
                        remUnit: 75,
                        exclude: /node_module|folder/i
                    })
                ]
            }
        }
    },
    devServer: {
        proxy: {
            '/apis' : {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '/apis': ''
                }
            }
        }
    }
}
