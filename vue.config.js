const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  runtimeCompiler: true,
  transpileDependencies: true,
  devServer: {
    proxy: 'http://127.0.0.1:8999'
  }
});
