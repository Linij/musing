
// 本例中打包是将所有源码打包为一个js文件
const path = require('path')
// 设置打包好后项目的全局访问名称，类似于jQuery库的$
const packName = "BABYLONJS"

// 导出配置
module.exports = {
    entry: {
        // 源码主文件入口
        launcher: "/src/index.ts"
    },
    // 打包模式
    mode: "development",
    output: {
        // 打包后输出的js文件
        filename: "babylon.js",
        // 输出目录
        path: path.resolve(__dirname + "/dist"),
        // 目标库，只有umd模式可以打包为一个js文件
        libraryTarget: "umd",
        // 设置库名
        library: {
            root: packName,
            amd: packName,
            commonjs: packName
        },
        globalObject: '(typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : this)',
        umdNamedDefine: true
    },
    // 输出source-map文件
    devtool: "source-map",

    resolve: {
        // 打包指定后缀的文件
        extensions: [".ts", ".tsx", ".js", ".json"],
        modules: ['node_modules']
    },

    module: {
        rules: [
            // 打包规则.
            {test: /\.ts?$/, loader: "awesome-typescript-loader"},

            // 输出map规则
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"}
        ]
    },

    // 打包时排除本项目引用，但非本项目的模块
    externals: {
        "babylonjs": "BABYLON",
        "babylonjs-loaders": "BABYLON",
        "babylonjs-gui": "BABYLON",
    }
}