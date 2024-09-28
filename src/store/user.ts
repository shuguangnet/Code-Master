// initial state
import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/ACCESS_ENUM";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录"
    },
		loading: false,
  }),
	getters: {
    isLoading: (state) => state.loading,
  },
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
		showLoading({ commit }) {
      commit('setLoading', true);
    },
    hideLoading({ commit }) {
      commit('setLoading', false);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
		setLoading(state, value: boolean) {
      state.loading = value;
    },
  },
} as StoreOptions<any>;
