import { createApp } from "vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import "@arco-design/web-vue/dist/arco.css";
import '@/assets/style.css'
import '@/access'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import "bytemd/dist/index.css";
// import axios from '@/request/axios.ts'; // 确保路径正确
const app = createApp(App);
app.use(ArcoVue);
app.use(router);
app.use(store);
app.use(ArcoVueIcon);
app.mount("#app");
