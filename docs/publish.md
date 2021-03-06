# 发布

### 如何选择新版本号

从 1.0.0 开始，太空饭否使用[语义化版本控制](https://semver.org)。当发布新版本时，选择新版本号应遵循：

- 如果没有引入新功能，只是在现有基础上修补和改进，则应发布 patch（`_._.+`）更新；
- 如果引入了新功能，则应该发布 minor（`_.+._`）更新；
- 如果大幅度调整了代码或设计，则应该发布 major（`+._._`）更新。

### 更新历史的显示位置

- 「设置」→「更新历史」，显示完整的更新历史
- 扩展启动时弹出通知，显示本次版本更新内容的概要（如果刚刚升级到了新版本、开启了相关设置，并且 `versionHistory` 中包含了该版本的更新内容）

### 如何编写更新历史内容

- 更新历史应该介绍该版本在功能、设计及用户体验方面新引入或修正的内容
- 应该避免无意义的文字，如「修正了一些 bug」，尽量不打扰用户
- 如果更新内容过多，可以在前面写一行概要，用于作为桌面通知内容显示

### 如何发布新版？

1. 修改 `static/manifest.json` 中的版本号
1. 在 `src/version-history/versionHistory` 中添加更新说明（可选）
1. 构建 `npm run release`
1. 将自动打包生成的 zip 文件提交到商店审核
