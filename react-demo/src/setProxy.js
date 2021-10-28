const proxySettings = {
  // 接口代理1
  '/api': {
    target: 'http://127.0.0.1:3000',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '',
    },
  }
};

module.exports = proxySettings;
