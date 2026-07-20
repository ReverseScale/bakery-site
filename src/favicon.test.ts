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
