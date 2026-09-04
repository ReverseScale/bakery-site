import { readFileSync } from "node:fs";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { LandingApp } from "./LandingApp";

afterEach(cleanup);

describe("Bakery public site", () => {
  test("presents the complete public product story", () => {
    render(<LandingApp />);

    expect(screen.getByRole("heading", { name: "Build. Package. Deliver." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /From code to installation/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Let automation plan before it builds/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Every build, clearly explained/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Keep every signing asset ready/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Know what is live before the next release/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Know exactly what you are releasing/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /See delivery health, not just build activity/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Keep credentials server-side/ })).toBeInTheDocument();
  });

  test("presents bcli as a standalone plugin engine that can connect to Bakery", () => {
    render(<LandingApp />);

    const integration = screen.getByRole("region", {
      name: "Run bcli standalone or connect it to Bakery",
    });
    const integrationView = within(integration);

    expect(integrationView.getByRole("heading", { name: /Standalone when you want it/ })).toBeInTheDocument();
    expect(integrationView.getByText("Standalone bcli")).toBeInTheDocument();
    expect(integrationView.getByText("Connected to Bakery")).toBeInTheDocument();
    expect(integrationView.getByText(/--config-ref <commit-sha>/)).toBeInTheDocument();
    expect(integrationView.getByText("DISTRIBUTOR_BUILD_TASK_ID")).toBeInTheDocument();
    expect(integrationView.getByText("bcli pipeline run config/mobile/ios-release.yaml")).toBeInTheDocument();
    expect(integrationView.getByText("prepare.env_jenkins")).toBeInTheDocument();
    expect(integrationView.getByText("build.flutter")).toBeInTheDocument();
    expect(integrationView.getByText("upload.internal")).toBeInTheDocument();
    expect(integrationView.getByText("25 plugins, one lifecycle")).toBeInTheDocument();
    expect(integrationView.getByText("11 plugins")).toBeInTheDocument();
    expect(integrationView.getByText("5 plugins")).toBeInTheDocument();
    expect(integrationView.getByText("3 plugins")).toBeInTheDocument();
    expect(integrationView.getByText("4 plugins")).toBeInTheDocument();
    expect(integrationView.getByText("2 plugins")).toBeInTheDocument();
    expect(integrationView.getByText("Execution plane")).toBeInTheDocument();
    expect(integrationView.getByText("Control plane")).toBeInTheDocument();
    expect(integrationView.getByText("Task linked")).toBeInTheDocument();
    expect(integrationView.getByText("Artifact ready")).toBeInTheDocument();
    expect(integrationView.getByText("Declare, don't hard-code")).toBeInTheDocument();
    expect(integrationView.getByText("Pin every run")).toBeInTheDocument();
    expect(integrationView.getByText("Preview before execution")).toBeInTheDocument();
    expect(integrationView.getByText("Observe end to end")).toBeInTheDocument();
  });

  test("presents managed devices as a complete registration-to-rebuild workflow", () => {
    render(<LandingApp />);

    const deviceManagement = screen.getByRole("region", {
      name: "Register devices without profile drift",
    });
    const deviceManagementView = within(deviceManagement);

    expect(deviceManagementView.getByText("Company device pool")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Apple Team snapshot")).toBeInTheDocument();
    expect(deviceManagementView.getByText("One-time UDID session")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Profile group activated")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Rebuild required")).toBeInTheDocument();
    expect(deviceManagementView.getByText("Existing App Store connection")).toBeInTheDocument();
  });

  test("separates the final device status from the rebuild action", () => {
    const css = readFileSync("src/landing-styles.css", "utf8");

    expect(css).toMatch(/\.landing-device-task-steps\{[^}]*margin:0 15px 14px/);
    expect(css).not.toMatch(/\.landing-device-task>footer\{margin-top:15px/);
  });

  test("presents scoped AI automation as a plan-first build workflow", () => {
    render(<LandingApp />);

    const automation = screen.getByRole("region", {
      name: "Plan and run builds through AI-safe automation",
    });
    const automationView = within(automation);

    expect(automationView.getByText("Apps, capabilities, and live options")).toBeInTheDocument();
    expect(automationView.getByText("Validate inputs without side effects")).toBeInTheDocument();
    expect(automationView.getByText("Scoped, idempotent build trigger")).toBeInTheDocument();
    expect(automationView.getByText("OpenAPI · MCP · JSON Schema")).toBeInTheDocument();
    expect(automationView.getByText("High-risk work stays separate.")).toBeInTheDocument();
  });

  test("summarizes exact artifact evidence and advisory release decisions", () => {
    render(<LandingApp />);

    const evidence = screen.getByRole("region", {
      name: "Release candidates backed by exact evidence",
    });
    const evidenceView = within(evidence);

    expect(evidenceView.getByText("Artifact SHA-256")).toBeInTheDocument();
    expect(evidenceView.getByText("Build fingerprint")).toBeInTheDocument();
    expect(evidenceView.getByText("2 repositories · frozen SHAs")).toBeInTheDocument();
    expect(evidenceView.getByText("Build task delivery recorded")).toBeInTheDocument();
    expect(evidenceView.getByText("Release regression suite")).toBeInTheDocument();
    expect(evidenceView.getByText("Evidence snapshot preserved")).toBeInTheDocument();
    expect(evidenceView.getByText("Advisory by design")).toBeInTheDocument();
  });

  test("shows the federated activity log as a cross-domain capability", () => {
    render(<LandingApp />);

    expect(screen.getByRole("img", {
      name: "Cross-domain delivery activity timeline",
    })).toBeInTheDocument();
    expect(screen.getByRole("heading", {
      name: "Trace every delivery action",
    })).toBeInTheDocument();
    expect(screen.getByText("Review synced")).toBeInTheDocument();
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
    expect(screen.getByText("Task-scoped machine access")).toBeInTheDocument();
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
