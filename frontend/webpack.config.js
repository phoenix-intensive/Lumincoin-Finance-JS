const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/app.js',
    mode: "development",
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    devServer: {
        static: '.dist',
        open: 'Chrome',
        compress: true,
        port: 9001,
        historyApiFallback: true,
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/templates", to: "templates"},
                {from: "./src/styles", to: "styles"},
                {from: "./src/static", to: "static"},
                {from: "./bootstrap-5.2.3-examples/assets/dist/css/bootstrap.min.css", to: "css"},
                {from: "./bootstrap-5.2.3-examples/assets/dist/js/bootstrap.bundle.min.js", to: "js"},
                {from: "./bootstrap-5.2.3-examples/sidebars/sidebars.js", to: "js"},
                {from: "./src/utils/chart.js", to: "js"},
                {from: "./.env", to: "./"}
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|ot)$/,
                type: 'asset',
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/fonts',
                    },
                },
            },
        ],
    },
};