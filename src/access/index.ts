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
