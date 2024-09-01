# Code Master代码大师

  基于 SpringBoot+Spring Cloud 微服务+Docker(+Vue3+ArcoDesign)的编程题目在线评测系统。
  管理员可以创建、管理题目;用户可以自由搜索题目、阅读题目、编写并提交代码。在系统前台，在系统后端，
  能够根据管理员设定的题目测试用例在 自主实现的代码沙箱 中对代码进行编译、运行、判断输出是否正确。
  其中，代码沙箱可以作为独立服务，提供给其他开发者使用

## 前端

1.基于 Vue3 + Arco Design 组件库，自主实现了在线做题、题目检索和管理、提交列表、用户登录等页面。

2.使用 Vue-CL 脚手架初始化项目，并自行开发了全局页面布局和通用前端项目模板，便于后续复用。

3.使用 Typescript + ESlint +pretier + Husky保证项目编码和提交规范，提高项目的质量。(虽然是由脚手架自动帮你整合了，但你要知道这些技术各自的作用)

4.全局导航生成:基于 Vue Router的路中配置文件自动生成导航菜单，并通过给路由的 meta 属件增加 hidden 字段实现集中控制页面的显隐。

5.全局权眼管理:通过给 wve Router路由的 mela 属件增加 acess 字段来定义页面权眼，然后通过 beforeach 全局路由守卫集中校验用户进入页面的权限，并进一步将权
限管理相关代码统一封装为 access.ts 模块，简化用户使用。

6.全局状态管理:基于 Vuex 定义 User Module 实现了对登录用户的状态存储，并通过组合式 AP(usestore)在页面中访问用户信息

7.前后端联调:使用 openapitypescript-codegen 工具根据后端 Swagger 接口文档自动生成请求后端的代码，大幅提高开发效率,.

8.为提高前端开发效率，使用 IDEA 的 Live Templates 功能自定义了一套基础前端代码模板，能够通过快捷键高效生成代码。

9.选用 ByteMD 开源 Markdown 文本编辑器组件，引入 gfm 插件(支持表格语法)并进一步自行封装了可复用的 Editor和 Viewer，实现了题目内容及答案的编辑功能。

10.基于 Webpack整合了 Monaco Editor开源代码编辑器组件，并进一步基于ref自行封装了可复用的 Editor和 Viewer，实现了用户编写代码功能，支持多种语言的高亮.

11.使用 Arco Design 的 Table 组件实现了题目检索页面，并通过自定义插槽将后端返回的JSON 数据解析为美观的格式。

[![微信截图_20240901201643.png](https://minio-img.933999.xyz/test1/2024/09/01/66d4655e4ea1d.png)](https://minio-img.933999.xyz/test1/2024/09/01/66d4655e4ea1d.png)
[![微信截图_20240901204915.png](https://minio-img.933999.xyz/test1/2024/09/01/66d4655deedf8.png)](https://minio-img.933999.xyz/test1/2024/09/01/66d4655deedf8.png)
[![微信截图_20240901204930.png](https://minio-img.933999.xyz/test1/2024/09/01/66d4655fd1195.png)](https://minio-img.933999.xyz/test1/2024/09/01/66d4655fd1195.png)
[![微信截图_20240901204945.png](https://minio-img.933999.xyz/test1/2024/09/01/66d46560a958b.png)](https://minio-img.933999.xyz/test1/2024/09/01/66d46560a958b.png)
