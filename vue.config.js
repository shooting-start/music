module.exports = {
    lintOnSave: false,
    assetsDir: 'static',
    parallel: false,
    devServer: {
        // 设置代理
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3000", //目标主机域名
                ws: true, //代理的WebSockets
                // 开启代理：在本地创建一个虚拟服务端http://127.0.0.1:8080，
                // 接收浏览器的请求并发送请求给服务器，这样服务端和服务端的数据交互就不会有跨域问题
                changeOrigin: true,
                // 将接口中的'/api'换成'/',底层会将所写的地址与完整的地址进行拼接之后再进行请求
                // 例：请求的接口为 url: '/api/login/iphone'
                // => http://127.0.0.1:8080/api/login/iphone
                // => http://127.0.0.1:8080/login/iphone
                pathRewrite: {
                    "^/api": ""
                }
            }
        },
    }
}