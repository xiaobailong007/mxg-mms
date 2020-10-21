module.exports = {
    devServer: {
        port: 8888, //端口号，如果端口号被占用，会自动提升1
        host: "localhost", //主机名，127.0.0.1，真机0.0.0.0
        https: false, //协议
        open: true, //启动服务时自动打开浏览器访问
        proxy: { //开发环境代理配置
            // '/dev-api': {
            [process.env.VUE_APP_BASE_API]: {
                //代理服务器地址，代理访问
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true, //开启代理服务器
                pathRewrite: {
                    //将请求地址前缀/dev-api替换为空
                    // '^/dev-api': '',
                    ['^'+[process.env.VUE_APP_BASE_API]]:''
                }
            }

        }
    },
    lintOnSave: false, //关闭格式检查
    productionSourceMap: false, //打包时不会生成.map文件，加快打包速度

}