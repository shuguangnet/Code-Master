<template>
  <div class="forum-home">
    <!-- 顶部导航栏 -->
    <a-layout>
     

      <a-layout-content>
        <div class="content">
          <a-row gutter={24}>
            <!-- 侧边栏 -->
            <a-col span="6">
              <a-card title="分类" class="sidebar">
                <a-menu mode="inline" theme="light">
                  <a-menu-item key="category1">分类 1</a-menu-item>
                  <a-menu-item key="category2">分类 2</a-menu-item>
                  <a-menu-item key="category3">分类 3</a-menu-item>
                </a-menu>
              </a-card>
            </a-col>

            <!-- 主内容区域 -->
						<a-list
    class="list-demo-action-layout"
    :bordered="false"
    :data="dataSource"
    :pagination-props="paginationProps"
  >
    <template #item="{ item }">
      <a-list-item class="list-demo-item" action-layout="vertical">
        <template #actions>
          <span><icon-heart />83</span>
          <span><icon-star />{{ item.index }}</span>
          <span><icon-message />Reply</span>
        </template>
        <template #extra>
          <div className="image-area">
            <img alt="arco-design" :src="item.imageSrc" />
          </div>
        </template>
        <a-list-item-meta
          :title="item.title"
          :description="item.description"
        >
          <template #avatar>
            <a-avatar shape="square">
              <img alt="avatar" :src="item.avatar" />
            </a-avatar>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
          </a-row>
        </div>
      </a-layout-content>

      
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref,reactive } from 'vue';
import { useRouter } from 'vue-router';
const names = ['Socrates', 'Balzac', 'Plato'];
const avatarSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp',
];
const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/29c1f9d7d17c503c5d7bf4e538cb7c4f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/04d7bc31dd67dcdf380bc3f6aa07599f.png~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1f61854a849a076318ed527c8fca1bbf.png~tplv-uwbnlip3yd-webp.webp',
];

const dataSource = new Array(15).fill(null).map((_, index) => {
  return {
    index: index,
    avatar: avatarSrc[index % avatarSrc.length],
    title: names[index % names.length],
    description:
      'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China. ByteDance has products such as TikTok, Toutiao, volcano video and Douyin (the Chinese version of TikTok).',
    imageSrc: imageSrc[index % imageSrc.length],
  };
});
const paginationProps=reactive({
        defaultPageSize: 3,
        total: dataSource.length
      })
</script>

<style scoped>
.forum-home {
  /* background-color: #f0f2f5; 背景颜色 */
}
.list-demo-action-layout {
  width: 60%;
  
  border-radius: 2px;
  overflow: hidden;
}
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
.header {
	background-color: var(--background-color);
  color: var(--text-color);
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-right: 20px;
}

.nav-menu {
  flex-grow: 1;
}

.content {
  padding: 80px;
}

.sidebar {
	background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 8px;
}

.post-list {
	background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 8px;
}
.footer {
  text-align: center;
  padding: 10px;
	background-color: var(--background-color);
  color: var(--text-color);
}
</style>
