<template>
  <div class="userInfo default-main">
    <el-card shadow="hover">
      <el-table :data="obj.tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column label="地址">
          <template #default="scope">
            <el-input v-model="scope.row.address" type="text"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
          <el-button @click="onAction(scope.row.id)"  type="primary">
                <Icon name="el-icon-Edit" color="var(--ba-bg-color-overlay)"/>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import {useRouter} from 'vue-router'
const router = useRouter()
const obj = reactive({
  tableData:[
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id:1,
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id:2,
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id:3,
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    id:4,
  },
]
})
const onAction = (id:number) => {
  router.push({path:'/admin/edit/userInfo/detail',query:{id}})
}
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'user/userInfo',
})
</script>
<style lang="scss" scoped>
.userInfo {
  // padding: 20px;
}
</style>