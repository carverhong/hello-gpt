const { defineConfig } = require('@vue/cli-service');
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');

// openAI实例
let openAI = undefined;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      devServer.app.use(bodyParser.json());

      // 初始化openAI
      devServer.app.post('/initOpenAI', (req, res) => {
        console.log('=========> /initOpenAI');
        const configuration = new Configuration({
          apiKey: req.body.apiKey,
        });
        openAI = new OpenAIApi(configuration);
        res.json({ status: 0 });
        console.log('<========= /initOpenAI');
      });

      // 调用createCompletion
      devServer.app.post('/createCompletion', (req, res) => {
        console.log('=========> /createCompletion');
        openAI.createCompletion({
          model: "text-davinci-003",
          prompt: req.body.prompt,
          temperature: 0,
          max_tokens: 3000,
        }).then(output => {
          console.log('<========= /createCompletion', output.data);
          res.json({ status: 0, completion: output.data });
        }, err => {
          console.log('<========= /createCompletion', err);
          res.json({ status: 1, err: err.message });
        });
      });
    }
  }
});
