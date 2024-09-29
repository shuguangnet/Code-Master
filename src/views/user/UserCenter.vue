<template>
  <div id="UserCenter" class="user-center">
    <div class="info">
      <a-menu
        :style="{ width: '220px' }"
        :default-open-keys="['0', '1', '2']"
        :default-selected-keys="['0_0']"
        show-collapse-button
        breakpoint="xl"
        @collapse="onCollapse"
      >
        <a-sub-menu key="0">
          <template #icon><icon-apps></icon-apps></template>
          <template #title>我的资料</template>
          <a-menu-item key="0_0" @click="ChangeStatus(1)">修改资料</a-menu-item>
          <a-menu-item key="0_1" @click="ChangeStatus(2)">修改密码</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="1">
          <template #icon><icon-bug></icon-bug></template>
          <template #title>我的论坛</template>
          <a-menu-item key="1_0" @click="ChangeStatus(3)">我的发帖</a-menu-item>
          <a-menu-item key="1_1" @click="ChangeStatus(4)">我的评论</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="2">
          <template #icon><icon-bulb></icon-bulb></template>
          <template #title>我的题库</template>
          <a-menu-item key="2_0" @click="gotoQuestion">做题记录</a-menu-item>
        </a-sub-menu>
      </a-menu>
      <a-card hoverable :style="{ width: '60vw' }" class="aboutCard">
        <div class="content">
          <UserInfo v-if="dashStatus==1"/>
					<UserChangePwd v-else-if="dashStatus==2"/>
					<UserPost v-else-if="dashStatus==3"/>
					<UserReview v-else-if="dashStatus==4"/>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter,useRoute } from "vue-router";
import UserInfo from "@/components/User/UserInfo.vue";
import UserChangePwd from '@/components/User/UserChangePwd.vue';
import UserReview from '@/components/User/UserReview.vue';
import UserPost from '@/components/User/UserPost.vue';
const dashStatus=ref(1)
const router=useRouter()
const ChangeStatus=(v:number)=>{
	dashStatus.value=v
}
const gotoQuestion=()=>{
	router.push("/history/question/")
}
</script>

<style scoped>
.user-center {
  padding: 20px; /* 增加整体的内边距 */
 
	display: flex;
  justify-content: center;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 垂直对齐 */
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 100%;
  flex-direction: column;
}

.arco-avatar {
  width: 80px;
  height: 80px;
  margin-bottom: 10px;
}

.arco-card-size-medium {
  font-size: 8px;
}

.save {
  align-self: flex-end;
}

.aboutCard {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* 加强阴影效果 */
  border-radius: 12px; /* 圆角效果 */
  transition: box-shadow 0.3s; /* 动画过渡效果 */
}

.aboutCard:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2); /* 鼠标悬停时的阴影效果 */
}

/* 菜单样式 */
.a-menu {
  background-color: #ffffff; /* 菜单背景 */
  border-radius: 8px; /* 菜单圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 菜单阴影 */
}

.a-menu-item:hover {
  background-color: #e6f7ff; /* 菜单项悬停效果 */
}
</style>
