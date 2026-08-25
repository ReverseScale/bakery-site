import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LandingApp } from "./LandingApp";

afterEach(cleanup);

describe("Bakery public site", () => {
  test("presents the complete public product story", () => {
    render(<LandingApp />);

    expect(screen.getByRole("heading", { name: "Build. Package. Deliver." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From code to installation/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Every build, clearly explained/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Keep every signing asset ready/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Know what is live before the next release/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /See delivery health, not just build activity/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Keep credentials server-side/ })).toBeInTheDocument();
  });

  test("connects the composable Build CLI execution plane to the Bakery control plane", () => {
    render(<LandingApp />);

    const integration = screen.getByRole("region", {
      name: "One platform, a composable build engine",
    });
    const integrationView = within(integration);

    expect(integrationView.getByText("bcli pipeline run config/mobile/ios-release.yaml")).toBeInTheDocument();
    expect(integrationView.getByText("prepare.env_jenkins")).toBeInTheDocument();
    expect(integrationView.getByText("build.flutter")).toBeInTheDocument();
    expect(integrationView.getByText("upload.internal")).toBeInTheDocument();
    expect(integrationView.getByText("Execution plane")).toBeInTheDocument();
    expect(integrationView.getByText("Control plane")).toBeInTheDocument();
    expect(integrationView.getByText("Task linked")).toBeInTheDocument();
    expect(integrationView.getByText("Artifact ready")).toBeInTheDocument();
  });

  test("presents managed devices as a complete registration-to-rebuild workflow", () => {
    render(<LandingApp />);

    const deviceManagement = screen.getByRole("region", {
      name: "Register devices without profile drift",
    });
    const deviceManagementView = within(deviceManagement);

    expect(deviceManagementView.getByText("Company device pool")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Apple Team snapshot")).toBeInTheDocument();
    expect(deviceManagementView.getByText("12 / 12 checks passed")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Profile group activated")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Rebuild required")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Existing App Store connection")).toBeInTheDocument();
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
    expect(screen.getByRole("link", { name: "Releases" })).toHaveAttribute("href", "#releases");
  });

  test("explains signing custody, machine sync, and expiry health with sanitized identifiers", () => {
    render(<LandingApp />);

    expect(screen.getByRole("link", { name: "Signing" })).toHaveAttribute("href", "#signing");
    expect(screen.getByText("Private asset custody")).toBeInTheDocument();
    expect(screen.getByText("Build machine sync")).toBeInTheDocument();
    expect(screen.getByText("Expiry health alerts")).toBeInTheDocument();
    expect(screen.getByText("com.example.mobile")).toBeInTheDocument();
    expect(screen.getByText("Team ••••••••••")).toBeInTheDocument();
    expect(screen.getByText("Key ID ••••••")).toBeInTheDocument();
  });

  test("explains official store release visibility without claiming direct publishing", () => {
    render(<LandingApp />);

    expect(screen.getByRole("img", { name: "Official store release management preview" })).toBeInTheDocument();
    expect(screen.getByText("Read-only release visibility")).toBeInTheDocument();
    expect(screen.getByText("Online version")).toBeInTheDocument();
    expect(screen.getAllByText("Latest submission")).toHaveLength(2);
    expect(screen.getByText("2.8.0 entered review")).toBeInTheDocument();
  });
});
