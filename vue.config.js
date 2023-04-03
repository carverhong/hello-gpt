const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  runtimeCompiler: true,
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/initOpenAI': { target: 'http://127.0.0.1:8999' }, // TODO: 替换Asure代理地址
      '/createChatCompletion': { target: 'http://127.0.0.1:8999' }, // TODO: 替换Asure代理地址
      '/dataList': { target: 'http://127.0.0.1:9999' } // TODO: 替换后台接口地址
    },
  }
});
