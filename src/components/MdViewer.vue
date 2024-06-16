<template>
  <div>
    <!-- 使用Editor组件，传入value和plugins属性，并绑定change事件 -->
    <Viewer 
      :value="value" 
      :plugins="plugins" 
			:mode="mode" 
      @change="handleChange">
    </Viewer>
  </div>
</template>

<script setup lang="ts">
// 引入必要的插件和组件
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Viewer } from "@bytemd/vue-next";
import { ref, withDefaults, defineProps } from 'vue';

// 自定义组件属性类型定义
interface props {
  value: string,
	mode?: string,
  handleChange: (v: any) => void
}

// 初始化插件数组
const plugins = [
  gfm(),        // GFM插件，支持GitHub风格的Markdown语法
  highlight()   // 代码高亮插件
];

// 定义默认属性和方法
const props = withDefaults(defineProps<props>(), {
  value: () => '',  // 默认值为空字符串
	mode:()=>'auto',
  handleChange: (v: any) => {
    console.log(v);  // 默认的handleChange方法，打印传入的值
  }
});
</script>

<style>
/* 可以在此处添加组件相关的样式 */
/* 隐藏github */
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child{
	display: none;
}
</style>
