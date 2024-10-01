<template>
  <div style="background-color: var(--background-color); color: var(--text-color);">
    <a-row id="globalHeader" align="center" :wrap="false">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo-m" src="../assets/logo.png" style="height: 35px" />
              <div class="title" style='font-family: "楷体"; color: black; font-size: 24px;'>Code Master</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visRouters" :key="item.path">
            <component :is="item.meta?.icon"></component>{{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <a-space size="large" direction="vertical">
          <a-space size="large">
            <a-dropdown>
              <!-- 切换主题的图标 -->
              <IconSun v-if="mode == 1" @click="day()" style="font-size: 20px;" />
              <IconMoon v-if="mode == 0" @click="drak()" style="font-size: 20px; color: aliceblue" />
              <template #content>
                <a-space size="large" direction="vertical" fill>
                  <a-row @click="day()">
                    <a-button type="text"><IconSun style="font-size: 20px;" />白天模式</a-button>
                  </a-row>
                </a-space>
                <a-space size="large" direction="vertical" fill>
                  <a-row @click="drak()">
                    <a-button type="text"><IconMoon style="font-size: 20px;" />黑夜模式</a-button>
                  </a-row>
                </a-space>
              </template>
            </a-dropdown>
          </a-space>
        </a-space>
      </a-col>
      <a-col flex="100px">
        <template v-if="loginState">
          <a-space size="large" direction="vertical">
            <a-space size="large">
              <a-dropdown @select="handleSelect">
                <!-- 用户头像 -->
                <a-avatar :size="48">
                  <img :src="store.state.user?.loginUser.userAvatar" alt="" />
                </a-avatar>
                <template #content>
                  <a-doption @click="gotoCenter()">
                    <a-button type="text">
                      <icon-user style="font-size: 20px;" />
                      个人中心
                    </a-button>
                  </a-doption>
                  <a-doption @click="logout()">
                    <a-button type="text">
                      <icon-import style="font-size: 20px;" />
                      退出登录
                    </a-button>
                  </a-doption>
                </template>
              </a-dropdown>
            </a-space>
          </a-space>
        </template>
        <template v-else>
          <a-space size="large" direction="vertical">
            <a-space size="large">
              <a-button type="primary" @click="login()">登陆</a-button>
            </a-space>
          </a-space>
        </template>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes"; // 路由配置
import { ref, computed } from "vue"; // Vue 3 组合式 API
import { useRouter, useRoute } from "vue-router"; // Vue Router
import { useStore } from "vuex"; // Vuex 状态管理
import { Message } from '@arco-design/web-vue'; // 消息提示组件
import accessCheck from "@/access/access_check"; // 权限检查
import ACCESS_ENMU from "@/access/ACCESS_ENUM"; // 权限枚举
import { UserControllerService } from "../../generated"; // 用户服务

const store = useStore(); // Vuex 存储实例
const router = useRouter(); // 路由实例
const route = useRoute().matched[0].children; // 获取当前路由的子路由

let selectedKeys = ref(["/"]); // 选中的菜单项
const loginState = computed(() => {
  return store.state.user?.loginUser && store.state.user.loginUser.userRole && store.state.user.loginUser.userRole !== 'notlogin';
}); // 计算属性，判断用户是否登录
const visRouters = computed(() => {
  return routes[1]?.children.filter((item) => {
    // 过滤隐藏的路由和权限校验
    if (item.meta?.hidden) return false;
    if (!accessCheck(store.state.user?.loginUser, item.meta?.access as string)) return false;
    return true;
  });
}); // 计算可见路由

// 主题模式，1: 白天模式，0: 暗黑模式
const mode = ref(1);

// 切换到暗黑模式
const drak = () => {
  mode.value = 0;
  document.body.setAttribute('arco-theme', 'dark');
  document.body.classList.add('dark-theme'); // 添加暗色主题类
};

// 切换到白天模式
const day = () => {
  mode.value = 1;
  document.body.classList.remove('dark-theme'); // 移除暗色主题类
  document.body.removeAttribute('arco-theme');
};

// 退出登录
const logout = async () => {
  console.log("正在退出");
  let res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    Message.success("退出成功");
    store.commit('user/updateUser', {}); // 更新状态为空
  }
};

// 计算属性来获取用户名
const username = computed(() => store.state.user?.loginUser?.userName ?? "123");

// 路由点击事件
const doMenuClick = (key: string) => {
  router.push({ path: key });
};

// 跳转到用户中心
const gotoCenter = () => {
  router.push('/user/center');
};

// 路由变化后更新选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

// 登录功能
const login = () => {
  router.push({ path: '/user/login' });
};
</script>

<style>
.logo-m {
  display: flex;
  align-items: center;
}
.title-bar {
  display: flex;
}
</style>
