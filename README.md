# Bakery Site

Bakery 的独立产品官网，内容从 distributor 的未登录介绍页抽取，使用 Vite、React 和静态营销配图构建，可部署到 GitHub Pages。

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
