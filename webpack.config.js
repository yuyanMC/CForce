const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        player: './src/player.ts',
        selector: './src/selector.ts',
        finish: './src/finish.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|wav|mp3|mp4|json|)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './player.tpl.html',
            templateParameters: {},
            chunks: ['player'],
            filename: 'player.html'
        }),
        new HtmlWebpackPlugin({
            template: './selector.tpl.html',
            templateParameters: {},
            chunks: ['selector'],
            filename: 'selector.html'
        }),
        new HtmlWebpackPlugin({
            template: './finish.tpl.html',
            templateParameters: {},
            chunks: ['finish'],
            filename: 'finish.html'
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: "development"
};