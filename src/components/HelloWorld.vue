<template>
  <div class="container">
    <el-button type="success" @click="fetchData">Random words</el-button>
  </div>
  <br>
  <p id="content" class="text">d</p>

</template>

<script>
import axios from 'axios'
import ElementPlus from "element-plus";

export default {
  name: "index",
  methods: {
    fetchData() {
      axios.get('https://api.mcloc.cn/words').then(function(res) {
        console.log("Fetch data -> ", res)
        document.getElementById("content").innerHTML = res.data
      })
    }
  }
}
</script>

<style>
.button {
  margin: 0 auto;
}

.text {
  text-align: center;
}

.container {
  display: flex;
  justify-content: center;
}

</style>
