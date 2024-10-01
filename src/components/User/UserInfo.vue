<template>
  <div class="info" style="align-items: center;">
    <div class="avatar" style="display: flex; justify-content: center; flex-direction: column; align-items: center; width: 50%;">
      <a-avatar :size="100" id="userAvatar" @click="triggerFileInput"> 
        <img v-if="form.userAvatar"  alt="avatar" :src="form.userAvatar"  class="avatar-image"/>
        <IconUser v-else />
        <template #trigger-icon>
          <IconEdit />
        </template>
      </a-avatar>
      <!-- 隐藏的文件输入框 -->
      <input type="file" @change="getfile" ref="fileInput" style="display: none;" />
    </div>

    <a-space direction="vertical" size="large" :style="{ width: '600px' }">
      <a-form :model="form" layout="vertical">
        <a-form-item field="userName" label="昵称">
          <a-input v-model="form.userName" placeholder="昵称（必填项）" />
        </a-form-item>
        <a-form-item field="email" label="邮箱">
          <a-input v-model="form.email" placeholder="邮箱" />
        </a-form-item>
        <a-form-item field="phone" label="电话">
          <a-input v-model="form.phone" placeholder="电话" />
        </a-form-item>
        <a-form-item field="userProfile" label="个人介绍">
          <a-textarea
            v-model="form.userProfile"
            placeholder="关于你的个性、兴趣或者经验"
            :max-length="{ length: 100, errorOnly: true }"
            allow-clear
            show-word-limit
          />
        </a-form-item>
        <a-button type="primary" class="save" @click="saveInfo">保存</a-button>
      </a-form>
    </a-space>
  </div>
</template>

<script setup>
import { IconUser, IconEdit } from "@arco-design/web-vue/es/icon";
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { UserControllerService } from "../../../generated";
import { useRouter } from "vue-router";
import axios from 'axios';

const store = useStore();
const router = useRouter();
const fileInput=ref(null)
// 获取用户信息
const loginUser = computed(() => store.state.user.loginUser);
const selectedFile = ref(null);
const form = ref({
  userName: loginUser.value.userName,
  userProfile: loginUser.value.userProfile,
  userAvatar: loginUser.value.userAvatar,
  email: loginUser.value.email,
  phone: loginUser.value.phone
});

// 保存用户信息
const saveInfo = async () => {
  const uploadSuccess = await uploadFile();
  if (!uploadSuccess) return; // 如果上传失败，停止执行保存

  const res = await UserControllerService.updateMyUserUsingPost(form.value);
  if (res.code === 0) {
    Message.success("修改个人信息成功");
    await store.dispatch("user/getLoginUser");
  } else {
    Message.error("修改个人信息失败: " + res.message);
  }
};

// 触发文件输入框
const triggerFileInput = () => {
	console.log(fileInput.value)
	fileInput.value.click()
  // const fileInput = document.querySelector('input[type="file"]');
  // fileInput.click(); // 触发点击事件，打开文件选择对话框
};

// 获取文件
const getfile = async (event) => {
  const files = event.target.files;
  selectedFile.value = files[0]; // 选择第一个文件
  if (files.length > 0) {
    console.log('选择的文件:', selectedFile.value);
    await uploadFile(); // 上传文件
  } else {
    console.log('没有选择文件');
  }
};

// 上传图片
const uploadFile = async () => {
  if (!selectedFile.value) {
    alert('请先选择一个文件');
    return false; // 上传未成功
  }
  
  const formData = new FormData();
  formData.append('image', selectedFile.value); // 将文件添加到 FormData
  formData.append('token', 123); // 将 token 添加到 FormData（可以替换为实际的 token）

  try {
    const response = await axios.post('http://222.186.56.232:40061/api/index.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 设置内容类型
      },
    });
    form.value.userAvatar = response.data.url; // 更新头像 URL
    console.log('文件上传成功:', response.data.url);
    return true; // 上传成功
  } catch (error) {
    console.error('文件上传失败:', error.response ? error.response.data : error.message);
    return false; // 上传未成功
  }
};
</script>

<style scoped>
.avatar-image {
  width: 100%;
  border-radius: 50%;
}
#userAvatar {
  position: relative;
}
</style>
