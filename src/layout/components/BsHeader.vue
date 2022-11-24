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
      <el-tooltip effect="dark" placement="bottom"
        content="刷新" >
        <span class="iconfont adm-shuaxin ico-btu" @click="f5" />
      </el-tooltip>
    </div>
    <div>
      <el-tooltip effect="dark" placement="bottom"
        content="下载中心" >
        <span class="iconfont adm-xiazai-wenjianxiazai-02 ico-btu" />
      </el-tooltip>
      <el-tooltip effect="dark" placement="bottom"
        content="全屏" >
        <span class="iconfont ico-btu"
          @click="toggle"
          :class="isFullscreen ? 'adm-quxiaoquanping_o' : 'adm-quanping'" />
      </el-tooltip>
      <el-dropdown>
        <span class="user">
          <el-avatar :size="40" class="avater" :src="avatarSrc" />
          <span>smallcat</span>
          <span class="iconfont adm-xiala" style="position:relative; left: 3px; top: 3px;" ></span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item >个人中心</el-dropdown-item>
            <el-dropdown-item @click="openModPass = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div style="width: 20px;"></div>
    </div>
  </div>
  <!-- 修改密码弹窗 -->
  <el-drawer
    v-model="openModPass"
    :with-header="false"
    direction="rtl"
    :close-on-click-modal="false"
  >
  <div class="text-xl mb-4 w-full text-center">修改密码</div>
  <el-form label-width="80px" class="modpass-form" ref="modpassRef" :model="modpassForm" :rules="modpassRules">
    <el-form-item label="">
    <el-radio-group v-model="modpassForm.modBy">
      <el-radio-button label="pass">旧密码</el-radio-button>
      <el-radio-button label="phone">手机号</el-radio-button>
      <el-radio-button label="email">邮箱</el-radio-button>
    </el-radio-group>
    </el-form-item>
    <el-form-item v-if="modpassForm.modBy=='pass'" label="旧密码" prop="password">
      <el-input v-model="modpassForm.password" type="password" show-password  placeholder="请输入旧密码" />
    </el-form-item>
    <el-form-item v-if="modpassForm.modBy=='phone'" label="手机号" prop="phone">
      <el-input v-model="modpassForm.phone" placeholder="请输入手机号"/>
    </el-form-item>
    <el-form-item v-if="modpassForm.modBy=='email'" label="邮箱" prop="email">
      <el-input v-model="modpassForm.email" placeholder="请输入邮箱"/>
    </el-form-item>
    <el-form-item v-if="modpassForm.modBy!='pass'" label="验证码" prop="code">
      <el-row :gutter="10">
        <el-col :lg="14" :md="12">
          <el-input v-model="modpassForm.code"  placeholder="请输入邮箱"/>
        </el-col>
        <el-col :lg="8" :md="12">
          <el-button type="primary"
            :disabled="sendCodeCost != 0"
            @click="modpassSendCode(modpassForm.modBy)">
            {{sendCodeCost == 0? '发送验证码': `重新发送(${sendCodeCost})`}}
          </el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input v-model="modpassForm.newPassword" type="password" show-password placeholder="请输入新密码" />
    </el-form-item>
    <el-form-item label="确认密码" prop="rePassword">
      <el-input v-model="modpassForm.rePassword" type="password" show-password placeholder="请确认密码" />
    </el-form-item>
    <div class="flex flex-row-reverse">
      <el-button type="primary" @click="handleModPass(modpassRef)" :loading="modpassLoading" >提交</el-button>
      <div style="width: 10px;"></div>
      <el-button @click="modpassClear">重置</el-button>
      <div style="width: 10px;"></div>
      <el-button @click="openModPass = false">取消</el-button>
    </div>
  </el-form>
  </el-drawer>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessageBox,ElNotification } from 'element-plus'
import {logout, modPass} from '~/api/user'
import {RemoveUserInfo, delToken } from '~/utils/auth'
import { useFullscreen } from '@vueuse/core';
import { useRouter } from 'vue-router'

const router = useRouter()
const {toggle, isFullscreen} = useFullscreen()

const MenuOpen = ref(false)
const logoSrc = "https://iph.href.lu/40x40?text=40&fg=3d85c6&bg=eeeeee"
const avatarSrc = "https://iph.href.lu/40x40?text=40&fg=3d85c6&bg=eeeeee"

// 刷新页面
const f5 = () => location.reload()
// 退出登录功能
const handleLogout = () => {
  ElMessageBox.confirm(
    '现在就要退出吗?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(()=>{
      // 调用后台 退出登录
      logout()
      // 清除本地用户信息
      RemoveUserInfo()
      // 清除token
      delToken()
      // 跳转到登录页
      router.push({path:"/login"})
    })
}

// 修改密码功能
const openModPass = ref(false)
const modpassRef = ref(null)
const modpassLoading = ref(false)
const modpassForm = reactive({
  modBy: "phone",
  password: "",
  phone: "",
  email: "",
  code: "",
  newPassword: "",
  rePassword: "",
})
const modpassRules = reactive({
  password: [
    { required: true, message: '旧密码不能为空', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '手机号不能为空', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '验证码不能为空', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '新密码不能为空', trigger: 'blur' },
    { validator: (rule, value, callback)=>{
      if (value == modpassForm.password) {
        callback(new Error('新旧密码不能相同'))
        return
      }
      callback()
    }, trigger: 'blur'}

  ],
  rePassword: [
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value != modpassForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
          return
        }
        callback()
      }, trigger: 'blur'
    }
  ],
})

const sendCodeCost = ref(0)
const modpassSendCode = (modBy) =>{
  // 发送验证码
  // 按钮disable倒计时 60s
  sendCodeCost.value = 60
  let ds = setInterval(()=>{
    sendCodeCost.value --
    if (sendCodeCost.value <= 0) {
      sendCodeCost.value = 0
      clearInterval(ds)
    }
  }, 1000)
}

const handleModPass = (valid) => {
  if (!valid) return
  valid.validate((ok,fields)=>{
    if(!ok){
      console.log("参数验证失败", fields)
      return
    }
    modpassLoading.value = true
    // 不同类型操作传不同参数
    let reqBody = {
      type: modpassForm.modBy,
      pass:  modpassForm.newPassword
    }
    switch (modpassForm.modBy) {
      case "pass":
        reqBody.old_pass = modpassForm.password
        break
      case "phone":
        reqBody.phone = modpassForm.phone
        reqBody.code = modpassForm.code
        break
      case "email":
        reqBody.code = modpassForm.code
        reqBody.email = modpassForm.email
        break
      default:
        ElNotification({
          title: "依据,参数错误",
          type: 'warning',
        })
        return
    }
    modPass(reqBody).then(res => {
      let {errcode,msg} = res
      if (errcode != 0) {
        ElNotification({
          title: msg,
          type: 'error',
        })
        return
      }
      ElNotification({
        title: "操作成功",
        type: 'success',
      })
      openModPass.value = false
    }).finally(()=>{
      modpassLoading.value = false
    })
  })
}

const modpassClear = () =>{
  modpassForm.password = ''
  modpassForm.phone = ''
  modpassForm.email = ''
  modpassForm.code = ''
  modpassForm.newPassword = ''
  modpassForm.rePassword = ''
}

</script>
<style lang="scss" scoped>
.bs-header {
  height: 60px;
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
    height: 60px;
    cursor: pointer;
  }

  .ico-btu:hover {
    @apply bg-blue-400;
  }
  .user {
    height: 60px;
    @apply flex justify-center items-center;
    @apply text-base text-light-100;
    .avater{
      @apply ml-2 mr-2;
    }
  }
}

</style>
