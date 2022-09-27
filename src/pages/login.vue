<template>
  <el-row class="login-c">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <h1>配置中心</h1>
        <div class="desc">xxx企业中后台管理系统-配置中心</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2>欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form label-width="80px" class="form-c" 
        ref="formRef"
        :model="form"
        :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <span class="iconfont adm-B1"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码">
            <template #prefix>
              <span class="iconfont adm-B"></span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button round type="primary" @click="login(formRef)" :loading="loading" class="login-btn">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive,ref } from 'vue'
import {loginByPwd, userInfo} from '~/api/user'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { setToken } from '~/utils/auth'

const router = useRouter()

const form = reactive({
  username: "kui",
  password: "123123",
})

const formRef = ref(null)
const loading = ref(false)
const rules = reactive({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ],
})

const login = (valid) => {
  if (!valid) return
  valid.validate((ok, fields)=>{
    if(!ok) {
      console.log("参数验证失败", fields)
      return
    }
    loading.value = true
    // 请求后端登录
    loginByPwd({
      user: form.username,
      pass: form.password,
    }).then(res =>{
      ElNotification({
        title: "登录成功",
        type: 'success',
      })
      // 存token以及用户基础信息
      setToken(res.data.auth)
      userInfo().then(info => {
        console.log(info)
      })
      // 跳转首页
      router.push("/")
    }).finally(()=>{
      loading.value = false
    })
  })
}

</script>

<style lang="scss" scoped>
.login-c {
  @apply min-h-screen;

  .left {
    @apply bg-blue-500 flex items-center justify-center;

    h1 {
      @apply font-bold text-5xl text-light-50 mb-4;
    }

    .desc {
      @apply text-gray-200 text-sm;
    }
  }

  .right {
    @apply bg-light-100 flex items-center justify-center flex-col;

    h2 {
      @apply font-bold text-4xl text-gray-800;
    }

    >div {
      @apply "flex items-center justify-center my-5 text-gray-300 space-x-2";

      .line {
        @apply h-[1px] w-16 bg-gray-200;
      }
    }

    .form-c {
      @apply w-[260px];
    }

    .login-btn {
      @apply w-[260px];
    }
  }

}
</style>