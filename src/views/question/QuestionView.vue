<template>
  <div id="ManageQuestionView">
		<Loading :show="loadstatus">111</Loading>
		<a-form :model="form">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item field="title" label="题目名称" label-col-flex="100px">
          <a-input v-model="searchParams.title" placeholder="请输入题目" />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item field="tags" label="题目标签" label-col-flex="80px">
          <a-input v-model="searchParams.tags" placeholder="请输入标签" />
        </a-form-item>
      </a-col>
      <a-space>
          <a-button type="primary" @click="doSubmit" >搜索</a-button>
        </a-space>
    </a-row>
    
  </a-form>
    <a-table
      :columns="columns"
      :data="dataList"
      :align="center"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total: total,
      }"
			style="margin:20px"
      @page-change="onPageChange"
    >
		<template #tags="{record}">
			<a-space wrap>
        <a-tag v-for="(tag, index) of record.tags" :key="index" color="green" >{{ tag }}</a-tag>
      </a-space>
		</template>
		<template #accept="{record}">
			{{
          `${
            record.submitNum ? record.acceptedNum / record.submitNum : "0"
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
		</template>
		<template #createTime="{record}">
			{{ moment(record?.createTime).format("YYYY-MM-DD") }}
		</template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestionPage(record)">做题</a-button>
          
          
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
// 引入加载组件
import Loading from "@/components/Loading.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter,useRoute } from "vue-router";
import moment from 'moment';

const loading=ref("测试")
const loadstatus = ref(1);
const dataList = ref([]);
/* 查询参数 */
let searchParams = ref({
	title:"",
	tags:[],
  pageSize: 10,
  current: 1,
});
const router = useRouter();
const route=useRoute()
/* 默认总数 */
const total = ref(0);
/**
 * 加载数据的函数，通过 searchParams 发起请求
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code == 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error(`加载失败` + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});
/* 默认请求数据 */
onMounted(() => {
  loadData();
});
/* 改变页面的方法 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  // searchParams.value.current=page;
  // loadData()
};
/* 搜索提交
 */
const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
		tags:[...searchParams.value.tags],
    current: 1,
  };
};
// 做题
const toQuestionPage=(record:any)=>{
router.push({
	path:`/view/question/${record.id}`,
})
}
const columns = [
  {
    title: "编号",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  
  {
    title: "标签",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "accept",
  },
  
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];
</script>
<style scoped>
#ManageQuestionView {
	max-width: 1400px;
	margin:auto;
}
</style>
