# Bakery Favicon Contrast Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让 Bakery 立方体 favicon 在浏览器浅色和深色标签页上都清晰可见。

**Architecture:** 保留 `index.html` 现有 SVG favicon 引用，在 `public/favicon.svg` 中使用深色圆角底板和浅色立方体轮廓组成不依赖系统主题的双色图标。使用 Vitest 直接读取源文件，验证 HTML 引用和 SVG 双色结构，避免依赖浏览器缓存或人工目测作为唯一回归手段。

**Tech Stack:** SVG、HTML、Vitest、Vite

## Global Constraints

- 保留现有立方体品牌轮廓。
- 继续使用单个 SVG favicon。
- 使用 `#18181b` 深色底板和 `#f4f4f5` 浅色立方体轮廓。
- 不增加运行时 JavaScript 或第三方依赖。

---

### Task 1: 增加自适应 favicon 及回归测试

**Files:**
- Create: `src/favicon.test.ts`
- Modify: `public/favicon.svg`
- Verify: `index.html`

**Interfaces:**
- Consumes: `index.html` 中的 `<link rel="icon" type="image/svg+xml" href="./favicon.svg" />`
- Produces: 包含 `.favicon-background` 深色底板和 `.favicon-mark` 浅色轮廓的 SVG favicon

- [x] **Step 1: 编写失败测试**

```ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const documentHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
const faviconSvg = readFileSync(resolve(process.cwd(), "public/favicon.svg"), "utf8");

describe("favicon", () => {
  it("uses the SVG favicon from the site root", () => {
    expect(documentHtml).toContain(
      '<link rel="icon" type="image/svg+xml" href="./favicon.svg" />',
    );
  });

  it("uses a two-tone mark that stays visible on any tab background", () => {
    expect(faviconSvg).toContain('<rect class="favicon-background"');
    expect(faviconSvg).toContain('fill="#18181b"');
    expect(faviconSvg).toContain('<path class="favicon-mark"');
    expect(faviconSvg).toContain('stroke="#f4f4f5"');
  });
});
```

- [x] **Step 2: 运行测试并确认因缺少主题规则而失败**

Run: `npm test -- src/favicon.test.ts`

Expected: 第一个测试通过；第二个测试失败，提示找不到 `<rect class="favicon-background"`。

- [x] **Step 3: 实现最小 SVG 主题规则**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect class="favicon-background" x="2" y="2" width="60" height="60" rx="14" fill="#18181b"/>
  <path class="favicon-mark" d="M32 8 52 19v26L32 56 12 45V19L32 8Z" stroke="#f4f4f5" stroke-width="4" stroke-linejoin="round"/>
  <path class="favicon-mark" d="m13 20 19 11 19-11M32 31v24" stroke="#f4f4f5" stroke-width="4" stroke-linejoin="round"/>
</svg>
```

- [x] **Step 4: 运行目标测试、完整测试和生产构建**

Run: `npm test -- src/favicon.test.ts`

Expected: 2 个测试通过。

Run: `npm test`

Expected: 全部测试通过，无失败测试。

Run: `npm run build`

Expected: TypeScript 与 Vite 构建成功，生成 `dist/index.html` 和 `dist/favicon.svg`。

- [x] **Step 5: 验证部署产物并提交**

Run: `rg -n -e 'favicon.svg' dist/index.html && rg -n -e 'favicon-background' -e '#18181b' -e 'favicon-mark' -e '#f4f4f5' dist/favicon.svg`

Expected: `dist/index.html` 引用 favicon，`dist/favicon.svg` 同时包含深色底板和浅色立方体轮廓。

```bash
git add docs/superpowers/plans/2026-07-20-favicon-contrast.md src/favicon.test.ts public/favicon.svg
git commit -m "fix: keep favicon visible across browser themes"
```
