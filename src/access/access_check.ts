import ACCESS_ENUM from "./ACCESS_ENUM";

/**
 * 路由检验
 *
 * @param {Object} userLogin - 当前登录的用户信息
 * @param {string} userLogin.userRole - 用户角色
 * @param {string} accessCheck - 需要检查的权限
 * @return {boolean} - 返回是否有权限访问
 */
const accessCheck = (
  userLogin: { userRole: string },
  needCheck: string
): boolean => {
  const userRole = userLogin?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果不需要登录权限即可访问
  if (needCheck === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  // 如果需要用户权限
  if (needCheck === ACCESS_ENUM.USER) {
    if (userRole === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }

  // 如果需要管理员权限
  if (needCheck === ACCESS_ENUM.ADMIN) {
    if (userRole !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }

  return true;
};

export default accessCheck;
