<template>
  <div id="userLoginView">
    <!-- 添加阴影和圆角使其更具卡片效果 -->
    <div class="login-container">
      <h2>用户登录</h2>
      <a-form
        layout="vertical"
        :model="form"
        @submit="handleSubmit"
        class="login-form"
      >
        <a-form-item field="userAccount" label="账号">
          <a-input
            v-model="form.userAccount"
            placeholder="请输入账号"
            size="large"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="userPassword" label="密码">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
            size="large"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <!-- 提供更大的点击区域，调整按钮大小 -->
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            class="login-button"
          >
            登录
          </a-button>
        </a-form-item>
      </a-form>
      <!-- 底部链接 -->
      <div class="bottom-text">没有账号？<a @click="goToReg">请注册</a></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, defineEmits, ref, defineProps, withDefaults } from 'vue';
import { UserControllerService, UserLoginRequest } from '../../../generated';
import message from '@arco-design/web-vue/es/message';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

/**
 * 表单信息
 */
const form = reactive({
  userAccount: '',
  userPassword: '',
} as UserLoginRequest);

// 初始化路由和状态管理
const router = useRouter();
const store = useStore();

// 记录用户模式（登录或注册）
const userModelInfo = ref('user');

// 定义自定义事件
const emit = defineEmits(['goToReg']);

// 定义 props 并设置默认值
const props = withDefaults(
  defineProps<{
    ModelStatus?: string;
  }>(),
  {
    ModelStatus: 'page',
  }
);

// 输出接收到的 ModelStatus 以进行调试
console.log('接收到的 ModelStatus:', props.ModelStatus);

/**
 * 跳转到注册页面
 */
const goToReg = () => {
  userModelInfo.value = 'reg';
  emit('goToReg', userModelInfo.value); // 发送事件到父组件
  
  // 判断 ModelStatus，决定是否跳转
  if (props.ModelStatus !== 'card') {
    router.push('/user/reg'); // 执行跳转
  }
};

/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch('user/getLoginUser');
    router.push({ path: '/question', replace: true });
  } else {
    message.error('登录失败，' + res.message); // 登录失败的提示
  }
};
</script>


<style scoped>
/* 样式优化 */
#userLoginView {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
}

.login-container {
  background: #fff;
  padding: 40px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  animation: fadeIn 0.5s ease;
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #0052d9;
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
/* 底部文本样式 */
.bottom-text {
  text-align: center;
  margin-top: 16px;
}

.bottom-text a {
  color: #0052d9;
  cursor: pointer;
}
.login-button {
  width: 100%;
}

/* 动画效果 */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式优化 */
@media (max-width: 600px) {
  .login-container {
    padding: 30px 20px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
