const { defineConfig } = require('@vue/cli-service');
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require('body-parser');

// openAI实例
let openAI = [];

module.exports = defineConfig({
  runtimeCompiler: true,
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
        openAI.push(new OpenAIApi(configuration));
        res.json({ status: 0, sessionId: openAI.length - 1 });
        console.log('<========= /initOpenAI');
      });

      // 调用createCompletion
      devServer.app.post('/createCompletion', (req, res) => {
        console.log('=========> /createCompletion');
        const item = openAI[req.body.sessionId];
        if (!item) {
          console.log('<========= /createCompletion 实例不存在');
          res.json({ status: 1, err: '实例不存在' });
          return;
        }

        openAI[req.body.sessionId].createCompletion({
          model: "text-davinci-003",
          prompt: req.body.prompt,
          temperature: 0,
          max_tokens: 3000,
        }).then(output => {
          console.log('<========= /createCompletion', output.data);
          res.json({ status: 0, completion: output.data });
        }, err => {
          console.log('<========= /createCompletion', err.message);
          res.json({ status: 1, err: err.message });
        });
      });

      // 调用createChatCompletion
      devServer.app.post('/createChatCompletion', (req, res) => {
        console.log('=========> /createChatCompletion');
        const item = openAI[req.body.sessionId];
        if (!item) {
          console.log('<========= /createChatCompletion 实例不存在');
          res.json({ status: 1, err: '实例不存在' });
          return;
        }

        openAI[req.body.sessionId].createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: req.body.messages,
          max_tokens: 1024,
          temperature: 0.8,
        }).then(output => {
          console.log('<========= /createChatCompletion', output.data);
          res.json({ status: 0, completion: output.data });
        }, err => {
          console.log('<========= /createChatCompletion', err.message);
          res.json({ status: 1, err: err.message });
        });
      });
    }
  }
});
