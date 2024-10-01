<template>
  <div class="forum-container">
    <!-- 侧边栏 -->
		<aside class="sidebar" style="color: var(--text-color);">
  <h3 class="sidebar-title" style="color: var(--text-color);">分类</h3>
  <ul class="category-list" style="color: var(--text-color);">
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
      <a-list
        class="list-demo-action-layout"
        :bordered="false"
        :data="dataSource"
        :pagination-props="paginationProps"
      >
        <template #item="{ item }">
          <a-list-item class="list-demo-item" action-layout="vertical" style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
           
						<template #actions>
              <span><icon-heart />{{ item.thumbNum }}</span>
              <span><icon-star />{{ item.favourNum }}</span>
              <span><icon-message />收藏</span>
            </template>
						<template #content>
              <div class="content-area">
               你好你好你好你好你好你好你好你好你好你好你好你好你好你好
              </div>
            </template>
            <template #extra>
              <div class="image-area">
                <img alt="arco-design" :src="item.imageSrc || `https://api.miaomc.cn/image/get?${Math.random()}`" />

              </div>
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
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { PostControllerService } from '../../../generated'; // 假设你有这个服务文件

// 请求返回的文章数据
const article = ref([]); // 存放获取的文章数据

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
  defaultPageSize: 3,
  total: 0,
  current: 1,
  onChange: (page) => fetchData(page), // 页码变化时重新获取数据
});
const getRandomImg=()=>{return }
// 获取文章列表数据
const fetchData = async (page = 1) => {
  try {
    const res = await PostControllerService.listPostVoByPageUsingPost({
      current: page,
      pageSize: paginationProps.defaultPageSize,
      categoryId: selectedCategory.value ? selectedCategory.value.id : null, // 如果有选中分类，则按分类过滤
    });
    if (res.code === 0) {
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

// 初始化时加载数据
onMounted(() => {
  fetchData();
});

// 切换分类
const selectCategory = (category) => {
  selectedCategory.value = category;
  fetchData(); // 切换分类时重新获取数据
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
	color:--text-color;
}

/* 侧边栏样式 */
.sidebar {
	
  flex: 0 0 200px;
  background-color: --background-color;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	border: 0.5px solid #fff;
}

.sidebar-title {
	
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.category-list li:hover {
  background-color: #d8d8d8;
}

.category-list li.active {
  background-color: #1890ff;
  color: white;
}

/* 主内容区域样式 */
.main-content {
  flex: 1;
}

.list-demo-action-layout {
  background-color: --background-color;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
  margin-left: 10px;
}

.image-area img {
  max-width: 100%;
  max-height: 100%;
}
</style>
