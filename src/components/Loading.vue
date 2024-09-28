<!-- Loading.vue -->
<template>
  <div v-if="loading" class="loading-overlay">
    <a-spin tip="加载中，请等待..." />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// 从父组件传递的显示 `loading` 的 `props`
const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
