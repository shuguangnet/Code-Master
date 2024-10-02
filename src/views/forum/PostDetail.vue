<template>
  <div class="post-detail-container">
    <!-- 返回按钮 -->
    <div class="back-button" @click="goBack">
      <a-button type="text" icon="arrow-left">返回</a-button>
    </div>

    <!-- 帖子内容区域 -->
    <section class="post-content">
      <h2 class="post-title">{{ postDetail.title }}</h2>
      <div class="post-info">
        <a-avatar :src="postDetail.user?.userAvatar" size="small" />
        <span class="author-name">{{ postDetail.user?.userName }}</span>
        <span class="post-date">{{ formatDate(postDetail.createTime) }}</span>
      </div>
			 <MdViewer :value="postDetail.content || ''" :mode="mode"></MdViewer>
    </section>

    <!-- 评论区域 -->
    <section class="comments-section">
      <h3>评论区</h3>
      <a-list :data="comments" :bordered="false" class="comment-list">
        <template #item="{ item }">
          <a-list-item>
            <a-list-item-meta
              :title="item.userName"
              :description="formatDate(item.createTime)"
            >
              <template #avatar>
                <a-avatar :src="item.userAvatar" />
              </template>
            </a-list-item-meta>
            <div>{{ item.content }}</div>
          </a-list-item>
        </template>
      </a-list>

      <!-- 发布评论 -->
      <div class="add-comment">
        <a-textarea
          v-model="newComment"
          placeholder="输入您的评论..."
          :auto-size="{ minRows: 2, maxRows: 4 }"
        />
        <a-button type="primary" @click="submitComment">发布评论</a-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PostControllerService } from '../../../generated'; // 假设你有这个服务文件
import MdViewer from '@/components/MdViewer.vue';
const router = useRouter();
const route = useRoute();

// 获取帖子ID
const postId = route.params.id;
console.log(postId);
// 存储帖子详情
const postDetail = reactive({
  title: '',
  content: '',
  user: {},
  createTime: '',
  thumbNum: 0,
  favourNum: 0,
});

// 存储评论列表
const comments = ref([]);

// 存储新评论内容
const newComment = ref('');

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString();
};

// 获取帖子详情
const fetchPostDetail = async () => {
  try {
    const res = await PostControllerService.getPostVoByIdUsingGet(postId); // 假设有这样一个接口
    if (res.code === 0) {
      Object.assign(postDetail, res.data);
    }
  } catch (error) {
    console.error('获取帖子详情失败:', error);
  }
};

// 获取评论
const fetchComments = async () => {
  try {
    const res = await PostControllerService.getCommentsByPostId({ postId }); // 假设有这样的接口
    if (res.code === 0) {
      comments.value = res.data;
    }
  } catch (error) {
    console.error('获取评论失败:', error);
  }
};

// 提交评论
const submitComment = async () => {
  if (!newComment.value.trim()) {
    alert('请填写评论内容');
    return;
  }

  try {
    const res = await PostControllerService.addCommentUsingPost({
      postId,
      content: newComment.value,
    });
    if (res.code === 0) {
      alert('评论发布成功');
      newComment.value = ''; // 清空输入框
      fetchComments(); // 重新获取评论
    } else {
      alert('评论发布失败: ' + res.message);
    }
  } catch (error) {
    console.error('评论发布失败:', error);
  }
};

// 初始化
onMounted(() => {
  fetchPostDetail();
  fetchComments();
});

// 返回上一页
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.post-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-secondary-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.back-button {
  margin-bottom: 10px;
}

.post-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.post-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary-color);
  margin-bottom: 20px;
}

.post-body {
  padding: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: var(--background-color);
  white-space: pre-line;
}

.comments-section {
  margin-top: 40px;
}

.comment-list {
  margin-bottom: 20px;
}

.add-comment {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.add-comment textarea {
  flex: 1;
}
</style>
