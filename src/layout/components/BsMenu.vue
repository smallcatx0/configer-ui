<template>
  <el-menu
  :collapse="isCollapse"
  class="menu"
  >
  <template v-for="item in authMenu">
    <el-menu-item v-if="! item.children" :index="item.path" :key="item.paht">
      <el-icon><span class="iconfont" :class="item.icon" /></el-icon>
      <template #title>{{item.label}}</template>
    </el-menu-item>
    <el-sub-menu  v-else :index="item.name">
      <template #title>
        <el-icon><span class="iconfont" :class="item.icon" /></el-icon>
        <span>{{item.label}}</span>
      </template>
      <el-menu-item v-for="asub in item.children" :index="asub.path">
        <el-icon v-if="asub.icon"><span class="iconfont" :class="asub.icon" /></el-icon>
        <template #title>{{asub.label}}</template>
      </el-menu-item>
    </el-sub-menu>
  </template>
  </el-menu>
</template>

<script setup>
import { reactive, ref } from 'vue';
// TODO: 透射出去
const isCollapse = ref(false)

const authMenu = reactive([
  {
    label: "用户管理",
    name: "user",
    path: "/user",
    icon: "adm-xiazai-wenjianxiazai-02 ico-btu"
  },
  {
    label: "其他",
    name: "orther",
    icon: "adm-xiazai-wenjianxiazai-02 ico-btu",
    children: [
      {
        label: "页面1",
        name: "page1",
        path: "/page1"
      },
      {
        label: "页面2",
        name: "page2",
        path: "/page2"
      }
    ]
  }
])

</script>
<style lang="scss" scoped>
.menu:not(.el-menu--collapse){
  width: 240px;
}
.menu{
  min-height: 100%;
}
</style>
