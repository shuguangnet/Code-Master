<template>
  <div>
    {{ value }}	
    <Children :value="value" :handle-change="handleChange"></Children>
  </div>
</template>

<script setup lang="ts">
import Children from "@/components/ChildExample";
import { ref } from 'vue';

let value = ref(""); // 使用 ref() 创建响应式变量

function handleChange(v: string) {
  value.value = v; // 更新 value 的值
} 
</script>
