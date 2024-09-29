<template>
  <div >
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
              <div class="title" style='font-family: "楷体";color:black;font-size: 24px;'>Code Master</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visRouters" :key="item.path">
            <component :is="item.meta?.icon"> </component>{{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
			<a-col flex="100px">
			<a-space size="large" direction="vertical">
				
    <a-space size="large">
			<a-dropdown>
				<IconSun v-if="mode==1" @click="day()" style=" font-size: 20px;" />
				<IconMoon v-if="mode==0" @click="drak()" style=" font-size: 20px;color:aliceblue"/>
         <template #content>
					<a-space size="large" direction="vertical" fill>
					<a-row  @click="day()"> 
						<a-button type="text"><IconSun @click="day()" style=" font-size: 20px;" />白天模式</a-button>	
					</a-row>
				</a-space>
				<a-space size="large" direction="vertical" fill>
          <a-row  @click="drak()">
						<a-button type="text"><IconMoon style=" font-size: 20px;"/>黑夜模式</a-button>
          
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
			<a-dropdown 
			@select="handleSelect">
			<!-- 用户头像预留 -->
				<a-avatar 
				:size="48">
				<img src="https://img.pqblog.com/i/2024/07/13/215137.jpg" alt="">
				<!-- <p>已登录</p> -->
			 </a-avatar>
         <template #content>
          <a-doption @click="gotoCenter()">
						<a-button type="text">
							<icon-user style=" font-size: 20px;" />
							个人中心
						</a-button>	
					</a-doption>
          <a-doption @click="logout()">
						<a-button type="text">
							<icon-import style=" font-size: 20px;" />
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
import { routes } from "@/router/routes";
import { ref, computed } from "vue";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
import { Message } from '@arco-design/web-vue';
import accessCheck from "@/access/access_check";
import ACCESS_ENMU from "@/access/ACCESS_ENUM";
import { UserControllerService } from "../../generated";

const router = useRouter();
const route = useRoute().matched[0].children;
const store = useStore();

let selectedKeys = ref(["/"]);
const Loginuser = store.state.user?.loginUser;
const loginState=computed(()=>{
	return store.state.user?.loginUser && store.state.user.loginUser.userRole && store.state.user.loginUser.userRole !== 'notlogin';
})
console.log(Loginuser);
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
let mode=ref(1)
const drak=()=>{
mode.value=0
document.body.setAttribute('arco-theme', 'dark')

// // 恢复亮色主题
// document.body.removeAttribute('arco-theme');
}
const day=()=>{
mode.value=1
// // 恢复亮色主题
document.body.removeAttribute('arco-theme');
}
const logout=async()=>{
	console.log("正在退出")
	console.log(store.state.user.loginUser)
	let res=await UserControllerService.userLogoutUsingPost()
	if(res.code===0){
		Message.success("退出成功")
		console.log(store.state.user.loginUser)
		store.commit('user/updateUser', {}); // 更新状态为空
	}
}
// 过滤隐藏的路由
const visRouters = computed(() =>{
 return routes[1]?.children.filter((item) => {
	// 过滤隐藏路由
    if (item.meta?.hidden) {
      return false;
    }
		// 过滤权限校验
    if (!accessCheck(store.state.user?.loginUser, item.meta?.access as string)) {
      return false;
    }
    return true;
  })
});
console.log(visRouters)
// 计算属性来获取用户名
const username = computed(
  () => store.state.user?.loginUser?.userName ?? "123"
);
const login=()=>{
	router.push({
		path:'/user/login'
	})
}
// 点击事件
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
// 跳转到用户中心
const gotoCenter=()=>{
	router.push('/user/center')
}
</script>

<style>
.logo-m {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  flex-direction: row;
  justify-content: end;
}
.title-bar{
	display:flex;
}
</style>
