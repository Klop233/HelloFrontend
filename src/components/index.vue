<template>
  <el-space wrap style="margin: 0 auto" class="center">
    <!-- 查询  -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="18"><el-input v-model="query_key" placeholder="输入一个键以查询值" /></el-col>
        <el-col :span="2"><el-button el-button type="primary" @click="fetchData">查询</el-button></el-col>
      </el-row>
      <el-button el-button type="primary" @click="showAllData" :loading=$data.loading style="margin-top: 8px">显示所有数据</el-button>
    </el-card>

    <!-- 插入 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="18"><el-input v-model="set_key" placeholder="键" /></el-col>
        <el-col :span="18"><el-input v-model="set_value" placeholder="值" style="margin-top: 6px"/></el-col>
        <el-col :span="2"><el-button el-button type="primary" @click="setData" style="margin-top: 6px">设置</el-button></el-col>
      </el-row>
    </el-card>

    <!-- 删除 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="18"><el-input v-model="del_key" placeholder="输入一个键以删除值" /></el-col>
        <el-col :span="2"><el-button el-button type="primary" @click="delData">删除</el-button></el-col>
      </el-row>
    </el-card>
  </el-space>

  <!-- footer -->
<!--  <div class="footer">-->
<!--    <p style="color:black" class="center">© Copyright | Klop233 All Rights reserved 2022 - 2023 | Vue learning project</p>-->
<!--  </div>-->
</template>

<script>
import axios from 'axios'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://backend.lolicon.fit/'

export default {
  name: "index",
  methods: {
    fetchData() {
      this.loading = true

      axios.get('get', {
        params: {
          key: this.query_key
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
      }).catch(error => {

      })
      this.loading = false
    },

    showAllData() {
      axios.get('getAll').then((res) => {
        console.log('Fetch data -> ', res.data)
        this.$messageBox({
          type: 'success',
          message: '查询成功，数据: ' + res.data.data
        })
      }).catch(error => {
        console.log(error.data)
      })
    },
    setData() {
      if (this.set_key === "" || this.set_value === "") {
        this.$messageBox({
          type: 'error',
          message: '键或值不能为空'
        })
        return;
      }

      if (this.set_key.length > 100 || this.set_value > 100) {
        this.$messageBox({
          type: 'error',
          message: '你输入的数据太tm长了'
        })
        return;
      }

      axios.post('set',{
        "key": this.set_key,
        "value": this.set_value
      }).then(() => {
        this.$messageBox({
          type: 'success',
          message: '设置键值对成功'
        })
      })
    },

    delData() {
      if (this.del_key === "") {
        this.$messageBox({
          type: 'error',
          message: '键不能为空'
        })
        return;
      }

      axios.post('del', {
        "key": this.del_key
      }).then((res) => {
        if (res.data.code === "404") {
          this.$messageBox({
            type: 'error',
            message: '键不存在'
          })
        } else {
          this.$messageBox({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    }

  },
  data() {
    return {
      loading: false,
      query_key: "",
      set_key: "",
      set_value: "",
      del_key: ""
    }
  }
}
</script>

<style>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.box-card {
  width: 8rem;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  /*background-color: rgb(25,202,173);*/
  background: linear-gradient(to bottom right, rgb(25,202,173), rgb(190,237,109));
  /*z-index: 9999;*/
  font-family: 'Title', Arial;
  font-size: 18px;
}
</style>