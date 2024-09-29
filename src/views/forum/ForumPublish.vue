<template>
  <div class="forum-publish">
    <h1>发布新帖子</h1>
    <a-form :model="form" layout="vertical" @submit="handleSubmit">
      <a-form-item
        label="标题"
        field="title"
        :rules="[{ required: true, message: '请输入帖子标题' }]"
      >
        <a-input v-model="form.title" placeholder="请输入帖子标题" />
      </a-form-item>
      
      <a-form-item
        label="内容"
        field="content"
        :rules="[{ required: true, message: '请输入帖子内容' }]"
      >
        <a-textarea
          v-model="form.content"
          placeholder="请输入帖子内容"
          rows="4"
        />
      </a-form-item>

      <a-button type="primary" html-type="submit">发布</a-button>
    </a-form>
    
    <a-message v-if="message" :type="messageType" :content="message" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';

const form = ref({
  title: '',
  content: ''
});

const message = ref('');
const messageType = ref('info'); // 'info' | 'success' | 'error'

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  // 简单验证示例
  if (!form.value.title || !form.value.content) {
    message.value = '请填写所有必填项';
    messageType.value = 'error';
    return;
  }

  // 这里可以添加 API 调用
  try {
    // 假设这是一个异步操作，比如调用 API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // 提交成功
    message.value = '帖子发布成功！';
    messageType.value = 'success';
    
    // 重置表单
    form.value.title = '';
    form.value.content = '';
  } catch (error) {
    message.value = '发布帖子失败，请稍后重试';
    messageType.value = 'error';
  }
};
</script>

<style scoped>
.forum-publish {
  padding: 20px;
  background-color: #f0f2f5; /* 背景颜色 */
  border-radius: 8px; /* 圆角 */
}

h1 {
  margin-bottom: 20px; /* 标题与表单间距 */
}
</style>
