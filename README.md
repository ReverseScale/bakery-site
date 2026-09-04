# Bakery Site

Bakery 的独立产品官网，内容从 distributor 的未登录介绍页抽取，使用 Vite、React 和静态营销配图构建，可部署到 GitHub Pages。

官网包含 Build、Package、Deliver 主叙事，以及可独立运行并可接入 Bakery 的 bcli 插件引擎、AI Automation API + MCP、Managed iOS devices、Signing asset operations、Official store visibility、Trusted artifacts + release admission、Delivery intelligence 和 Federated activity log 产品证明区。bcli 区块基于当前 25 个内置插件，说明声明式流水线、不可变配置快照、步骤数据传递、预览/演练和可选任务上报能力。

Trusted artifacts + release admission 介绍制品 SHA-256、构建输入指纹、多源码完整提交、签名资产领取记录和 Device Cloud 测试结果如何汇总为提示式发布候选。该能力记录批准或豁免时的证据快照，但当前不会阻断既有商店发布路径，也不声称验证安装包内嵌签名。

AI Automation API + MCP 介绍受信机器主体通过版本化契约完成能力发现、无副作用计划、显式确认、幂等触发、状态读取与取消。官网明确保留权限边界：高风险上架包需要独立 scope，商店发布、签名资产和设备写操作不会从构建权限继承。

Federated activity log 介绍构建、设备注册、签名、商店发布和 AI 操作的统一脱敏时间线。它聚合既有权威事实并提供稳定错误码和阶段详情，不复制业务状态，也不把任务成功扩大解释为部署或业务验收成功。

Signing asset operations 介绍证书、Provisioning Profile、服务密钥等项目级资产托管，打包机使用可撤销机器凭据自动同步当前有效资产，以及项目页面中的聚合过期提醒。该区块使用 React/CSS 构造的脱敏产品示意，不引用生产截图；应用名、Bundle ID、Team ID、文件名、设备数量和具体有效期均为通用示例或掩码。

Delivery intelligence 区域使用英文脱敏工作台配图展示构建成功率、Median/P90 耗时、队列压力、吞吐量与趋势，不包含生产账号、应用名或内部地址。

## 本地开发

```bash
npm install
npm run dev
```

默认访问 `http://localhost:5173/`。

## 验证

```bash
npm test
npm run build
npm run preview
```

生产构建输出在 `dist/`。Vite 使用相对资源路径，因此站点既支持 GitHub Pages 的 `/bakery-site/` 子路径，也支持后续绑定自定义域名。

## 平台入口

官网 CTA 默认指向：

```text
https://dist.builder.addx.live/login/signin
```

如需切换平台地址，在构建环境设置：

```bash
VITE_PLATFORM_URL=https://example.com npm run build
```

`VITE_PLATFORM_URL` 是公开的前端构建变量，只能存放公开网址，不能存放凭据。

## GitHub Pages

仓库包含 `.github/workflows/deploy-pages.yml`：

1. 在 GitHub 仓库的 **Settings → Pages** 中，将 Source 设为 **GitHub Actions**。
2. 推送到 `main` 分支。
3. Workflow 会执行测试、构建并发布 `dist/`。

Pull Request 会通过 `.github/workflows/ci.yml` 独立执行测试和生产构建；Pages 部署只在变更合并到 `main` 后触发。

站点不依赖 Django、数据库或登录 session；登录按钮会跳转到实际 Bakery 平台。
