<template>
 <div class="info">
					<div class="avatar" style="display: flex;justify-content: center;">
          <a-avatar id="userAvatar" @click="onClcik" :style="{ backgroundColor: '#0A65CC' }">
            <img v-if="form.userAvatar" class="avatar-image" alt="avatar" :src="form.userAvatar" />
            <IconUser v-else />
            <template #trigger-icon>
              <IconEdit/>
            </template>
          </a-avatar>
        </div>
          <a-space
            direction="vertical"
            size="large"
            :style="{ width: '600px' }"
          >
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
              <a-button type="primary" class="save" @click="saveInfo"
                >保存</a-button
              >
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
const store = useStore();
const router = useRouter();

// 获取相关信息
const loginUser = computed(() => store.state.user.loginUser);
//console.log(loginUser);

const form = ref({
  userName: loginUser.value.userName,
  userProfile: loginUser.value.userProfile,
  userAvatar: loginUser.value.userAvatar,
  email: loginUser.value.email,
  phone: loginUser.value.phone
});
// 上传头像功能
// const file = ref();

// const onChange = (_, currentFile) => {
//   file.value = {
//     ...currentFile,
//     url: URL.createObjectURL(currentFile.file),
//   };
// };
// const onProgress = (currentFile) => {
//   file.value = currentFile;
// };
const saveInfo = async () => {
  //console.log(form.value);
  const res = await UserControllerService.updateMyUserUsingPost(form.value);
  if (res.code === 0) {
    Message.success("修改个人信息成功");
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/about",
      replace: true,
    });
  } else {
    Message.error("修改个人信息失败" + res.message);
  }
};
const onClcik = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = 'https://api.multiavatar.com/';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * 52));
  }
  alert(result)
  form.userAvatar= result
};
</script>