<template>
  <el-container>
      <el-header><bs-header/></el-header>
      <el-container>
        <el-aside width="250px"><bs-menu/></el-aside>
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
</style>
