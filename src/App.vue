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
      <el-input v-model="apiKey" placeholder="请输入ApiKey">
        <template slot="append">
          <el-button @click="inputApiKey">完成</el-button>
        </template>
      </el-input>
      <el-input v-model="prompt" placeholder="请输入测试prompt">
        <template slot="append">
          <el-button @click="onSubmit">测试</el-button>
        </template>
      </el-input>
    </div>
    <component :is="compName" :initTableData="helloTableParams.data" :tableHeader="helloTableParams.columns"
      :canEdit="helloTableParams.canEdit" :canDelete="helloTableParams.canDelete" />
  </div>
</template>

<script>
import HelloTable from "./components/HelloTable.vue";
import { Configuration, OpenAIApi } from "openai";
import { generatePrompt } from "./utils/datasource";

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
      prompt: "",
      compDSL: "",
      compName: "",
      helloTableParams: {},
      openai: null,
    };
  },
  mounted() {
    const configuration = new Configuration({
      apiKey: '',
    });
    const openai = new OpenAIApi(configuration);
    this.openai = openai;
  },
  methods: {
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
        this.helloTableParams = params;
      }
    },
    async onSubmit(event) {
      event.preventDefault();
      try {
        const completion = await this.openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(this.prompt),
          temperature: 0,
          max_tokens: 3000
        });

        const params = eval(completion.data.choices[0].text);

        console.log(params);
        this.generate(params[0].value)
      } catch (error) {
        console.error(error);
      }
    },
    inputApiKey() {},
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
