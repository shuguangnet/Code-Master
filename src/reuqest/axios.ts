// // src/axios.js
// import axios from 'axios';
// import { inject } from 'vue';

// const loading = inject('loading');

// const instance = axios.create({
//   baseURL: 'http://127.0.0.1:8101',
//   timeout: 10000,
// });

// instance.interceptors.request.use(
//   (config) => {
//     loading.value = true;
//     return config;
//   },
//   (error) => {
//     loading.value = false;
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     loading.value = false;
//     return response;
//   },
//   (error) => {
//     loading.value = false;
//     return Promise.reject(error);
//   }
// );

// export default instance;
