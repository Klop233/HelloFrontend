<template>
  <el-space wrap style="margin: 0 auto" class="center">
    <!-- 查询  -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="18"><el-input v-model="query_key" placeholder="输入一个键以查询值" /></el-col>
        <el-col :span="2"><el-button el-button type="primary" @click="getData" :loading=this.query.loading>查询</el-button></el-col>
      </el-row>
      <el-button el-button type="primary" @click="showAllData" :loading=this.query_all.loading style="margin-top: 8px">显示所有数据</el-button>
    </el-card>

    <!-- 插入 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="18"><el-input v-model=this.set.key placeholder="键" /></el-col>
        <el-col :span="18"><el-input v-model=this.set.value placeholder="值" style="margin-top: 6px"/></el-col>
        <el-col :span="2"><el-button el-button type="primary" @click="setData" style="margin-top: 6px" :loading="this.set.loading">设置</el-button></el-col>
      </el-row>
    </el-card>

    <!-- 删除 -->
    <el-card class="box-card">
      <el-row :gutter="24">
        <el-col :span="18"><el-input v-model=this.del.key placeholder="输入一个键以删除值" /></el-col>
        <el-col :span="2"><el-button el-button type="primary" @click="delData" :loading=this.del.loading>删除</el-button></el-col>
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
    getData() {
      this.query.loading = true

      axios.get('get', {
        params: {
          key: this.query.key
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

        this.query.loading = false
        this.query.key = ''
      })
    },

    async showAllData() {
      this.query_all.loading = true

      axios.get('getAll').then((res) => {
        console.log('Fetch data -> ', res.data)
        this.$messageBox({
          type: 'success',
          message: '查询成功，数据: ' + res.data.data
        })
        this.query_all.loading = false
      }).catch(error => {
        console.log(error.data)
      })
    },

    setData() {
      if (this.set.key === "" || this.set.value === "") {
        this.$messageBox({
          type: 'error',
          message: '键或值不能为空'
        })
        return;
      }

      if (this.set.key.length > 100 || this.set.value.length > 100) {
        this.$messageBox({
          type: 'error',
          message: '你输入的数据太tm长了'
        })
        return;
      }

      this.set.loading = true
      axios.post('set',{
        "key": this.set.key,
        "value": this.set.value
      }).then(() => {
        this.$messageBox({
          type: 'success',
          message: '设置键值对成功'
        })
        this.set.loading = false
        this.set.key = ''
        this.set.value = ''
      })
    },

    delData() {
      if (this.del.key === "") {
        this.$messageBox({
          type: 'error',
          message: '键不能为空'
        })
        return;
      }

      this.del.loading = true
      axios.post('del', {
        "key": this.del.key
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
        this.del.loading = false
        this.del.key = ''
      })
    }

  },
  data() {
    return {
      query: {
        loading: false,
        key: ''
      },
      set: {
        loading: false,
        key: '',
        value: ''
      },
      del: {
        loading: false,
        key: ''
      },
      query_all: {
        loading: false,
      }
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
  font-family: 'Title', Arial,serif;
  font-size: 18px;
}
</style>