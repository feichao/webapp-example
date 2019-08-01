# webapp-example

### 1. NodeJS 版本 > 8.9

### 2. 技术栈

 - VUE.js
 - ElementUI
 - axios
 - webpack

### 3. 功能列表

 - 业务分层
   - 视图层 + 视图层逻辑 views 中 **(business/views)**
   - 数据模型 + 业务逻辑 vmodels 中 **(business/vmodels)**
 - 扩展
   - 全局变量扩展 **(extend/\_window.js)**
   - VUE 变量扩展 **(extend/\_vue.js)**
   - VModel 扩展, 封装数据获取 **(extend/model)**
 - 组件分层: 
   - 基础组件: src/components
   - 业务组件: src/business
 - 错误监控, 错误上报: 萌友 APM **(extend/\_vue.js)**
 - 性能监控, 性能上报: 萌友 APM **(extend/\_vue.js)**
 - 数据收集, 数据分析: Friday **(extend/\_vue.js)**
 - 日志: 调试日志, 动态日志 **(extend/\_debug.js)**
   - 四级日志: window.\_info, window.\_log, window.\_warn, window.\_error
   - 关键操作时间分析: window.\_timeStart, window.\_timeEnd
   - 日志分级系统: DEBUG\_LEVEL\_INFO, DEBUG\_LEVEL\_DEBUG, DEBUG\_LEVEL\_WARN, DEBUG\_LEVEL\_ERROR
   - 断言: window._assert
 - 多语言: 支持多语言, 语言文件懒加载 **(i18n/\_debug.js)**
 - 模块懒加载: 业务单元懒加载 **(router/index.js)**
 - 生命周期注入: **(extend/\_component.js)**
 - 代码生成 **(src/maker/*.js)**
   - 基础组件生成器, 使用命令 npm run new-component name=ExampleComponent
   - 业务组件生成器, 使用命令 npm run new-business name=ExampleBusiness
   - store 生成器, 使用命令 npm run new-store name=Example
 - 配置管理
   - config/config.local.js 本地开发时的环境参数
   - config/config.dev.js 线上开发环境
   - config/config.test.js 线上测试环境
   - config/config.prod.js 正式环境
 - index.html 注入预执行脚本 **(preload.js)**

### 4. npm 命令

 - npm run dev
 - npm run start
 - npm run build-dev: 开发环境打包
 - npm run build-staging: 测试环境打包
 - npm run build-master: 生产环境打包
 - npm run make-component: 自动生成组件文件
 - npm run make-business: 自动生成业务组件文件
 - npm run make-store: 自动生成 vuex store 文件

### 5. 插件推荐 (为了提高开发效率, 建议安装下面的插件)

 - Auto Close Tag
 - Auto Rename Tag
 - ESLint
 - File Peek
 - GitLens
 - Import Cost
 - IntelliSence for CSS class names in HTML
 - Path Intellisense
 - Vetur
 - Vue Peek


 
  