const { defineConfig } = require('@vue/cli-service');
//gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: './',
  assetsDir: 'static',
  configureWebpack: (config) => {
    config.externals = {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios:'axios',
      echarts:'echarts'
    };
    let plugins = [
      new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
        threshold: 200,
        minRatio: 0.6,
      }),
    ];
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
});
