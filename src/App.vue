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
  </div>
</template>

<script>
import HelloTable from "./components/HelloTable.vue";
import { Configuration, OpenAIApi } from "openai";
import { defaultMsg } from "./utils/datasource";
// import { generatePrompt } from "./utils/datasource";
import { convertOperationsToJSON } from "./utils/parseUtil";

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
          content: this.prompt + "，默认按照上一个示例来生成JSON数据",
          role: "user",
        });
        const completion = await this.openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: this.message,
          max_tokens: 1024,
          temperature: 0.8,
        });
        console.log(completion.data.choices[0].message.content);
        const params = convertOperationsToJSON(
          completion.data.choices[0].message.content
        );

        // const completion = await this.openai.createCompletion({
        //   model: "code-davinci-002",
        //   prompt: generatePrompt(this.prompt),
        //   max_tokens: 2048,
        //   temperature: 0.8,
        // });

        // console.log(completion.data.choices[0].text);
        // const params = convertOperationsToJSON(completion.data.choices[0].text);

        console.log("params:", params);

        this.generate(params);
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.$message.error(error.message);
        this.loading = false;
      }
    },
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
