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
    </div>
    <component
      :is="compName"
      :initTableData="helloTableParams.tableData"
      :tableHeader="helloTableParams.tableHeader"
      :canEdit="helloTableParams.canEdit"
      :canDelete="helloTableParams.canDelete"
    />
  </div>
</template>

<script>
import HelloTable from "./components/HelloTable.vue";

export default {
  name: "app",
  components: {
    HelloTable,
  },
  data() {
    return {
      historyInput: [],
      currentInput: "",
      compDSL: "",
      compName: "",
      helloTableParams: {},
    };
  },
  methods: {
    generate() {
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
        this.helloTableParams = dsl.params;
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
