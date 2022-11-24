<template>
  <div>
    <h1>后台首页</h1>
    <el-button @click="out">退出</el-button>
    <el-button @click="info">show info</el-button>
  </div>
</template>

<script setup>
// import {test} from "~/api/user"
import {GetUserInfo} from '~/utils/auth'
// const out = () => {
//   test().then(res =>{
//     console.log(res)
//   })
// }
const info = () =>{
  console.log(GetUserInfo())
}
</script>