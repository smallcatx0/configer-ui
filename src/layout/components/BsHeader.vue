<template>
  <div class="bs-header">
    <div>
      <div class="logo">
        <el-image :src="logoSrc" fit="cover" />
        <h1>系统配置中心</h1>
      </div>
      <span class="iconfont ico-btu" 
        @click="MenuOpen =! MenuOpen" 
        :class="MenuOpen ? 'adm-zhedie2' : 'adm-zhedie1'" />
      <span class="iconfont adm-shuaxin ico-btu"></span>
    </div>
    <div>
      <span class="iconfont adm-xiazai-wenjianxiazai-02 ico-btu"></span>
      <span class="iconfont ico-btu"
        @click="IsFullScreen = !IsFullScreen"
        :class="IsFullScreen ? 'adm-quxiaoquanping_o' : 'adm-quanping'"
      />
      <el-dropdown>
        <span class="user">
          <el-avatar :size="40" class="avater" :src="avatarSrc" />
          <span>smallcat</span>
          <span class="iconfont adm-xiala"></span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div style="width: 20px;"></div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const MenuOpen = ref(false)
const IsFullScreen = ref(false)
const logoSrc = "https://iph.href.lu/40x40?text=40&fg=3d85c6&bg=eeeeee"
const avatarSrc = "https://iph.href.lu/40x40?text=40&fg=3d85c6&bg=eeeeee"

</script>
<style lang="scss" scoped>
.bs-header {
  height: 64px;
  @apply flex fixed items-center justify-between;
  @apply bg-blue-500 text-light-50;
  @apply top-0 left-0 right-0;

  >div {
    @apply flex justify-center items-center text-xl;
  }

  .logo {
    width: 250px;
    @apply flex justify-center items-center;
    @apply text-2xl;

    h1 {
      @apply pl-2;
    }
  }

  .ico-btu {
    @apply flex justify-center items-center text-xl;
    width: 50px;
    height: 64px;
    cursor: pointer;
  }

  .ico-btu:hover {
    @apply bg-blue-400;
  }
  .user {
    @apply flex justify-center items-center;
    height: 64px;
    @apply text-base text-light-100;
    .avater{
      @apply ml-2 mr-2;
    }
  }
}

</style>
