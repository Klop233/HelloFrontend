<template>
  <button @click=getLoli>随机色图</button>
  <br>
  <h1 id="content"></h1>
</template>

<script>
import axios from 'axios'

export default {
  name: "index",
  methods: {
    getLoli() {
      axios.get('https://api.mcloc.cn/words').then(function(res) {
        console.log("Fetch data -> ", res)
        document.getElementById("content").innerHTML = res.data
      })
    }
  }
}
</script>