<template>
	<div id="UpdateQuestionView" style="margin: 50px;">
		<h2>更新题目</h2>
		    
    <a-form-item field="title" tooltip="题目标题" label="标题">
      <a-input v-model="form.title"  placeholder="请输入题目标题" />
    </a-form-item>
    <a-form-item field="content" label="题目标签">
      <a-input-tag
        :default-value=form.tags
        
        placeholder="请输入题目标签"
        allow-clear
      />
    </a-form-item>
		<a-form :model="form"  style="flex-direction: column;" label-align="left" > 
			<a-form-item field="content" label="题目内容">
      <MdEditor :value="form.content" :handle-change="contentChange"></MdEditor>
    </a-form-item>
    <a-form-item field="answer" tooltip="请输入题目答案" label="答案">
      <MdEditor :value="form.answer" :handle-change="answerChange"></MdEditor>
    </a-form-item>

		<a-form-item label="题目配置">
			<a-space direction="vertical" style="min-width: 480px">
		<a-form-item field="title"  label="内存限制">
			<a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="1000" :min="1" mode="button" class="input-demo" label="内存限制"  v-model="form.judgeConfig.memoryLimit"/>
    </a-form-item>
		<a-form-item field="title"  label="堆栈限制">
			<a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="1000" :min="1" mode="button" class="input-demo" label="堆栈限制"  v-model="form.judgeConfig.stackLimit"/>
    </a-form-item>
		<a-form-item field="title" label="时间限制">
			<a-input-number :style="{width:'320px'}" placeholder="Please Enter" :default-value="1000" :min="1" mode="button" class="input-demo" label="时间限制"  v-model="form.judgeConfig.timeLimit"/>
    </a-form-item>
		</a-space>
	</a-form-item>
		<a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入测试输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judgeCase[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入测试输出用例"
              />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)">
              删除
            </a-button>
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="handleAdd" type="outline" status="success"
            >新增测试用例
          </a-button>
        </div>
      </a-form-item>

		<!-- <a-form-item v-for="(judgeCaseItem,index) of form.judgeCase" :field="`posts[${index}].value`" :label="`输出用例-${index}`" :key="index">
      <a-input v-model="judgeCaseItem.output" placeholder="请输入输出用例" />
      
      <a-button @click="handleDelete(index)" :style="{marginLeft:'10px'}">Delete</a-button>
    </a-form-item> -->
		
    <a-form-item>
      <a-button type="primary" style="min-width: 200px;" @click="doSumbit">提交</a-button>
    </a-form-item>
  </a-form>
	</div>
  
</template>
<script lang="ts" setup>
import {ref,onMounted} from 'vue'
import MdEditor from '@/components/MdEditor.vue';
import { formProps } from 'ant-design-vue/es/form';
import message from "@arco-design/web-vue/es/message";
import { QuestionControllerService } from '../../../generated';
import { useRoute } from 'vue-router';
const route=useRoute()
 const form = ref({
	"answer":"暴力破解",
	"content":"题目内容",
	"judgeCase":[
		{
			"input":"1 2",
			"output":"3 4"
		}
	],
	"judgeConfig":{
		"memoryLimit":1000,
		"stackLimit":1000,
		"timeLimit":1000
	},
	"tags":[
		"栈","简单"
	],
	"title":"A+B"
    });
// 获取数据
const loadData=async () =>{
	let id=route.query.id;
	console.log(id)
	let res= await QuestionControllerService.getQuestionByIdUsingGet(id as any)
	if(res.code===0){
		console.log(res)
		// res.data.records
		form.value=res.data as any
		if(!res.data.judgeCase){
			form.value.judgeCase=[{
				"input":"",
				"output":""
			}]
		}else{
		form.value.judgeCase=	JSON.parse(form.value.judgeCase as any)
		}
		if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
	}else{
		message.error("加载失败")
	}
}
// 获取数据
onMounted(()=>{
	loadData()
})
   // 新增判题配置
		const handleAdd = () => {
      if(form.value.judgeCase){
				form.value.judgeCase.push({
        input: '',
				output: ''
      })
			}
    };
		// 删除判题配置
    const handleDelete = (index:number) => {
      if(form.value.judgeCase){
				form.value.judgeCase.splice(index, 1)
			}
    }
		const doSumbit= async ()=>{
    let res=await QuestionControllerService.updateQuestionUsingPost(form.value)
		if(res.code===0){
			message.success("更新成功")
		}else{
			message.success("更新失败"+res.message)
		}
		}
		const answerChange=(v:string)=>{
      form.value.answer=v
		}
		const contentChange=(v:string)=>{
      form.value.content=v
		}
</script>
<style></style>
