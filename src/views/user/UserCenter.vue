<template>
<div id="UserCenter">
	
	<div class="info center"  style="display: flex;justify-content: center;align-items: center;flex-direction: row;">
		<a-menu
      :style="{ width: '200px',  }"
      :default-open-keys="['0','1','2']"
      :default-selected-keys="['0_2']"
      show-collapse-button
      breakpoint="xl"
      @collapse="onCollapse"
    >
      <a-sub-menu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>我的资料</template>
        <a-menu-item key="0_0">修改资料</a-menu-item>
        <a-menu-item key="0_1">修改密码</a-menu-item>
       
      </a-sub-menu>
      <a-sub-menu key="1">
        <template #icon><icon-bug></icon-bug></template>
        <template #title>我的论坛</template>
        <a-menu-item key="1_0">我的发帖</a-menu-item>
        <a-menu-item key="1_1">我的评论</a-menu-item>
       
      </a-sub-menu>
      <a-sub-menu key="2">
        <template #icon><icon-bulb></icon-bulb></template>
        <template #title>我的题库</template>
        <a-menu-item key="2_0">做题记录</a-menu-item>
      </a-sub-menu>
    </a-menu>
    <a-card hoverable :style="{ width: '50vw' }" class="aboutCard">
      <div class="content center" >
       <UserInfo/>
      </div>
    </a-card>
  </div>
</div>
</template>
<script lang="ts" setup>
import UserInfo from "@/components/User/UserInfo.vue"
</script>


<style scoped>
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
:deep(.vch__container .vch__legend) {
  display: none;
}
</style>