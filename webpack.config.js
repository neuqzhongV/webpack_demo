//导入处理路径模块
var path = require('path');
//导入自动生成HTML的插件
var htmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname,'src/js/main.js'),

    output:{
        path:path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new htmlWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            filename:'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        rules:[
            {test: /\.css$/, use:['style-loader','css-loader']},
            {test: /\.scss$/, use:['style-loader','css-loader','sass-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=43960'},
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/}
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname,'src'),
        open: true,
        port: 8080,
        hot: true
    }
}