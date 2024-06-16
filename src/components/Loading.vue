<!-- Loading.vue -->
<template>
  <div v-if="loading" class="loading-overlay">
    <!-- Customize loading animation here -->
    <div class="loading-spinner"></div>
  </div>
</template>

<script setup>
import { defineProps, withDefaults } from 'vue';

const props = defineProps(['show'])
// const props = defineProps({
//   show: Boolean // 接收父组件传递的 show 属性
// });

console.log("Loading",props)
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
