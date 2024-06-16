<!-- Children.vue -->
<template>
	{{ value }}
  <input type="text" :value="value" @input="handleChange">
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

const props = defineProps({
  value: String,
  handleChange: Function
});

// 如果子组件需要一个响应式的内部变量来处理输入，可以这样：
const internalValue = ref(props.value);

function handleChange(event: Event) {
  const newValue = (event.target as HTMLInputElement).value;
  internalValue.value = newValue; // 更新内部值

  // 将更新后的值传递给父组件的 handleChange 函数
  props.handleChange(newValue);
}
</script>
