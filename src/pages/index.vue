<template>
  <div>
    <h1>后台首页</h1>
    <el-button @click="out">退出</el-button>
  </div>
</template>

<script setup>
import {test} from "~/api/user"
const out = () => {
  test().then(res =>{
    console.log(res)
  })
}
</script>