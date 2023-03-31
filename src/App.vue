<template>
  <div id="app">
    <div id="input-area">
      <p v-for="(item, idx) in historyPrompt" :key="idx">
        {{ item }}
      </p>
      <el-input v-model="prompt" placeholder="请输入测试prompt">
        <template slot="append">
          <el-button @click="onSubmit" v-loading.fullscreen.lock="loading"
            >测试</el-button
          >
        </template>
      </el-input>
    </div>
    <component
      :is="compName"
      :initTableData="helloTableParams.tableData"
      :tableHeader="helloTableParams.tableHeader"
      :canEdit="helloTableParams.canEdit"
      :canDelete="helloTableParams.canDelete"
    />

    <!-- 初始化apiKey -->
    <el-dialog
      title="初始化AI助手"
      :visible.sync="apiKeyDialogShow"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-input v-model="apiKey" placeholder="请输入ApiKey"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="initOpenAI">确 定</el-button>
      </div>
    </el-dialog>
<div id="result"></div>
  </div>
</template>

<script>
import HelloTable from "./components/HelloTable.vue";
import { Configuration, OpenAIApi } from "openai";
import { defaultMsg } from "./utils/datasource";
import { generateTemplate } from "./utils/patchToDSL"
import jsonpatch from 'jsonpatch'
import Vue from 'vue'

export default {
  name: "app",
  components: {
    HelloTable,
  },
  data() {
    return {
      historyPrompt: [],
      apiKey: "",
      apiKeyDialogShow: true,
      prompt: "",
      compDSL: "",
      compName: "",
      helloTableParams: {},
      openai: null,
      loading: false,
      message: [],
      json: {},
      content: {}
    };
  },
  mounted() {
    this.message = this.message.concat(defaultMsg);
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

      this.historyPrompt.push(this.prompt);
      this.prompt = "";
      this.compName = dsl.comp;
      if (dsl.comp === "HelloTable") {
        // this.helloTableParams = dsl.params;
        this.helloTableParams = params.params;
      }
    },
    async onSubmit(event) {
      event.preventDefault();
      try {
        this.loading = true;
        this.message.push({
          role: "user",
          content: this.prompt
        });
        const completion = await this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: this.message,
          max_tokens: 2048,
          temperature: 0.2
        });
        console.log('content: ', completion.data.choices[0].message.content);

        const params = this.convertOperationsToJSON(completion.data.choices[0].message.content);
        console.log('params:', params);

        this.content = generateTemplate(params);
        console.log(this.content);

        this.run()
        this.loading = false
      } catch (error) {
        console.error(error);
        this.$message.error(error.message);
        this.loading = false;
      }
    },
    // 将jsonpatch转换为json
    convertOperationsToJSON(operations) {
      let json = this.json;
      operations = this.extractJSON(operations);
      console.log('operations: ', operations);
      json = jsonpatch.apply_patch(json, operations);

      return json;
    },
    // 提取json
    extractJSON(input) {
      const regex = /\[([\s\S]+)\]/; // 匹配最外层的中括号及其中的内容
      const match = input.match(regex); // 在输入中搜索匹配项
      if (match) {
        return eval(`[${match[1]}]`); // 返回匹配项中的第一个子表达式（即中括号内的内容）
      } else {
        return null; // 如果未找到匹配项，则返回 null
      }
    },
    // 生成vue组件
    run() {
      let template = this.getSource("template");
      if (!template) return

      let script = this.getSource("script");
      if (script) {
        script = script.replace(/export default/, "return");
      } else {
        script = "return {}"
      }
      let styleCss = this.getSource("style");
      let style = document.createElement("style");
      style.innerHTML = styleCss;
      document.head.appendChild(style);
      // let obj = new Function(script)();
      let obj = {};
      obj.template = template;

      // console.log(obj);
      // 创建构造器
      let Profile = Vue.extend(obj);
      new Profile().$mount("#result")
    },
    getSource(type) {
      const reg = new RegExp(`<${type}[^>]*>`);
      let content = this.content;
      let matches = content.match(reg);
      if (matches) {
        let start = content.indexOf(matches[0]) + matches[0].length;
        let end = content.lastIndexOf(`</${type}`);
        return content.slice(start, end)
      }
    },
    reset() {
      this.content = ''
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
