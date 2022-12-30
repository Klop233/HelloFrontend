<template>
  <el-container>
    <el-header>
      <el-row :gutter="24">
        <el-col :span="20"><el-input v-model="key" placeholder="输入一个键以查询值" /></el-col>
        <el-col :span="4"><el-button el-button type="primary" @click="fetchData" :loading=$data.loading>查询</el-button></el-col>

      </el-row>
    </el-header>
    <el-main>
      <el-col :span="4"><el-button el-button type="primary" @click="showAllData" :loading=$data.loading>显示所有数据</el-button></el-col>
      <p id="response"></p>
    </el-main>
  </el-container>

</template>

<script>
import axios from 'axios'

export default {
  name: "index",
  methods: {
    fetchData() {
      this.loading = true

      axios.get('https://backend.lolicon.fit/get', {
        params: {
          key: this.key
        }
      }).then(res => {
        console.log('Fetch data -> ', res.data)
        if (res.data.code === 404) {
          this.$messageBox({
            type: 'error',
            message: "查询失败，没有这个键"
          })
        } else {
          this.$messageBox({
            type: 'success',
            message: '查询成功，数据: ' + res.data.data
          })
        }
      })
      this.loading = false
    },
    showAllData() {
      axios.get('https://backend.lolicon.fit/getAll').then((res) => {
        console.log('Fetch data -> ', res.data)
        this.$messageBox({
          type: 'success',
          message: '查询成功，数据: ' + res.data.data
        })
      })
    }
  },
  data() {
    return {
      loading: false,
      key: "",
    }
  }
}
</script>

<style>

</style>