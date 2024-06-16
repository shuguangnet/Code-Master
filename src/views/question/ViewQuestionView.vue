<template>
  <div id="ViewQuestionView">
		<!-- 左侧 -->
		<a-row class="grid-demo" :gutter="[24, 12]" >
      <a-col :md="12" :xs="24">
				<a-tabs default-active-key="1">
    <a-tab-pane key="1" title="题目">
      <!-- Content of Tab Panel 1 -->
			<a-space direction="vertical" size="large" fill>
				<a-card v-if="dataList" :title="dataList.title">
					
    <a-descriptions title="系统配置" :column="{xs:1, md:3, lg:4}">
			<a-descriptions-item label="时间限制">
      {{ dataList.judgeConfig.timeLimit ?? 0 }}
     </a-descriptions-item>
			<a-descriptions-item label="空间限制" >
        {{ dataList.judgeConfig.memoryLimit ?? 0 }}
      </a-descriptions-item>
			<a-descriptions-item label="堆栈限制" >
        {{ dataList.judgeConfig.stackLimit ?? 0 }}
      </a-descriptions-item>
    </a-descriptions>
		<MdViewer :value="dataList.content || ''" :mode="mode"></MdViewer>
							<template #extra>
			<a-space wrap>
        <a-tag v-for="(tag, index) of dataList.tags" :key="index" color="green" >{{ tag }}</a-tag>
      </a-space>
		</template>
				</a-card>
  </a-space>
	
			
    </a-tab-pane>
    <a-tab-pane key="2" title="评论">
			<a-comment
    align="right"
    author="Balzac"
    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    content="这道题很不错考查了"
    datetime="1 hour"
  >
    <template #actions>
      <span class="action"> <IconMessage /> Reply </span>
    </template>
    <a-comment
      align="right"
      avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
    >
      <template #actions>
        <a-button key="0" type="secondary"> 取消 </a-button>
        <a-button key="1" type="primary"> 评论 </a-button>
      </template>
      <template #content>
        <a-input placeholder="请输入您的评论" />
      </template>
    </a-comment>
  </a-comment>
    </a-tab-pane>
     <a-tab-pane key="3">
      <template #title>答案</template>
      暂无答案
     </a-tab-pane>
    </a-tabs>
		</a-col>
     
			<!-- 右侧 -->
			<a-col :md="12" :xs="24">
				<a-space direction="vertical" size="large">
					<a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>java</a-option>
              <a-option>cpp</a-option>
              <a-option>go</a-option>
              <a-option>html</a-option>
            </a-select>
          </a-form-item>
        </a-form>
	</a-space>
        <CodeEditor :value="form.code" :handleChange="CodeChange" :style="{width:'100%'}"></CodeEditor>
				<a-space>
    <a-button type="primary" style="min-width:200px;margin-top: 15px" @click="doSubmit">提交</a-button>
    
  </a-space>
			</a-col>
      
    </a-row>
   <!-- <MdEditor :value="Mdvalue" :handle-change="OnChange"></MdEditor>
   <CodeEditor :value="Codevalue" :handleChange="InChnage"></CodeEditor> -->
  </div>
</template>

<script lang="ts" setup>
import CodeEditor from "@/components/CodeEditor";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";
import message from "@arco-design/web-vue/es/message";
import { QuestionAddRequest, QuestionControllerService,QuestionSubmitAddRequest,QuestionSubmitQueryRequest,QuestionVO } from "../../../generated";
import {useRouter} from 'vue-router';
import { onMounted,withDefaults,defineProps,ref } from "vue";

interface Props{
	id:string;
}
const mode=ref("tab")
const props = withDefaults(defineProps<Props>(), {
  id: () => ""
});
// const props=defineProps(['id'])
const form=ref<QuestionSubmitAddRequest>({
	code:"",
	language:'java'
})
const router=useRouter()
const dataList = ref<QuestionVO>();
const loadData= async ()=>{
	
	const res =await QuestionControllerService.getQuestionVoByIdUsingGet(props.id as any)
	if(res.code===0){
		dataList.value=res.data
	}
}
onMounted(()=>{
	loadData()
})
// 提交代码
const doSubmit=async ()=>{
	const res=await QuestionControllerService.doQuestionSubmitUsingPost({
		...form.value,
		questionId:props.id as any
	})
	if(res.code===0){
		message.success("提交成功")
	}else{
		message.error("提交失败"+res.message)
	}
}
const CodeChange=(value:any)=>{
  form.code=value
}
</script>
<style>
/* 隐藏github */
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child{
	display: none;
}
#ViewQuestionView{
	max-width:1400px;
	margin:10px auto !important;
	padding: 30px;
}
</style>