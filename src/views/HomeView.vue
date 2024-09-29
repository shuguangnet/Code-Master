<template>
  <!-- 添加所需的样式表 -->
  <link rel="stylesheet" type="text/css" href="https://auth.idcbook.com/template/assets/home/shiwaiyun/static/main.css">
  <link rel="stylesheet" type="text/css" href="https://auth.idcbook.com/template/assets/home/shiwaiyun/static/common.css">
  <link rel="stylesheet" type="text/css" href="https://auth.idcbook.com/template/assets/home/shiwaiyun/static/index.css">

  
    <!-- 页面主要内容 -->
    <div>
      <!-- banner 菜单开始 -->
      <div class="banner-box menu-box auto-menu-box home-menu-box">
        <!-- banner 图片部分 -->
        <ul class="banner-ul clearfix" id="slider-back">
          <li class="banner-apy pos-rel overflow-hidden" style="opacity: 1;">
            <div class="pos-abs tar r0 banner-apy-inside">
              <img class="t0 r0 sm-hidden banner-apy-photo" src="https://auth.idcbook.com//template/assets/home/shiwaiyun/static/banner_in.png" alt="">
            </div>
          </li>
        </ul>

        <!-- banner 文字部分 -->
        <div class="slider-main auto-width">
          <div class="banner-text banner-common-text">
            <div class="slider-text sm-p-lr-15 typewriter">
              <!-- 动态打字效果 -->
              <p class="typing">Code Master编程学习系统</p>
              <p class="font-size-18 color-main-596680 typing">
                代码大师-在线编程学习系统-在线oj判题系统
              </p>
              <a href="">
                <button class="a-zk-btn a-free-reg bg-color-0055ff bdr-5 font-size-18 color-white font-weight-bold"
								@click.prevent="useLogin"
								>
                  立即使用
                  <svg class="icon-svg color-white m-l-20" aria-hidden="true">
                    <use xlink:href="#iconapayun_tongyongicon_jiantou"></use>
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>

        <!-- banner 索引部分，默认隐藏 -->
        <div style="display: none;" class="banner-point">
          <div class="auto">
            <ul class="banner-area" id="slider-btn">
              <li class="active" data-delay="12000"></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- banner 菜单结束 -->

      <!-- 优势部分 -->
      <div class="advantage-box auto-width pos-rel z-1 box-sizing-border sm-p-lr-15">
        <ul>
          <li layout-align="start center" class="advantage-li-1">
            <svg layout-flex="none" class="icon-svg advantage-icon" aria-hidden="true">
              <use xlink:href="#iconapayun_shouyeicon_jieshao1"></use>
            </svg>
            <div>
              <p class="color-main-596680 font-size-16">行业软件创新先驱者</p>
              <p class="color-main-8f9bb2 sm-hidden">更周全、更稳定、更细致的产品及服务</p>
            </div>
          </li>
					<li layout-align="start center" class="advantage-li-1">
          <svg layout-flex="none" class="icon-svg advantage-icon" aria-hidden="true">
            <use xlink:href="#iconapayun_shouyeicon_jieshao2"></use>
          </svg>

          <div>
            <p class="color-main-596680 font-size-16">可靠、灵活、安全、可扩展</p>
            <p class="color-main-8f9bb2 sm-hidden">使用本系统将是你所做出的明智决策</p>
          </div>
        </li>
        <li layout-align="start center" class="advantage-li-1">
          <svg layout-flex="none" class="icon-svg advantage-icon" aria-hidden="true">
            <use xlink:href="#iconapayun_shouyeicon_jieshao3"></use>
          </svg>

          <div>
            <p class="color-main-596680 font-size-16">多元化</p>
            <p class="color-main-8f9bb2 sm-hidden">让我们更懂如何解决不同客户的需求</p>
          </div>
        </li>
        </ul>
      </div>
			
      <!-- 优势部分结束 -->

      <!-- 开始使用部分 -->
      <div class="start-box">
        <div class="auto-width join-apy-wrap sm-p-lr-15">
          <div class="text-content" layout-align="space-between center">
            <div class="bdr-5 font-size-18 font-weight-bold">
              <span class="sm-hidden">
                海量应用，个性化定制服务，曙光与您携手共赢。
              </span>
              <span class="sm-nohidden">
                海量应用，个性化定制服务，曙光与您携手共赢。
              </span>
            </div>
            <a href="#" class="start-btn">
              联系我们
              <svg class="icon-svg color-white m-l-20" aria-hidden="true">
                <use xlink:href="#iconapayun_tongyongicon_jiantou"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div id="tool-bar" class="tool-bar">
      <div class="tool-bar-warp">
        <!-- 联系我们按钮 -->
        <div style="cursor: initial;" class="tool-bar-common tool-bar-contact" id="serviceBtnWrap">
          <a class="cursign" id="serviceBtn">
            <svg class="icon-svg color-white font-size-26 vam m-b-10" aria-hidden="true">
              <use xlink:href="#iconapayun_youcexuanfuicon_lianxiwomen"></use>
            </svg>
            <p style="width: 30px;" class="m-auto font-size-16 sm-hidden">联系我们</p>
          </a>
          <div class="common-dialog-wrap contact-wrap">
            <div class="phone-wrap">
              <p class="contact-title">客服QQ</p>
              <p class="phone-num color-main-0055ff">1270540423</p>
            </div>
            <div class="QRCode-wrap sm-hidden">
              <div layout-align="space-between center">
                <div>
                  <p class="tal contact-title">曙光工作室电话</p>
                  <p class="text">400-805-5213</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 返回顶部按钮 -->
        <div class="tool-bar-common tool-bar-gotop" style="display: none;" id="toTopBtn">
          <svg class="icon-svg color-white font-size-26 vam0" aria-hidden="true">
            <use xlink:href="#iconapayun_tongyongicon_shang"></use>
          </svg>
        </div>
      </div>
    </div>
  <!-- 登录弹框 -->
	<div v-if="visible" class="overlay" @click.self="handleCancel" >
  <div class="login-container">
		<div v-if="ModelInfo=='login'">
      <UserLoginView @goToReg ="UserModel" :ModelStatus="ModelStatus" />
	  </div>
		<div v-else-if="ModelInfo=='reg'">
      <UserRegView @goToLogin ="UserModel" :ModelStatus="ModelStatus" />
	  </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UserLoginView from './user/UserLoginView.vue';
import UserRegView from './user/UserRegView.vue';
const Mdvalue = ref<string>('');
const ModelStatus = ref('card'); // 传递的状态
const Codevalue = ref<string>('');
// 控制弹框显示/隐藏
const visible = ref(false);
const ModelInfo=ref('login')
const OnChange = (v: string) => {
  Mdvalue.value = v;
  console.log(Mdvalue.value);
};

const InChnage = (v: string) => {
  Codevalue.value = v;
  console.log(Codevalue.value);
};

// 打开登录框
const useLogin = () => {
  visible.value = true;
};
const UserModel = (msg: string) => {
	ModelInfo.value=msg
  console.log("收到子组件传来的消息: ", msg);
  // 处理跳转或其他操作
};
// 关闭登录框
const handleCancel = () => {
  visible.value = false;
};
</script>

<style scoped>
/* 页面整体样式 */
#Home {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 遮罩层样式 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 确保遮罩层位于最顶层 */
}

/* 弹窗样式 */
.login-container {
  /* background: #0055ff; */
	/* border-radius: 25px; */
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); */
  /* animation: fadeIn 0.3s ease; 添加淡入动画 */
}

/* 淡入动画效果 */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 打字机动画效果 */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 50%;
  }
}

/* 光标闪烁效果 */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #0a65cc;
  }
}

/* 按钮滑入动画 */
@keyframes slidein {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  50% {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0%);
  }
}

/* 打字机样式 */
.typewriter {
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.typewriter .typing {
  color: var(--color-text-1);
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  overflow: hidden;
  border-right: 0.15em solid #0a65cc;
  white-space: nowrap;
  margin-bottom: 32px;
  letter-spacing: 0.15em;
  animation: typing 4s steps(16, end), blink-caret 0.5s step-end infinite;
}

/* 按钮动画 */
.typewriter .button {
  opacity: 0;
  pointer-events: none;
  color: #0a65cc;
  animation: slidein 1s ease-in 4s forwards;
}

/* 其他样式 */
.shiwaiyun {
  vertical-align: middle;
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 5px;
  border: solid 1px #05f;
  color: #05f;
}
</style>
