<!-- <template>
  <div class="app">
		<template v-if="route.path.includes('/user')">
			<router-view></router-view>
		</template>
		<template v-else>
			<BasicLayout></BasicLayout>
		</template> -->
		<template>
  <div class="app">
	
	<Loading :loading="loading" />
			<router-view></router-view>
		</div>
		</template>  
  

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
import ACCESS_ENMU from "./access/ACCESS_ENMU";
import UserLayout from "./layouts/UserLayout.vue";
import { onMounted } from "vue";


const router = useRouter();
const route = useRoute();
const store = useStore();
import { ref } from 'vue';
import Loading from './components/Loading.vue';

const loading = ref(false);

// 使用 provide 让所有组件都可以访问 loading 状态
// provide('loading', loading);
const donInit=()=>{
	console.log("全局项目入口")
}
onMounted(()=>donInit())
</script>
<style></style>
