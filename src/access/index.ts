import router from "@/router";
import store from "@/store";
import ACCESS_ENMU from "./ACCESS_ENUM";
import accessCheck from "./access_check";

router.beforeEach(async (to, from, next) => {
	console.log("登录用户信息",store.state.user.loginUser)
  
  let loginUser = store.state.user.loginUser;
	// 如果用户没有登录，则自动登录
  if (!loginUser || !loginUser?.userRole) {
		// 加await是为了等用户登录成功后再执行后续代码
    let res=await store.dispatch("user/getLoginUser");
		console.log("测试",res)
		loginUser = store.state.user.loginUser;
  }
  // 获取当前页面所需要得权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENMU.NOT_LOGIN;
  // 要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENMU.NOT_LOGIN) {
    // 如果用户没有登录，跳转到登录页面
    if (
			 !loginUser.userRole||
			 !loginUser||
			loginUser.userRole===ACCESS_ENMU.NOT_LOGIN
		) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登录了但是权限不足
  }
  if (!accessCheck(loginUser, needAccess)) {
    next("/noauth");
    return;
  }
  next();
});
// import router from "@/router";
// import store from "@/store";
// import ACCESS_ENUM from "@/access/ACCESS_ENUM";
// import checkAccess from "@/access/access_check";

// router.beforeEach(async (to, from, next) => {
//   console.log("登陆用户信息", store.state.user.loginUser);
//   let loginUser = store.state.user.loginUser;
//   // 如果之前没登陆过，自动登录
//   if (!loginUser || !loginUser.userRole) {
//     // 加 await 是为了等用户登录成功之后，再执行后续的代码
//     await store.dispatch("user/getLoginUser");
//     loginUser = store.state.user.loginUser;
//   }
//   const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
//   // 要跳转的页面必须要登陆
//   if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
//     // 如果没登陆，跳转到登录页面
//     if (
// //      !loginUser ||
// //      !loginUser.userRole ||
//       loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
//     ) {
//       next(`/user/login?redirect=${to.fullPath}`);
//       return;
//     }
//     // 如果已经登陆了，但是权限不足，那么跳转到无权限页面
//     if (!checkAccess(loginUser, needAccess)) {
//       next("/noAuth");
//       return;
//     }
//   }
//   next();
// });
