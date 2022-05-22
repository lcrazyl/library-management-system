const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,//不需要去转译"node\_modules"这里面的文件。
            },
            {
                test: /\.css$/,
                use: [

                    'style-loader',// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里
                    'css-loader' // css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入
                ]
            }
        ],

    }
}
