# vue3-h5-template

[更新日志](CHANGELOG.md)

- [介绍](#介绍)
- [文档](#文档)
- [预安装](#预安装)
  - [环境要求](#环境要求)
  - [插件](#插件)
  - [建议开发环境](#建议开发环境)
- [使用](#使用)
  - [开发环境](#开发环境)
  - [打包](#打包)
  - [格式化](#格式化)
  - [其他](#其他)
- [已完成功能](#已完成功能)
- [正在开发的功能](#正在开发的功能)
- [学习文档](#学习文档)

## 介绍

基于`vue2.x`,`typescript`,`webpack`实现的 vant 风格的h5模板

## 文档

[文档地址,正在开发中...](https://vue3js.cn/)

## 预安装

### 环境要求

- `Node.js`: - 版本最好大于 `12.0.0`
- `yarn` > `npm` > `cnpm`: - 包管理工具.

### 插件

- [Vue Router Next](https://github.com/vuejs/vue-router-next)
- [Vuex Next](https://github.com/vuejs/vuex)
- [axios](https://github.com/axios/axios) - Http 数据交互
- [TypeScript](https://www.typescriptlang.org/)

### 建议开发环境

- `Git`: - 版本管理工具
- `Visual Studio Code` - (VSCode): 最新版本
  - [VS Code Extensions](./.vscode/extensions.json)
    - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind Css 样式联想
    - [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) - vue 开发必备
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - 脚本代码检查
    - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化
    - [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - css 格式化

## 使用

### 开发环境

```bash
yarn serve
```

### 打包

```bash

yarn build # 打包

yarn analysis # 生成构建包报表预览
```

### 格式化

```bash
yarn lint # 样式格式化
```

### 其他

```bash
yarn reinstall # 删除依赖重新装，兼容window

yarn changelog # 生成CHANGELOG
```

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `types` 类型定义文件更改

## 已完成功能

- [x] 项目搭建（基于 vue-cli）
- [x] axios 封装
- [x] App端 DsBridge 封装
- [x] sentry 异常监控配置

## 正在开发的功能

- [ ] Jest 单元测试用例
- [ ] hooks 封装 toast 相关组件

## 学习文档

- [vue3-中文学习文档](https://vue3js.cn/docs/zh/)

- [jest使用文档](https://jestjs.io/docs/zh-Hans/getting-started.html)

- [less使用文档](https://less.bootcss.com/)

- [Typescript 使用文档](https://jkchao.github.io/typescript-book-chinese/#why)
