<template>
  <div class="container">
    <el-input v-model="key" placeholder="输入一个键以查询值" />
    <el-button type="success" @click="fetchData" :loading=$data.loading>查询</el-button>
  </div>
  <h2>获取到的数据: <p id="response"></p></h2>
  <br>
</template>

<script>
import axios from 'axios'

export default {
  name: "index",
  methods: {
    fetchData() {
      this.loading = true

      axios.get('http://127.0.0.1:5000/get', {
        params: {
          key: this.key
        }
      }).then(function (res) {
        console.log("Fetch data -> ", res.data)
        if (res.data.code === 404) {
          document.getElementById("response").innerHTML = "未查询到数据"
        } else {
          document.getElementById("response").innerHTML = res.data.data
        }
      })
      this.loading = false
    },
  },
  data() {
    return {
      loading: false,
      key: ""
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
  margin-left: 10px;
  margin-right: 10px;
}

</style>
