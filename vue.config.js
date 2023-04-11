const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  runtimeCompiler: true,
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/initOpenAI': { target: 'http://138.91.106.87:8999' }, // TODO: 替换Azure代理地址
      '/createChatCompletion': {
        target: 'http://138.91.106.87:8999',
        proxyTimeout: 1000 * 60 * 10,
        timeout: 1000 * 60 * 10
      }, // TODO: 替换Azure代理地址
      '/dataList': { target: 'http://127.0.0.1:9999' } // TODO: 替换后台接口地址
    },
  }
});
