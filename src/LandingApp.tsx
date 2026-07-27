import {
  Activity,
  ArrowRight,
  BellRing,
  Box,
  Boxes,
  Braces,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  CloudCog,
  FileArchive,
  GitBranch,
  Layers3,
  Link2,
  PackageCheck,
  Play,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  TimerReset,
  UsersRound,
} from "lucide-react";
import { BRAND } from "./brand";

const integrations = ["Jenkins", "GitLab CI", "Webhook", "Bitrise", "Feishu", "S3", "Open API"];
const homeUrl = import.meta.env.BASE_URL;
const platformUrl = (import.meta.env.VITE_PLATFORM_URL || "https://tims.tail5d10b9.ts.net/bakery").replace(/\/$/, "");
const signInUrl = `${platformUrl}/login/signin`;
const marketingAsset = (filename: string) => `${import.meta.env.BASE_URL}marketing/${filename}`;

const workflow = [
  {
    step: "01",
    verb: "Build",
    title: "Start with the CI your team already knows",
    description: "Connect Jenkins, GitLab CI, or a generic webhook, then turn branches, environments, and release inputs into a clear build entry point.",
    detail: "Parameter templates · Branch selection · Cancel and retry",
    icon: Play,
  },
  {
    step: "02",
    verb: "Package",
    title: "Give every artifact complete context",
    description: "Organize IPA and APK artifacts around applications and versions while preserving the branch, environment, pipeline, and build owner.",
    detail: "Version management · Build history · Artifact archive",
    icon: Boxes,
  },
  {
    step: "03",
    verb: "Deliver",
    title: "Move every build onto a real device",
    description: "Create secure links and QR codes, then guide testers and stakeholders through controlled downloads and iOS OTA installation.",
    detail: "Secure sharing · QR codes · iOS OTA",
    icon: Smartphone,
  },
] as const;

const capabilities = [
  {
    icon: CloudCog,
    visual: "orchestrate",
    title: "Orchestrate without replacing CI",
    description: "Keep your existing build infrastructure and organize applications, pipelines, and triggers behind one consistent entry point.",
  },
  {
    icon: CircleGauge,
    visual: "pipeline",
    title: "Make pipeline progress visible",
    description: "See stages, steps, live status, and timing so the team always knows what a build is doing.",
  },
  {
    icon: TimerReset,
    visual: "reuse",
    title: "Reuse complete build context",
    description: "Review the full parameter set in build history and trigger the same configuration again without setup drift.",
  },
  {
    icon: UsersRound,
    visual: "team",
    title: "Designed for team delivery",
    description: "Use roles, artifact activity, and Feishu notifications to get build results to the right people at the right time.",
  },
] as const;

const signingAssetPreview = [
  {
    name: "Distribution profile",
    detail: "App Store release · Production",
    scope: "com.example.mobile",
    status: "Valid",
  },
  {
    name: "Development certificate",
    detail: "Device testing · Development",
    scope: "Team ••••••••••",
    status: "Valid",
  },
  {
    name: "Service API key",
    detail: "Release automation · Production",
    scope: "Key ID ••••••",
    status: "Expires in 24 days",
  },
] as const;

function WorkflowIllustration({ verb }: { verb: "Build" | "Package" | "Deliver" }) {
  if (verb === "Build") return <div className="landing-card-visual landing-build-illustration" role="img" aria-label="Build branch and parameter preview">
    <div className="landing-illustration-row"><GitBranch /><span><small>Branch</small><strong>release/mobile</strong></span><Play /></div>
    <div className="landing-illustration-chips"><span>Version</span><span>Environment</span><span>Package</span></div>
  </div>;
  if (verb === "Package") return <div className="landing-card-visual landing-package-illustration" role="img" aria-label="Mobile artifact archive preview">
    <div><FileArchive /><span><small>iOS artifact</small><strong>Application.ipa</strong></span><em>Ready</em></div>
    <div><FileArchive /><span><small>Android artifact</small><strong>Application.apk</strong></span><em>Ready</em></div>
  </div>;
  return <div className="landing-card-visual landing-share-illustration" role="img" aria-label="Secure mobile sharing preview">
    <div className="landing-mini-qr"><QrCode /></div><span><small>Secure delivery</small><strong>Ready to install</strong><em><Link2 /> Share link active</em></span><Smartphone />
  </div>;
}

function CapabilityIllustration({ kind }: { kind: "orchestrate" | "pipeline" | "reuse" | "team" }) {
  if (kind === "orchestrate") return <div className="landing-capability-visual landing-orchestrate-visual" role="img" aria-label="Multiple CI providers connected to Bakery">
    <div><span>J</span><span>G</span><span>W</span></div><i /><b><Box /></b>
  </div>;
  if (kind === "pipeline") return <div className="landing-capability-visual landing-progress-visual" role="img" aria-label="Traceable pipeline stages">
    {[["Prepare", "done"], ["Validate", "done"], ["Build", "active"], ["Deliver", "waiting"]].map(([label, status]) => <span className={status} key={label}><i>{status === "done" ? <Check /> : status === "active" ? <Activity /> : <PackageCheck />}</i><small>{label}</small></span>)}
  </div>;
  if (kind === "reuse") return <div className="landing-capability-visual landing-reuse-visual" role="img" aria-label="Reusable build configuration">
    <div><span><GitBranch />Branch</span><code>release/mobile</code></div><div><span><Braces />Parameters</span><code>preserved</code></div><b><RotateCcw />Run again</b>
  </div>;
  return <div className="landing-capability-visual landing-team-visual" role="img" aria-label="Team roles and build notifications">
    <div><span><UsersRound /></span><i /><span><ShieldCheck /></span><i /><span className="active"><BellRing /></span></div><small>Build owner notified</small>
  </div>;
}

export function LandingApp() {
  return <div className="landing-page">
    <header className="landing-nav">
      <a className="landing-brand" href={homeUrl} aria-label={`${BRAND.name} home`}><Box /><strong>{BRAND.name}</strong></a>
      <nav aria-label="Product navigation">
        <a href="#workflow">Workflow</a>
        <a href="#pipeline">Pipeline</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#signing">Signing</a>
        <a href="#insights">Insights</a>
        <a href="#security">Security</a>
      </nav>
      <a className="landing-signin" href={signInUrl}>Sign in<ArrowRight /></a>
    </header>

    <main>
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <div className="landing-eyebrow"><span /><small>Mobile delivery, connected</small></div>
          <h1 aria-label="Build. Package. Deliver."><span>Build.</span><span>Package.</span><span>Deliver.</span></h1>
          <p>Connect mobile builds, pipeline visibility, version management, and app distribution in one clear delivery path.</p>
          <div className="landing-hero-actions">
            <a className="landing-primary" href={signInUrl}>Sign in to {BRAND.name}<ArrowRight /></a>
            <a className="landing-secondary" href="#workflow">Explore the workflow<ChevronRight /></a>
          </div>
          <div className="landing-hero-note"><CheckCircle2 />Works with your existing CI. No contract changes.</div>
        </div>

        <div className="landing-product-visual" role="img" aria-label="Bakery delivery flow from build to installation">
          <div className="landing-window" aria-hidden="true">
            <div className="landing-window-bar"><span><i /><i /><i /></span><small>Bakery / Mobile Release</small><b>Live</b></div>
            <div className="landing-window-body">
              <div className="landing-build-summary">
                <div className="landing-build-icon"><GitBranch /></div>
                <div><small>Release pipeline</small><strong>Mobile application</strong></div>
                <span><Activity /> Connected</span>
              </div>
              <div className="landing-parameter-row"><span><Braces /> Build parameters</span><code>branch · version · environment</code></div>
              <div className="landing-stage-track">
                {[
                  ["Prepare", "Repository & parameters"],
                  ["Build", "Compile & sign"],
                  ["Package", "IPA / APK"],
                  ["Deliver", "Share & install"],
                ].map(([title, detail], index) => <div className={index < 3 ? "complete" : "active"} key={title}><span>{index < 3 ? <Check /> : <PackageCheck />}</span><strong>{title}</strong><small>{detail}</small></div>)}
              </div>
            </div>
          </div>
          <div className="landing-delivery-card" aria-hidden="true"><div><QrCode /></div><span><small>Artifact ready</small><strong>Install on your device</strong><em>Secure link · iOS OTA</em></span><CheckCircle2 /></div>
          <div className="landing-glow" aria-hidden="true" />
        </div>
      </section>

      <section className="landing-integrations" aria-labelledby="integrations-title">
        <p id="integrations-title">Connect the tools your team already uses</p>
        <div>{integrations.map((integration) => <span key={integration}>{integration}</span>)}</div>
      </section>

      <section className="landing-section landing-workflow" id="workflow">
        <div className="landing-section-heading"><span>One delivery path</span><h2>From code to installation, one continuous delivery path.</h2><p>Bakery keeps engineering language intact and brings previously disconnected steps into one focused workspace.</p></div>
        <div className="landing-workflow-grid">
          {workflow.map(({ step, verb, title, description, detail, icon: Icon }) => <article key={verb}>
            <div className="landing-card-top"><span>{step}</span><Icon /></div>
            <WorkflowIllustration verb={verb} />
            <small>{verb}</small><h3>{title}</h3><p>{description}</p><footer>{detail}</footer>
          </article>)}
        </div>
        <figure className="landing-real-shot landing-parameters-shot">
          <div className="landing-shot-copy"><span>Configurable build forms</span><h3>Turn release knowledge into a reusable interface.</h3><p>Define branches, environments, versions, and advanced options once, then give every build the same reliable starting point.</p></div>
          <div className="landing-shot-frame"><img src={marketingAsset("build-parameters-en.webp")} alt="Bakery build parameters screen with reusable branch, environment, version, and release fields" loading="lazy" decoding="async" /></div>
        </figure>
      </section>

      <section className="landing-section landing-pipeline" id="pipeline">
        <div className="landing-pipeline-copy">
          <span>Pipeline visibility</span>
          <h2>Every build, clearly explained.</h2>
          <p>Go beyond a single running state. Bakery breaks a build into stages and steps, preserving timing and results so teams can understand progress and failures quickly.</p>
          <ul><li><Check />Live stage and step status</li><li><Check />Complete parameters and build history</li><li><Check />Rebuild with a proven configuration</li></ul>
          <a href={signInUrl}>Explore the workspace<ArrowRight /></a>
        </div>
        <figure className="landing-real-shot landing-pipeline-shot"><div className="landing-shot-frame"><img src={marketingAsset("pipeline-detail-en.webp")} alt="Bakery build detail showing live pipeline stages, artifacts, and reusable parameters" loading="lazy" decoding="async" /></div><figcaption>Live stages · Build context · Reusable parameters</figcaption></figure>
      </section>

      <section className="landing-section" id="capabilities">
        <div className="landing-section-heading"><span>Built for mobile teams</span><h2>More than artifact storage.</h2><p>Bring build entry points, pipeline progress, artifacts, and collaboration together around real delivery work.</p></div>
        <div className="landing-capability-grid">{capabilities.map(({ icon: Icon, visual, title, description }) => <article key={title}><div className="landing-capability-heading"><Icon /><span>{title}</span></div><CapabilityIllustration kind={visual} /><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="landing-section landing-signing" id="signing">
        <div className="landing-signing-copy">
          <span>Signing asset operations</span>
          <h2>Keep every signing asset ready for the next build.</h2>
          <p>Manage certificates, provisioning profiles, service keys, and release credentials by application, purpose, and environment. Bakery validates each upload and keeps private content in protected object storage.</p>
          <div className="landing-signing-benefits">
            <article><ShieldCheck /><span><strong>Private asset custody</strong><small>Role-based access, encrypted storage, version history, and auditable activity.</small></span></article>
            <article><RotateCcw /><span><strong>Build machine sync</strong><small>Revocable machine credentials retrieve the current authorized bundle and replace it atomically.</small></span></article>
            <article><BellRing /><span><strong>Expiry health alerts</strong><small>Project pages surface safe, aggregate warnings before active assets expire or become invalid.</small></span></article>
          </div>
        </div>

        <div className="landing-signing-product" role="img" aria-label="Sanitized signing asset management preview with current assets and an expiry warning">
          <div className="landing-signing-product-bar">
            <span><ShieldCheck /><strong>Mobile App · Signing assets</strong></span>
            <small>3 current assets</small>
          </div>
          <div className="landing-signing-alert"><BellRing /><span><strong>Asset attention required</strong><small>One current credential expires within 30 days.</small></span><em>Review</em></div>
          <div className="landing-signing-list">
            {signingAssetPreview.map((asset) => <div className="landing-signing-row" key={asset.name}>
              <span className="landing-signing-state"><CheckCircle2 /></span>
              <span className="landing-signing-identity"><strong>{asset.name}</strong><small>{asset.detail}</small></span>
              <code>{asset.scope}</code>
              <em className={asset.status.startsWith("Expires") ? "warning" : ""}>{asset.status}</em>
            </div>)}
          </div>
          <div className="landing-signing-machine">
            <span><RotateCcw /><small>Build machine</small><strong>Signing bundle synchronized</strong></span>
            <code>Current · verified · token protected</code>
          </div>
        </div>
      </section>

      <section className="landing-section landing-insights" id="insights">
        <div className="landing-insights-copy">
          <div><span>Delivery intelligence</span><h2 aria-label="See delivery health, not just build activity.">See delivery health,<br />not just build activity.</h2></div>
          <div><p>Turn 30 days of pipeline data into clear signals for reliability, speed, queue pressure, and delivery throughput.</p><ul><li><Check />Success and latency trends</li><li><Check />Median and P90 build time</li><li><Check />Active builds and throughput</li></ul></div>
        </div>
        <figure className="landing-real-shot landing-insights-shot"><div className="landing-shot-frame"><img src={marketingAsset("dashboard-insights-en.webp")} alt="Bakery delivery insights dashboard showing build success, duration, throughput, and trend metrics" loading="lazy" decoding="async" /></div><figcaption>Success rate · Build duration · Queue pressure · Throughput</figcaption></figure>
      </section>

      <section className="landing-section landing-ci-showcase">
        <div className="landing-ci-copy"><span>Bring your own CI</span><h2>Keep the pipeline.<br />Simplify the delivery.</h2><p>Connect Jenkins, GitLab CI, or a generic webhook without moving credentials or rebuilding the workflow your team already trusts.</p><div><span><Check />Independent configuration</span><span><Check />Reusable build sources</span><span><Check />Server-side credentials</span></div></div>
        <figure className="landing-real-shot landing-ci-shot"><div className="landing-shot-frame"><img src={marketingAsset("ci-configuration-en.webp")} alt="Bakery CI configuration screen with Jenkins API, Generic Webhook, and GitLab CI integrations" loading="lazy" decoding="async" /></div><figcaption>Jenkins API · Generic Webhook · GitLab CI</figcaption></figure>
      </section>

      <section className="landing-section landing-deliver">
        <div className="landing-deliver-visual" aria-hidden="true">
          <div className="landing-phone"><div className="landing-phone-bar" /><Box /><small>Bakery</small><strong>Ready to install</strong><div className="landing-qr"><QrCode /></div><span>Secure mobile delivery</span></div>
          <div className="landing-artifact"><div><PackageCheck /></div><span><small>Mobile artifact</small><strong>Version · branch · environment</strong><em>Share link available</em></span></div>
        </div>
        <div className="landing-deliver-copy"><span>Artifact to installation</span><h2>A completed build is not a completed delivery.</h2><p>Use version archives, QR codes, secure sharing, and iOS OTA guidance to move every build onto a test device.</p><div><span><QrCode />QR codes and secure sharing</span><span><Smartphone />iOS and Android delivery</span><span><Layers3 />Version and artifact context</span></div></div>
      </section>

      <section className="landing-section landing-security" id="security">
        <div><span>Secure by design</span><h2>Keep credentials server-side.<br />Deliver results to the right people.</h2></div>
        <div className="landing-security-grid"><article><ShieldCheck /><span><strong>Credential protection</strong><small>CI tokens and secrets are never rendered in the UI</small></span></article><article><UsersRound /><span><strong>Role-based access</strong><small>Management capabilities follow account roles</small></span></article><article><BellRing /><span><strong>Feishu notifications</strong><small>Final build status goes directly to the owner</small></span></article><article><Activity /><span><strong>Traceable activity</strong><small>Artifact activity and build history stay together</small></span></article></div>
      </section>

      <section className="landing-final-cta"><div><Box /><span>{BRAND.name}</span></div><h2>Ready to deliver your next build?</h2><p>Mobile application build and delivery platform</p><a href={signInUrl}>Sign in to {BRAND.name}<ArrowRight /></a></section>
    </main>

    <footer className="landing-footer"><a className="landing-brand" href={homeUrl}><Box /><strong>{BRAND.name}</strong></a><span>{BRAND.tagline}</span><small>A4x · Mobile delivery workspace</small></footer>
  </div>;
}
