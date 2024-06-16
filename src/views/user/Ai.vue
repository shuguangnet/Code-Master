<template>
  <div id="userCenterView">
		<iframe 
src="http://222.186.56.232:8080/ui/chat/d426bcd786c34993"
style="width: 100%; height: 80vh;" 
frameborder="0" 
allow="microphone">
</iframe>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { useRouter } from "vue-router";
import { Message } from '@arco-design/web-vue';

setTimeout(()=>{
	Message.success("tips:代码助手需要联网请保持网络畅通")
},1000)
</script>
