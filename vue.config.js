const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
// 项目部署基础
// 默认情况下，应用将被部署在域的根目录下,
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'
// const webpack = require('webpack')

module.exports = {
  publicPath: BASE_URL,
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.performance.set('hints', false) // 报错：entrypoint size limit: The following entrypoint(s) combined asset size exceeds the recommended limit (244 KiB). This can impact web performance
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  runtimeCompiler: true,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   disableHostCheck: true,
  //   proxy: {
  //     '/': {
  //       target: 'http://172.16.101.109:2345',
  //       changeOrigin: true,
  //       ws: false, // 关闭websocket服务
  //       pathWrite: {
  //         '^/': '/',
  //       },
  //     },
  //   },
  // },
  configureWebpack: config => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: [
        'vux-ui',
        // new webpack.ProvidePlugin({
        //   $: 'jquery',
        //   jQuery: 'jquery',
        //   'windows.jQuery': 'jquery',
        // }),
      ],
    })
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
}
