const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('assets', path.resolve(__dirname, 'src/assets'))
      .set('components', path.resolve(__dirname, 'src/components'))
      .set('router', path.resolve(__dirname, 'src/router'))
      .set('store', path.resolve(__dirname, 'src/store'))
      .set('views', path.resolve(__dirname, 'src/views'))
      .set('api', path.resolve(__dirname, 'src/api'))
      .set('mixin', path.resolve(__dirname, 'src/mixin'))
      .set('public', path.resolve(__dirname, 'public'))
  }
};
