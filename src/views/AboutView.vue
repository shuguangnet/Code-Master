<template>
  <div class="about-container">
    <!-- Banner Section -->
    <section class="about-banner">
      <div class="banner-content">
        <h1 class="animate__animated animate__fadeInDown">关于曙光</h1>
        <p class="animate__animated animate__fadeInUp">
          一名热爱技术与创新的前端工程师，致力于用代码构建更美好的互联网世界。
        </p>
      </div>
    </section>

    <!-- About Content Section -->
    <section class="about-content">
      <!-- Personal Info -->
      <div class="info-box">
        <h2 class="animate__animated animate__fadeInLeft">我的使命</h2>
        <p class="animate__animated animate__fadeInRight">
          用技术改变世界，专注于前端开发、UI/UX设计与全栈技术。我的目标是为客户和开发者提供最佳的用户体验与开发支持。
        </p>
      </div>

      <!-- Links Section -->
      <div class="links-section">
        <h2 class="animate__animated animate__fadeInUp">我的主页</h2>
        <div class="links-cards">
          <a
            v-for="link in links"
            :key="link.name"
            :href="link.url"
            target="_blank"
            class="link-card animate__animated animate__zoomIn"
          >
            <div class="link-icon">
              <i :class="link.icon"></i>
            </div>
            <h3>{{ link.name }}</h3>
            <p>{{ link.description }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <h2>联系我</h2>
      <p>我随时欢迎您的咨询与合作，欢迎交流前端技术与开发心得。</p>
      <a href="mailto:jasvip@vip.qq.com" class="contact-button">
        发送邮件
      </a>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AboutUs",
  setup() {
    const links = ref([
      {
        name: "GitHub",
        url: "https://github.com/shuguangnet",
        icon: "fab fa-github",
        description: "查看我的代码仓库",
      },
      {
        name: "博客",
        url: "https://pqblog.com",
        icon: "fas fa-blog",
        description: "阅读我的技术博客",
      },
      {
        name: "API聚合登录平台",
        url: "https://api.shuguangwl.com",
        icon: "fas fa-globe",
        description: "了解我的更多作品与项目",
      },
      {
        name: "曙光互联",
        url: "https://idcbook.com",
        icon: "fab fa-twitter",
        description: "-vps销售平台",
      },{
        name: "191商城",
        url: "https://191ka.cn",
        icon: "fab fa-twitter",
        description: "虚拟寄售平台",
      },
    ]);

    // Return any reactive variables or methods to the template
    return {
      links,
    };
  },
};
</script>


<style scoped>
/* Banner Section */
.about-container {
  font-family: 'Arial', sans-serif;
  color: #fff;
}

.about-banner {
  background: linear-gradient(135deg, #0052d9, #287aff, #4db8ff);
  text-align: center;
  padding: 100px 20px;
  background-size: 200% 200%;
  animation: gradientAnimation 5s ease infinite;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.banner-content h1 {
  font-size: 4rem;
  margin-bottom: 20px;
}

.banner-content p {
  font-size: 1.5rem;
}

/* About Content Section */
.about-content {
  background: #f4f4f4;
  padding: 60px 20px;
  text-align: center;
}

.info-box {
  margin: 40px 0;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.info-box h2 {
  font-size: 2.5rem;
  color: #0052d9;
  margin-bottom: 10px;
}

.info-box p {
  font-size: 1.2rem;
  color: #333;
}

/* Links Section */
.links-section {
  padding: 40px 20px;
  background: #287aff;
  color: #fff;
}

.links-section h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
}

.links-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.link-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s;
  color: #333;
  text-decoration: none;
}

.link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  color: #0052d9;
}

.link-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  color: #0052d9;
}

/* Contact Section */
.contact-section {
  text-align: center;
  padding: 60px 20px;
  background: #0052d9;
  color: #fff;
}

.contact-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.contact-section p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.contact-button {
  display: inline-block;
  background: #287aff;
  color: #fff;
  padding: 12px 30px;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s ease, transform 0.3s ease;
}

.contact-button:hover {
  background: #1a5fb9;
  transform: translateY(-3px);
}
</style>
