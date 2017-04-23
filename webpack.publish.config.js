//1.导入处理路径模块
var path = require('path');
//2.导入自动生成HTML的插件
var htmlWebpackPlugin = require('html-webpack-plugin');
//3.导入webpack
var webpack = require('webpack');
//4.导入删除路径的插件
var cleanWebpackPlugin = require('clean-webpack-plugin');
//5.导入抽离css的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//6.导入压缩css的插件
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    entry: {
            app:path.resolve(__dirname,'src/js/main.js'),
            vendors: ['jquery']
    },

    output:{
        path:path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new htmlWebpackPlugin({ // 创建一个htmlWebpackPlugin插件
            template: path.resolve(__dirname, 'src/index.html'), // 指定模板页面
            filename: 'index.html', // 指定在内存中生成的页面的名称
            minify:{ // 压缩优化HTML页面
                collapseWhitespace:true, // 合并空白字符
                removeComments:true, // 移除注释
                removeAttributeQuotes:true // 移除属性上的引号
            }
         }),
        new cleanWebpackPlugin(['dist']),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors', // 指定抽取公共模块的名称
            filename:'vendors.js' // 指定抽取出来的文件真实名称
        }),
        new webpack.optimize.UglifyJsPlugin({ // 优化压缩JS
            compress:{
                warnings:false // 移除警告
            }
        }),
        new webpack.DefinePlugin({ // 设置为产品上线环境，进一步压缩JS代码
            'process.env':{
                'NODE_ENV':JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("styles.css"),// 抽离CSS样式名称
        new OptimizeCssAssetsPlugin() // 创建一个压缩CSS文件的插件
    ],

    module: {
        rules:[
            {test: /\.css$/, use: ExtractTextPlugin.extract({// 使用插件来处理CSS样式
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, // 处理CSS文件的loader配置
            {
            test: /\.scss$/, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },// 处理sass文件的loader配置
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=43960&name=images/imags-[hash:7].[ext]'},
            {test:/\.js$/, use:'babel-loader', exclude:/node_modules/}
        ]
    }
}