const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://eolink.o.apispace.com/chatgpt-turbo'
  }
})
