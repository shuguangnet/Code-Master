<template>
  <div class="forum-container">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ 'sidebar-hidden': isSidebarHidden }">
      <h3 class="sidebar-title">分类</h3>
      <ul class="category-list">
        <li
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category)"
          :class="{ active: selectedCategory && selectedCategory.id === category.id }"
        >
          {{ category.name }}
        </li>
      </ul>
    </aside>

    <!-- 主内容区域 -->
    <main class="main-content">
      <!-- 发布帖子按钮 -->
      <div class="post-button-container">
        <a-button type="primary" @click="openPostModal">发布帖子</a-button>
        <a-button class="sidebar-toggle" @click="toggleSidebar">切换侧边栏</a-button>
      </div>
      
      <a-list
        class="list-demo-action-layout"
        :bordered="false"
        :data="dataSource"
        :pagination-props="paginationProps"
      >
        <template #item="{ item }">
          <a-list-item class="list-demo-item" action-layout="vertical" style="display: flex;
    flex-direction: row;justify-content: center;
    align-items: center;" @click="PostDetail(item.id)">
            <template #actions>
              <span><icon-heart />{{ item.thumbNum }}</span>
              <span><icon-star />{{ item.favourNum }}</span>
              <span><icon-message />收藏</span>
            </template>
            <template #extra>
              <!-- <div class="image-area">
                <img alt="arco-design" :src="item.imageSrc || `https://api.miaomc.cn/image/get?${Math.random()}`" />
              </div> -->
            </template>
            <a-list-item-meta :title="item.title" :description="item.content">
              <template #avatar>
                <a-avatar shape="square">
                  <img alt="avatar" :src="item.user.userAvatar" />
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
      
      <!-- 发布帖子模态框 -->
      <a-modal
        v-model:visible="isModalVisible"
        title="发布新帖子"
        ok-text="发布"
        cancel-text="取消"
        @ok="submitPost"
      >
        <a-form layout="vertical" :model="newPost">
          <a-form-item label="标题">
            <a-input v-model="newPost.title" placeholder="请输入帖子标题" />
          </a-form-item>
          <a-form-item label="内容">
            <!-- <a-textarea v-model="newPost.content" placeholder="请输入帖子内容" rows="4" /> -->
						<MdEditor :value="newPost.content" :handle-change="contentChange"></MdEditor>
          </a-form-item>
          <a-form-item label="标签">
            <a-input v-model="newPost.tags" placeholder="请输入标签（用逗号分隔）" />
          </a-form-item>
        </a-form>
      </a-modal>
    </main>
  </div>
</template>



<script setup>
import { ref, reactive, onMounted } from 'vue';
import { PostControllerService } from '../../../generated'; // 假设你有这个服务文件
import MdEditor from '@/components/MdEditor.vue'
import { useRouter } from 'vue-router';
// 请求返回的文章数据
const article = ref([]); // 存放获取的文章数据
// 请求返回的文章数据
const isSidebarHidden = ref(false); // 控制侧边栏的显示与隐藏
const router=useRouter()
// 切换侧边栏显示/隐藏
const toggleSidebar = () => {
  isSidebarHidden.value = !isSidebarHidden.value;
};
// 存放分类信息
const categories = ref([
  { id: 1, name: "所有文章" },
  { id: 2, name: "前端开发" },
  { id: 3, name: "后端开发" },
  { id: 4, name: "全栈开发" },
]); // 这里是示例数据，替换为真实分类数据

const selectedCategory = ref(null); // 当前选中的分类

// 分页数据
const paginationProps = reactive({
  defaultPageSize: 5,
  total: 0,
  current: 1,
  onChange: (page) => fetchData(page), // 页码变化时重新获取数据
});

// 获取文章列表数据
const fetchData = async (page = 1) => {
  try {
    const res = await PostControllerService.listPostVoByPageUsingPost({
      current: page,
      pageSize: paginationProps.defaultPageSize,
      categoryId: selectedCategory.value ? selectedCategory.value.id : null, // 如果有选中分类，则按分类过滤
    });
    if (res.code === 0) {
			paginationProps.page++
      // 设置文章数据
      article.value = res.data.records.map((item) => ({
        ...item,
        imageSrc: item.imageSrc || `https://api.miaomc.cn/image/get?${Math.random()}`,
      }));
      paginationProps.total = res.data.total; // 设置总条目数
    }
  } catch (error) {
    console.error('数据获取失败:', error);
  }
};
const PostDetail=(id)=>{
	console.log(id)
	router.push('/forum/post/'+id)
}
// 初始化时加载数据
onMounted(() => {
  fetchData();
});
const contentChange=(msg)=>{
	newPost.content=msg
}
// 切换分类
const selectCategory = (category) => {
  selectedCategory.value = category;
  fetchData(); // 切换分类时重新获取数据
};

// 发布帖子相关逻辑
const isModalVisible = ref(false); // 控制模态框显示与隐藏
const newPost = reactive({
  title: '',
  content: '',
  tags: '',
});

const openPostModal = () => {
  isModalVisible.value = true; // 显示发布帖子模态框
};

const submitPost = async () => {
  if (!newPost.title || !newPost.content) {
    alert("请填写标题和内容");
    return;
  }

  // 你可以在这里调用你的服务来提交帖子
  try {
    const result = await PostControllerService.addPostUsingPost({
      title: newPost.title,
      content: newPost.content,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
    });
    
    if (result.code === 0) {
      alert("帖子发布成功");
      fetchData(); // 刷新列表
      isModalVisible.value = false; // 关闭模态框
    } else {
      alert("帖子发布失败: " + result.message);
    }
  } catch (error) {
    console.error("发布帖子失败", error);
  }
};

// dataSource 是要绑定到列表的数据
const dataSource = article;
</script>

<style scoped>
/* 布局样式 */
.forum-container {
  display: flex;
  padding: 20px;
  gap: 20px;
  color: var(--text-color);
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px;
  background-color: var(--background-secondary-color);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
}

.sidebar-hidden {
  display: none; /* 隐藏侧边栏 */
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;
  font-weight: 500;
  margin-bottom: 5px;
}

.category-list li:hover {
  background-color: var(--primary-color-light);
  color: white;
}

.category-list li.active {
  background-color: var(--primary-color);
  color: white;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
  padding: 20px;
  background-color: var(--background-secondary-color);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.post-button-container {
  display: flex;
  justify-content: space-between; /* 调整按钮位置 */
  margin-bottom: 20px;
}

.list-demo-action-layout {
  padding: 20px;
  border-radius: 8px;
}

.list-demo-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.image-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px; /* 设置最大宽度 */
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  margin-left: 10px;
}

.image-area img {
  width: 100%;
  height: auto;
  object-fit: cover; /* 确保图片自适应显示 */
  border-radius: 8px;
}

@media (max-width: 768px) {
  .forum-container {
    flex-direction: column; /* 将布局调整为垂直方向 */
    padding: 10px;
  }

  .sidebar {
    flex: 1;
    width: 100%; /* 占满整个屏幕 */
  }

  .main-content {
    width: 100%; /* 主内容也占满整个屏幕 */
  }

  .post-button-container {
    justify-content: center;
  }
}
</style>


