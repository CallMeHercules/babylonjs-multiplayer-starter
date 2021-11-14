const path = require('path');
const fs = require('fs');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, "src/index.ts"),
    output: {
        filename: 'js/babylonBundle.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        fallback: {
            fs: false,
            path: false 
          }
    },
    module: {
        rules: [{
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                loader: 'source-map-loader',
                enforce: 'pre',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(png|jpg|gif|env|glb|stl)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 8192,
                        name: "[name].[contenthash].[ext]",
                    },
                }, ],
            }
        ]
    },
    // plugins: [
    //     new CleanWebpackPlugin(),
    //     new HtmlWebpackPlugin({
    //         inject: true,
    //         template: path.resolve(appDirectory, "public/index.html"),
    //     }),
    // ],
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public/index.html")
        }),
        new webpack.ProvidePlugin({
            Ammo: 'ammo.js'
        })
    ],
    // // Just for ammo
    // node: {
    //     fs: 'empty'
    // }
}