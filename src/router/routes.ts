import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ACCESS_ENMU from "@/access/ACCESS_ENUM";
import { IconList, IconCommand, IconBook,IconComputer,IconUserGroup,IconRobotAdd,IconPaste,IconTrophy} from "@arco-design/web-vue/es/icon";
export const routes: Array<RouteRecordRaw> = [
	{
    path:'/user',
		name:"用户页面",
		component: ()=>import("../layouts/UserLayout.vue"),
		children:[
			{
				path: "/user/login",
				name: "用户登录",
				component: () => import("../views/user/UserLoginView.vue"),
			},
			{
				path: "/user/reg",
				name: "用户注册",
				component: () => import("../views/user/UserRegView.vue"),
			},
		]
	},
  {
		path:'/',
		name:"主页面",
		component: ()=>import("../layouts/BasicLayout.vue"),
		children:[
			{
				path: "/",
				name: "主页",
				component: () => import("../views/HomeView.vue"),
				meta:{
					icon:IconList
				}
			},
			{
				path: "/admin",
				name: "管理员可见",
				component: () => import("../views/AdminView.vue"),
				meta: {
					hidden: true,
					access: ACCESS_ENMU.ADMIN,
				},
			},
			{
				path: "/example",
				name: "实例",
				component: () => import("../views/ExampleView.vue"),
				meta: {
					hidden: true,
					access: ACCESS_ENMU.NOT_LOGIN,
				},
			},
			{
				path: "/add/question",
				name: "创建题目",
				component: () => import("../views/question/AddQuestionView.vue"),
				meta: {
					hidden: false,
					access: ACCESS_ENMU.USER,
				},
			},
			{
				path: "/manage/question",
				name: "管理题目",
				component: () => import("../views/question/ManageQuestionView.vue"),
				meta: {
					hidden: false,
					access: ACCESS_ENMU.ADMIN,
					
				},
			},{
				path: "/ai",
				name: "代码助手",
				component: () => import("../views/user/Ai.vue"),
				meta: {
					hidden: false,
					access: ACCESS_ENMU.NOT_LOGIN,
					icon:IconCommand
				},
			},
			{
				path: "/update/question",
				name: "更新题目",
				component: () => import("../views/question/UpdateQuestionView.vue"),
				meta: {
					hidden: true,
					access: ACCESS_ENMU.ADMIN,
				},
			},
			{
				path: "/question",
				name: "题目列表",
				component: () => import("../views/question/QuestionView.vue"),
				meta: {
					hidden: false,
					access: ACCESS_ENMU.NOT_LOGIN,
					icon:IconBook
				},
			},{
				path: "/view/question/:id",
				name: "在线做题",
				props:true,
				component: () => import("../views/question/ViewQuestionView.vue"),
				meta: {
					hidden: true,
					access: ACCESS_ENMU.USER,
				},
			},{
				path: "/history/question/",
				name: "做题记录",
				component: () => import("../views/question/SubmitQuestion.vue"),
				meta: {
					hidden: false,
					access: ACCESS_ENMU.NOT_LOGIN,
					icon:IconComputer
				},
			},{
				path: "/history/question/",
				name: "交流论坛",
				component: () => import("../views/question/SubmitQuestion.vue"),
				meta: {
					hidden: false,
					access: ACCESS_ENMU.NOT_LOGIN,
					meta:IconUserGroup
				},
			},
			{
				path: "/noauth",
				name: "无权限",
				component: () => import("../views/NoAuth.vue"),
				meta: {
					hidden: true,
				},
			},{
				path: "/about",
				name: "关于我们",
				component: () => import("../views/AboutView.vue"),
				meta:{
					icon:IconTrophy
				}
			},{
				path: "/user/center",
				name: "用户中心",
				component: () => import("../views/user/UserCenter.vue"),
				meta:{
					hidden: true,
				}
			},
		]
	}
];
