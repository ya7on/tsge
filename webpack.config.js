const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./examples/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new ESLintPlugin({}),
        new HtmlWebpackPlugin({
            template: "template/index.html"
        })
    ],
    devServer: {
        static: ["assets"],
        compress: true,
        port: 9000,
        open: true,
    },
};
