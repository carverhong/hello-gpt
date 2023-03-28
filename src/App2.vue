<template>
  <div id="app">
    <div id="input-area">
      <p v-for="(item, idx) in historyPrompt" :key="idx">
        {{ item }}
      </p>
      <el-input v-model="prompt" placeholder="请输入prompt">
        <template slot="append">
          <el-button @click="onSubmit" v-loading.fullscreen.lock="loading"
            >生成组件</el-button
          >
        </template>
      </el-input>
    </div>
    <component
      :is="compName"
      :initTableData="helloTableParams.data"
      :tableHeader="helloTableParams.columns"
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
import { defaultMsg } from "./utils/datasource";
import { convertOperationsToJSON } from "./utils/parseUtil";
import axios from "axios";

export default {
  name: "app",
  components: {
    HelloTable,
  },
  data() {
    return {
      historyPrompt: [],
      prompt: "",
      apiKey: "",
      apiKeyDialogShow: true,
      compDSL: "",
      compName: "",
      helloTableParams: {},
      sessionId: "",
      loading: false,
      message: [],
    };
  },
  mounted() {
    this.message = this.message.concat(defaultMsg);
  },
  methods: {
    /** 初始化 */
    initOpenAI() {
      if (this.apiKey) {
        axios.post("/initOpenAI", { apiKey: this.apiKey }).then((res) => {
          if (res.data.status === 0) {
            this.apiKeyDialogShow = false;
            this.sessionId = res.data.sessionId;
          }
        });
      }
    },

    /** 生成组件 */
    async onSubmit(event) {
      event.preventDefault();
      this.loading = true;
      this.message.push({
        content: this.prompt + "，默认按照上一个示例来生成JSON数据",
        role: "user",
      });

      const res = await axios.post("/createChatCompletion", {
        sessionId: this.sessionId,
        messages: this.message,
      });
      if (res.data.status === 0) {
        console.log(res.data.completion.choices[0].message.content);
        const params = convertOperationsToJSON(
          res.data.completion.choices[0].message.content
        );
        console.log("params:", params);
        this.generate(params[0].value);
        this.loading = false;
      } else {
        console.log(res.err);
        this.loading = false;
      }
    },

    /** 渲染组件 */
    generate(params) {
      this.historyPrompt.push(this.prompt);
      this.prompt = "";
      this.compName = "HelloTable";
      this.helloTableParams = params.params;
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
