<template>
  <div class="info" style="align-items: center;">
    <a-space direction="vertical" size="large" :style="{ width: '600px' }">
      <a-form :model="form" layout="vertical">
        <a-form-item field="oldPassword" label="旧密码">
          <a-input-password
            v-model="form.oldPassword"
            placeholder="请输入旧密码"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="newPassword" label="新密码">
          <a-input-password
            v-model="form.newPassword"
            placeholder="请输入新密码"
            allow-clear
          />
        </a-form-item>
        <a-form-item field="confirmPassword" label="确认新密码">
          <a-input-password
            v-model="form.confirmPassword"
            placeholder="请再次输入新密码"
            allow-clear
          />
        </a-form-item>
        <a-button type="primary" class="save" @click="savePassword">
          保存
        </a-button>
      </a-form>
    </a-space>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { UserControllerService } from '../../../generated';
import { useRouter } from 'vue-router';

// 定义密码修改表单
const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// 保存密码修改
const savePassword = async () => {
  // 检查新密码和确认密码是否一致
  if (form.value.newPassword !== form.value.confirmPassword) {
    Message.error('新密码和确认密码不一致');
    return;
  }

  const res = await UserControllerService.updatePasswordUsingPost(form.value);
  if (res.code === 0) {
    Message.success('密码修改成功');
    // 跳转到其他页面或执行其他操作
  } else {
    Message.error('密码修改失败: ' + res.message);
  }
};
</script>

<style scoped>
.info {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 使其占满父元素的高度 */
  /* background-color: #f0f2f5; 设置背景色 */
  padding: 20px; /* 内边距 */
}

.save {
  margin-top: 20px; /* 按钮与表单的间距 */
}
</style>
