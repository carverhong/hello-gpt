const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");
const app = express();

// openAI实例
let openAI = [];

app.use(bodyParser.json());

app.post('/initOpenAI', function (req, res) {
    console.log('=========> /initOpenAI');
    for (let i = 0; i < openAI.length; ++i) {
        if (openAI[i].configuration.apiKey === req.body.apiKey) {
            res.json({ status: 0, sessionId: i });
            console.log('<========= /initOpenAI, sessionId=' + i);
            return;
        }
    }

    const configuration = new Configuration({
        apiKey: req.body.apiKey,
    });
    openAI.push(new OpenAIApi(configuration));
    const id = openAI.length - 1;
    res.json({ status: 0, sessionId: id });
    console.log('<========= /initOpenAI, sessionId=' + id);
});

app.post('/createCompletion', (req, res) => {
    console.log('=========> /createCompletion');
    const item = openAI[req.body.sessionId];
    if (!item) {
        console.log('<========= /createCompletion 实例不存在');
        res.json({ status: 1, err: '实例不存在' });
        return;
    }

    openAI[req.body.sessionId].createCompletion({
        model: req.body.model,
        prompt: req.body.prompt,
        temperature: req.body.temperature,
        max_tokens: req.body.max_tokens,
    }).then(output => {
        console.log('<========= /createCompletion', output.data);
        res.json({ status: 0, completion: output.data });
    }, err => {
        console.log('<========= /createCompletion', err.message);
        res.json({ status: 1, err: err.message });
    });
});

// 调用createChatCompletion
app.post('/createChatCompletion', (req, res) => {
    console.log('=========> /createChatCompletion');
    const item = openAI[req.body.sessionId];
    if (!item) {
        console.log('<========= /createChatCompletion 实例不存在');
        res.json({ status: 1, err: '实例不存在' });
        return;
    }

    openAI[req.body.sessionId].createChatCompletion({
        model: req.body.model,
        messages: req.body.messages,
        max_tokens: req.body.max_tokens,
        temperature: req.body.temperature,
    }).then(output => {
        console.log('<========= /createChatCompletion', output.data);
        res.json({ status: 0, completion: output.data });
    }, err => {
        console.log('<========= /createChatCompletion', err.message);
        res.json({ status: 1, err: err.message });
    });
});

app.listen(8999);

console.log('open ai 临时代理: port=8999');
