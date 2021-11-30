const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, './index.ts'),
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                    loader: 'ts-loader',
                        options: {
                           transpileOnly: true
                        },
                    },
                ],
                exclude: /node_modules/,
            }, 
            {
                test: /\.(sa|sc|c)ss$/,
                use: [ 
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }, 
            {
                test: /\.pug$/i,
                loader: 'pug-loader',
                exclude: /node_modules/,
            }, 
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
    ],
    devServer: {
        historyApiFallback: true,
        port: 3000,
    },
}
