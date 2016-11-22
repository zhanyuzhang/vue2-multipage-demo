// webpack.config.js
var glob = require('glob');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ora = require('ora');

var webpackConfig = {
    /* 一些webpack基础配置 */
    entry: {},
    output: {
        path: __dirname + "/public",
        filename: "dev/pc/[name]/index.js",
        // publicPath: '/public/',
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract('style', 'css?modules!postcss')
            // },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            // {
            //     test: /\.jade$/,
            //     loader: 'jade'
            // },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader:'url?limit=100&name=/images/[name]-[hash].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            compoents: path.join(__dirname, './src/components'),
            util: path.join(__dirname, './src/util')
        }
    },
    plugins: [],
    devtool: 'eval-source-map'
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
    var files = glob.sync(globPath),
        entries = {};

    files.forEach(function(filepath) {
        var name = filepath.split('/').find(function (e) {
            return /page-/.test(e);
        });
        name && (entries[name] = './' + filepath);
    });

    return entries;
}

var entries = getEntries('src/pages/pc/**/main.js');

Object.keys(entries).forEach(function(name) {
    // 每个页面生成一个entry，如果需要HotUpdate，在这里修改entry
    webpackConfig.entry[name] = entries[name];

    // 每个页面生成一个html
    var plugin = new HtmlWebpackPlugin({
        // 生成出来的html文件名
        filename: 'dev/pc/' + name + '/index.html',
        // 每个html的模版，这里多个页面使用同一个模版
        template: './src/tmpl/common-pc.html',
        // 自动将引用插入html
        inject: true,
        // 每个html引用的js模块，也可以在这里加上vendor等公用模块
        chunks: [name]
    });
    webpackConfig.plugins.push(plugin);
});

var spinner = ora('building for pc production...');
spinner.start();
webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
})

