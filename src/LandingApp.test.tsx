import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LandingApp } from "./LandingApp";

afterEach(cleanup);

describe("Bakery public site", () => {
  test("presents the complete public product story", () => {
    render(<LandingApp />);

    expect(screen.getByRole("heading", { name: "Build. Package. Deliver." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From code to installation/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Every build, clearly explained/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /See delivery health, not just build activity/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Keep credentials server-side/ })).toBeInTheDocument();
  });

  test("links calls to action to the production Bakery workspace", () => {
    render(<LandingApp />);

    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
      "href",
      "https://tims.tail5d10b9.ts.net/bakery/login/signin",
    );
    for (const link of screen.getAllByRole("link", { name: "Sign in to Bakery" })) {
      expect(link).toHaveAttribute("href", "https://tims.tail5d10b9.ts.net/bakery/login/signin");
    }
  });

  test("loads deployable marketing assets from the Vite base path", () => {
    render(<LandingApp />);

    expect(screen.getByAltText(/build parameters screen/)).toHaveAttribute("src", "/marketing/build-parameters-en.webp");
    expect(screen.getByAltText(/build detail showing live pipeline/)).toHaveAttribute("src", "/marketing/pipeline-detail-en.webp");
    expect(screen.getByAltText(/CI configuration screen/)).toHaveAttribute("src", "/marketing/ci-configuration-en.webp");
    expect(screen.getByAltText(/delivery insights dashboard/)).toHaveAttribute("src", "/marketing/dashboard-insights-en.webp");
  });

  test("exposes delivery insights in product navigation", () => {
    render(<LandingApp />);

    expect(screen.getByRole("link", { name: "Insights" })).toHaveAttribute("href", "#insights");
  });
});
