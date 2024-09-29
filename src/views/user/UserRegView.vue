<template>
  <div id="userRegView">
    <div class="register-container">
      <h2>用户注册</h2>
      <a-form
        layout="vertical"
        :model="form"
        @submit="handleSubmit"
        class="register-form"
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
        <a-form-item field="checkPassword" label="确认密码">
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次输入密码"
            size="large"
            allow-clear
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            class="register-button"
          >
            注册
          </a-button>
        </a-form-item>
      </a-form>
      <!-- 底部链接 -->
      <div class="bottom-text">
        已有账号？<a @click="goToLogin">请登录</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, defineEmits, defineProps, withDefaults } from 'vue';
import { UserControllerService, UserLoginRequest } from '../../../generated';
import message from '@arco-design/web-vue/es/message';
import { useRouter } from 'vue-router';

/**
 * Props 定义
 */
interface Status {
  ModelStatus?: string; // 可选的状态属性
}

// 使用 withDefaults 设置 ModelStatus 的默认值
const props = withDefaults(defineProps<Status>(), {
  ModelStatus: 'page', // 默认值为 'page'
});

/**
 * 表单信息
 */
const form = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
} as UserLoginRequest);

// 路由实例
const router = useRouter();

/**
 * Emit 事件定义
 */
const emit = defineEmits(['goToLogin']);

/**
 * 当前模式信息
 */
const ModelInfo = ref('login');

/**
 * 提交表单
 */
const handleSubmit = async () => {
  if (!isPasswordValid()) return; // 检查密码有效性

  const res = await UserControllerService.userRegisterUsingPost(form);
  handleResponse(res); // 处理响应
};

/**
 * 校验密码是否一致
 * @returns 是否有效
 */
const isPasswordValid = (): boolean => {
  if (form.userPassword !== form.checkPassword) {
    message.error('两次输入的密码不一致');
    return false;
  }
  return true;
};

/**
 * 处理响应
 * @param res API 响应
 */
const handleResponse = (res: any) => {
  if (res.code === 0) {
    message.success(res.message);
    router.push({ path: '/user/login', replace: true });
  } else {
    message.error('注册失败，' + res.message);
  }
};

/**
 * 跳转到登录页面
 */
const goToLogin = () => {
  if (props.ModelStatus !== 'card') {
    router.push('/user/login');
  }
  emit('goToLogin', ModelInfo.value); // 触发事件
};
</script>


<style scoped>
/* 优化样式 */
#userRegView {
  display: flex;
  justify-content: center;
  align-items: center;
 
  padding: 20px;
}

.register-container {
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

.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.register-button {
  width: 100%;
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
  .register-container {
    padding: 30px 20px;
  }

  h2 {
    font-size: 20px;
  }
}
</style>
