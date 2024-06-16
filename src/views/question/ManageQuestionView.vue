<template>
  <div id="ManageQuestionView">
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
		<template #createTime="{record}">
			{{ moment(record?.createTime).format("YYYY-MM-DD") }}
		</template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button type="primary" status="danger" @click="doDelete(record)"
            >删除</a-button
          >
        </a-space>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import moment from 'moment';

const show = ref(true);
const dataList = ref([]);
/* 查询参数 */
let searchParams = ref({
  pageSize: 2,
  current: 1,
});
const router = useRouter();
/* 默认总数 */
const total = ref(0);
/**
 * 加载数据的函数，通过 searchParams 发起请求
 */
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
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

const doUpdate = (record: any) => {
  router.push({
    path: "/update/question",
    query: { id: record.id },
  });
};
const doDelete = async (record: any) => {
  let res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败" + res.message);
  }
};
const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "提交数",
    dataIndex: "thumbNum",
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "用户id",
    dataIndex: "userId",
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
}
</style>
