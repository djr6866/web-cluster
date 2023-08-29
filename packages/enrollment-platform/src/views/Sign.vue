<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { admin } from '../api/admin'
import { Loadlist } from '../api/loadlist'
import { search } from "../api/search"
import { Search } from '@element-plus/icons-vue'
//报名人数信息
const load = async () => {
  let data = (await admin()).data.data
  tableData.value = data
  total.value = data.length
}
//根据关键字查找
const searchkey = ref<string>("")
const getkey = async (searchkey: string) => {
  let data = (await search(searchkey)).data.data
  tableData.value = data
}
//加载页面时，组件挂载完成后执行
onMounted(async () => {
  await load()
})

const tableData = ref<any[]>([])
const total = ref(100)

const currentChange = (value: number) => {
  console.log(value)
}

const loadlist = async () => {
  let response = (await Loadlist())
  let data = response.data
  if (!data) {
    return
  }
  const contentDisposition = response.headers['Content-Disposition'] // 从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  const result = patt.exec(contentDisposition)
  console.log(result);
  console.log(response);
  let url = window.URL.createObjectURL(new Blob([data]))
  let a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', 'excel.xlsx')
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(a.href)
  document.body.removeChild(a)
}
</script>
<template>
  <div class="container">
    <div class="buttonFixed">
      <div>
        <el-button @click="loadlist()" type="primary">下载表格</el-button>
      </div>
      <div style="padding-left: 10px;">
        <el-button @click="load()" type="primary">刷新表格</el-button>
      </div>
      <div style="padding-left: 20px;">
        <el-input v-model="searchkey" :rows="2" type="text" placeholder="输入关键词" />
      </div>
      <div style="padding-left: 10px;">
        <el-button @click="getkey(searchkey)" :disabled="searchkey === ''" type="primary" :icon="Search">查找</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed type="selection" width="80" />
        <el-table-column fixed label="Order" width="80">
          <template #default="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="image" label="Image" align="center" width="180">
          <template #default="scope">
            <div class="block text-center">
              <el-carousel height="70px" :autoplay="false" indicator-position="outside">
                <el-carousel-item v-for="(val, index) in scope.row.image" :key="index">
                  <el-image style="width: 70px; height: 70px" :src="val" alt=""></el-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="college" label="College" width="180" />
        <el-table-column prop="id" label="Id" width="180" />
        <el-table-column label="Volunteer" width="180">
          <template #default="scope">
            <div v-for="(val, index) in scope.row.volunteer" :key="index">
              <div>{{ val + '\n' }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="gender" label="Gender" width="180" />
        <el-table-column prop="major" label="Major" width="180" />
        <el-table-column prop="introduction" label="Introduction" width="180">
          <template #default="scope">
            <el-tooltip :content="scope.row.introduction" raw-content placement="top-start" v-if="scope.row.introduction">
              <span v-if="scope.row.introduction && scope.row.introduction.length <= 10">
                {{ scope.row.introduction }}
              </span>
              <span v-if="scope.row.introduction && scope.row.introduction.length > 10">
                {{ scope.row.introduction.substr(0, 10) + '...' }}
              </span>
            </el-tooltip>
            <span v-else-if="scope.row.introduction == null"> NA </span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="Name" />
      </el-table>
    </div>
    <el-pagination background layout="prev,pager,next" :total="total" @current-change="currentChange"
      class="pagination-center"></el-pagination>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
}

.table {
  margin: 10px 0;
}

.input-with-select {
  width: 380px;
  margin-right: 20px;
}

.pagination-center {
  margin-top: 10px;
  justify-content: center;
  align-items: center;
}

:deep(table tr span.el-tooltip__trigger) {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.buttonFixed {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>
