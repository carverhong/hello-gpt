<template>
  <div id="app">
    <div id="input-area">
      <p v-for="(item, idx) in historyInput" :key="idx">
        {{ item }}
      </p>
      <el-input v-model="currentInput" placeholder="请输入prompt">
        <template slot="append">
          <el-button @click="generate">生成</el-button>
        </template>
      </el-input>
    </div>
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld,
  },
  data() {
    return {
      historyInput: [],
      currentInput: ''
    }
  },
  methods: {
    generate() {
      // TODO: 调用AI接口生成
      this.historyInput.push(this.currentInput);
      this.currentInput = '';
    }
  }
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
