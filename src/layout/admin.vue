<template>
  <el-container class="main">
      <el-header ><bs-header/></el-header>
      <el-container>
        <el-aside style="width: auto;"><bs-menu/></el-aside>
        <el-main>
          <bs-tags></bs-tags>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import BsHeader from './components/BsHeader.vue'
import BsMenu from './components/BsMenu.vue'
import BsTags from './components/BsTags.vue'

</script>

<style scoped>
.main{
  background-color: #f3f4f5;
  min-height: 100vh;
}
</style>
