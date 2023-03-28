<template>
  <div id="app">
    <div id="input-area">
      <p v-for="(item, idx) in historyInput" :key="idx">
        {{ item }}
      </p>
      <el-input v-model="currentInput" placeholder="请输入prompt">
        <template slot="append">
          <el-button @click="generate">生成组件</el-button>
        </template>
      </el-input>
      <div style="margin-top: 15px">
        <el-input v-model="prompt" placeholder="请输入测试prompt">
          <template slot="append">
            <el-button @click="onSubmit">测试</el-button>
          </template>
        </el-input>
      </div>
    </div>
    <component :is="compName" :initTableData="helloTableParams.tableData" :tableHeader="helloTableParams.tableHeader"
      :canEdit="helloTableParams.canEdit" :canDelete="helloTableParams.canDelete" :loading="loading" />

    <!-- 初始化apiKey -->
    <el-dialog title="初始化AI助手" :visible.sync="apiKeyDialogShow" :close-on-click-modal="false"
      :close-on-press-escape="false" :show-close="false">
      <el-input v-model="apiKey" placeholder="请输入ApiKey"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="initOpenAI">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HelloTable from "./components/HelloTable.vue";
import { Configuration, OpenAIApi } from "openai";
import { defaultMsg, generatePrompt } from "./utils/datasource";

export default {
  name: "app",
  components: {
    HelloTable,
  },
  data() {
    return {
      historyInput: [],
      currentInput: "",
      apiKey: "",
      apiKeyDialogShow: true,
      prompt: "",
      compDSL: "",
      compName: "",
      helloTableParams: {},
      openai: null,
      loading: false,
      message: [],
      json: {}
    };
  },
  mounted() {
    this.message = this.message.concat(defaultMsg)
  },
  methods: {
    /** 检查apiKey */
    initOpenAI() {
      if (this.apiKey) {
        const configuration = new Configuration({
          apiKey: this.apiKey,
        });
        const openai = new OpenAIApi(configuration);
        this.openai = openai;
        this.apiKeyDialogShow = false;
      }
    },
    generate(params) {
      // TODO: 调用AI接口生成
      const dsl = {
        comp: "HelloTable",
        params: {
          tableHeader: ["name", "age", "gender", "address"],
          tableData: [
            { name: "John", age: 18, gender: "Male", address: "New York" },
            { name: "Jane", age: 22, gender: "Female", address: "London" },
            { name: "Bob", age: 32, gender: "Male", address: "Paris" },
            { name: "Tom", age: 24, gender: "Male", address: "Tokyo" },
          ],
          canEdit: true,
          canDelete: true,
        },
      };

      this.historyInput.push(this.currentInput);
      this.currentInput = "";
      this.compName = dsl.comp;
      if (dsl.comp === "HelloTable") {
        // this.helloTableParams = dsl.params;
        this.helloTableParams = params.params;
      }
    },
    async onSubmit(event) {
      event.preventDefault();
      try {
        this.loading = true
        this.message.push({ content: this.prompt + '，默认按照上一个示例来生成JSON数据', role: "user" });
        const completion = await this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: this.message,
          max_tokens: 1024,
          temperature: 0.8
        });
        console.log(completion.data.choices[0].message.content);
        const params = this.convertOperationsToJSON(completion.data.choices[0].message.content);

        // const completion = await this.openai.createCompletion({
        //   model: "code-davinci-002",
        //   prompt: generatePrompt(this.prompt),
        //   max_tokens: 2048,
        //   temperature: 0.8,
        // });

        // console.log(completion.data.choices[0].text);
        // const params = this.convertOperationsToJSON(completion.data.choices[0].text);

        console.log('params:', params);

        this.generate(params);
        this.loading = false
      } catch (error) {
        console.error(error);
        this.loading = false
      }
    },
    convertOperationsToJSON(operations) {
      let json = this.json;
      operations = this.extractJSON(operations);

      console.log('operations: ', operations);

      for (const operation of operations) {
        const path = operation.path.substring(1).split('/');
        let current = json;

        for (let i = 0; i < path.length; i++) {
          const key = path[i];
          const isLastKey = i === path.length - 1;
          const value = isLastKey ? operation.value : {};

          if (operation.op === 'add') {
            if (path[i] === '') { // add root object
              json = value;
              break;
            }
            if (isLastKey) {
              current[key] = value;
            } else if (!current[key]) {
              current[key] = {};
            }

            current = current[key];
          } else if (operation.op === 'replace') {
            if (isLastKey) {
              current[key] = value;
            } else if (current[key]) {
              current = current[key];
            } else {
              break;
            }
          } else if (operation.op === 'remove') {
            delete current[key];
            break;
          }
        }
      }

      return json;
    },
    // 过滤中文
    filterJsonPatch(str) {
      const patchArr = [];

      const jsonStr = str.replace(/[\u4e00-\u9fa5]/g, '').replace(/[^a-zA-Z0-9{}\[\]\/\-,._]/g, '');

      console.log(jsonStr);

      try {
        const parsed = JSON.parse(jsonStr);

        if (Array.isArray(parsed)) {
          parsed.forEach((item) => {
            if (item.op && item.path && item.value) {
              patchArr.push(item);
            }
          });
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }

      return patchArr;
    },
    // extractJSON(input) {
    //   const regex = /^\s*\[(.*)\]\s*$/s;
    //   const match = input.match(regex);
    //   if (match) {
    //     return match[1];
    //   }
    //   return null;
    // },
    extractJSON(input) {
      const regex = /\[([\s\S]+)\]/; // 匹配最外层的中括号及其中的内容
      const match = input.match(regex); // 在输入中搜索匹配项
      if (match) {
        return eval(`[${match[1]}]`); // 返回匹配项中的第一个子表达式（即中括号内的内容）
      } else {
        return null; // 如果未找到匹配项，则返回 null
      }
    }

  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#input-area {
  margin-bottom: 60px;
}
</style>
