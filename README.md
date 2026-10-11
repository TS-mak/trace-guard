Author: Thembisile Makhubu
    
  
# TraceGuard

TraceGuard is a security and risk intelligence dashboard for understanding software security findings in application context. This repository currently contains a polished Next.js frontend prototype covering security posture, priority findings, architecture health, risk activity, remediation recommendations, and trend-oriented workspace navigation.

> **Status:** The current release is a frontend prototype. Repository ingestion, scanner execution, authentication, persistence, background workers, and live APIs are not connected yet.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Requirements](#requirements)
- [Run locally](#run-locally)
- [Build and run production](#build-and-run-production)
- [Project structure](#project-structure)
- [Dashboard interactions](#dashboard-interactions)
- [Design system](#design-system)
- [Roadmap](#roadmap)
- [Production architecture](#production-architecture)
- [Security considerations](#security-considerations)
- [Validation](#validation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Security overview

- Security score with week-over-week comparison.
- Open finding totals and severity summary.
- Analysis coverage across repositories and services.
- Monthly remediation rate and resolved issue counts.
- Recent scan and system status indicators.

### Findings intelligence

- Priority findings with severity, score, repository location, and age.
- Critical, high, and medium severity treatments.
- Finding navigation into the Findings workspace state.
- Recommended high-impact remediation actions.

### Architecture health

- Visual representation of API, data, authentication, and cloud infrastructure components.
- Component-level finding counts.
- Healthy, needs-review, and at-risk summaries.
- Architecture navigation into the Architecture workspace state.

### Risk and posture trends

- Risk activity chart covering the last 30 days.
- Risk reduction and resolved-finding indicators.
- Trend navigation reserved for future historical analysis features.

### Responsive workspace navigation

- Desktop sidebar navigation.
- Mobile navigation drawer with overlay dismissal.
- Workspace, repository, profile, search, notification, and action controls.
- Accessible labels for icon-only controls.

## Technology

- [Next.js 16](https://nextjs.org/) with the App Router.
- [React 19](https://react.dev/).
- TypeScript 5.7.
- Tailwind CSS 4 with project-specific CSS design tokens.
- [Lucide React](https://lucide.dev/) icons.
- shadcn-compatible project tooling.
- Vercel Analytics.

## Requirements

- Node.js 20.9 or newer.
- pnpm 12 or a compatible pnpm 12 installation.
- Git, if cloning the repository.

The package manager is declared in `package.json`:

```json
"packageManager": "pnpm@12.3.4"
```

## Run locally

### 1. Install dependencies

From the project root:

```bash
pnpm install
```

### 2. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Next.js provides hot module replacement during development.

### 3. Stop the server

Press `Ctrl+C` in the terminal running the development server.

## Build and run production

Create an optimized production build:

```bash
pnpm build
```

Start the compiled application locally:

```bash
pnpm start
```

The production server is available at [http://localhost:3000](http://localhost:3000).

The current prototype does not require environment variables. Future integrations should document their required variables here and load them through the deployment environment rather than committing secrets.

## Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Next.js development server. |
| `pnpm build` | Creates an optimized production build. |
| `pnpm start` | Serves the production build locally. |

## Project structure

```text
.
├── app/
│   ├── globals.css       # Global styles, design tokens, layout, and responsive rules
│   ├── layout.tsx        # Root layout and metadata
│   └── page.tsx          # TraceGuard dashboard experience
├── public/               # Static assets
├── package.json          # Scripts and dependencies
├── postcss.config.mjs    # Tailwind/PostCSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

Sample dashboard data currently lives in `app/page.tsx` so the prototype can run without external services. As backend work begins, move these values into typed domain models and server-side data access modules. Do not use client-side persistence for security findings or repository data.

## Dashboard interactions

The current prototype includes these client-side interactions:

- Select sidebar items to update the active workspace breadcrumb.
- Open the mobile sidebar with the menu button.
- Close the mobile sidebar with the overlay or a navigation item.
- Navigate to Findings from the priority findings panel.
- Navigate to Architecture from the architecture health panel.
- Use repository and workspace controls as visual integration points for future selectors.
- Use Run analysis and Connect repository as future workflow entry points.

The current controls do not make network requests or persist changes.

## Design system

TraceGuard uses a dark, high-contrast security operations aesthetic designed for dense technical information.

- Deep navy surfaces establish the workspace background.
- Cyan is reserved for primary actions, active navigation, and positive system signals.
- Violet supports secondary visualizations and remediation progress.
- Amber, orange, and red communicate increasing security severity.
- Rounded panels and restrained borders support scanning-heavy workflows.
- Responsive rules adapt the dashboard from wide desktop workspaces to mobile navigation.

When extending the UI:

- Prefer semantic design tokens already defined in `app/globals.css`.
- Use Lucide icons consistently.
- Make security status distinguishable through text and labels, not color alone.
- Preserve keyboard focus visibility and accessible names.
- Avoid placing real credentials, repository contents, or unmasked secrets in sample data.

## Roadmap

### Phase 1: Product foundation

- Define supported repository types and analysis boundaries.
- Establish the threat model and data-retention policy.
- Add authentication, workspace membership, and authorization.
- Define normalized models for findings, evidence, components, relationships, analyses, and releases.

### Phase 2: Repository analysis

- Add repository connection with least-privilege access.
- Detect languages, frameworks, package managers, services, routes, infrastructure, and configuration.
- Track commits, branches, releases, and analysis coverage.
- Run scanners in isolated workers with CPU, memory, time, filesystem, and network limits.

### Phase 3: Security intelligence

- Integrate dependency, secret, SAST, configuration, and infrastructure scanners.
- Normalize scanner output into a common finding model.
- Preserve source evidence while masking sensitive values.
- Deduplicate findings and track lifecycle states across analyses.

### Phase 4: Architecture intelligence

- Model applications, services, modules, endpoints, dependencies, data stores, and external resources.
- Link findings to directly affected and inferred components.
- Mark relationships as established, inferred, or hypothetical.
- Add an interactive architecture explorer using React Flow, Cytoscape.js, or an equivalent established graph library.

### Phase 5: Contextual risk and remediation

- Calculate explainable risk using severity, exposure, impact, relationships, evidence, and confidence.
- Show the factors behind every prioritization result.
- Group findings into high-impact remediation actions.
- Surface patched versions, compatibility considerations, validation steps, and credential rotation guidance.

### Phase 6: Historical posture

- Compare analyses across commits and releases.
- Identify introduced, resolved, reopened, and reclassified findings.
- Add trend charts, security debt, regression detection, policies, and release gates.
- Distinguish remediation from analysis gaps or scanner-rule changes.

### Phase 7: Advanced intelligence

- Add attack-path hypotheses with evidence and unresolved assumptions.
- Add dependency blast-radius analysis and supply-chain intelligence.
- Add evidence-grounded AI investigation over existing findings and relationships.
- Keep detection and risk calculations deterministic and testable; use AI as an explanatory layer.

## Production architecture

A production implementation should separate ordinary API requests from long-running analysis jobs.

| Area | Suggested approach |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, accessible component library |
| API | Python/FastAPI or a typed Next.js service boundary |
| Database | PostgreSQL for findings, evidence, analyses, relationships, and history |
| Migrations | SQLAlchemy/Alembic or an equivalent migration workflow |
| Workers | Celery with Redis or another durable job system |
| Scanners | Gitleaks, Semgrep, Trivy, dependency advisories, and specialized checks |
| Graph visualization | React Flow or Cytoscape.js |
| Testing | pytest, Vitest, Playwright, and integration/security tests |
| Runtime | Docker with isolated analysis workers |
| CI/CD | GitHub Actions or GitLab CI with security gates |

PostgreSQL can initially store both relational records and graph-like relationships. A dedicated graph database should only be introduced if measured access patterns justify the added operational complexity.

## Security considerations

TraceGuard will process potentially untrusted source code and sensitive security findings. A production implementation should include:

- Least-privilege repository access.
- Encrypted credential storage and secret redaction.
- Isolated analysis workers with resource limits.
- Controlled outbound network access.
- SSRF protection for repository and service integrations.
- Authentication, authorization, and workspace-level data isolation.
- Repository retention and deletion controls.
- Audit logs and analysis failure monitoring.
- Explicit reporting of incomplete security checks.
- Parameterized queries and validated inputs.

Do not execute arbitrary repository code unless required for a documented analysis capability and protected by an appropriate sandboxing strategy.

## Validation

Run the production compilation check:

```bash
pnpm build
```

For a manual UI check:

1. Run `pnpm dev`.
2. Open `http://localhost:3000`.
3. Check the desktop layout at a wide viewport.
4. Resize to a mobile viewport and open and close the navigation drawer.
5. Select Findings and Architecture from the sidebar or panel actions.
6. Confirm that severity labels, charts, metric cards, and footer status remain readable.

As functionality is added, include:

- Unit tests for risk scoring, finding normalization, deduplication, and historical matching.
- Integration tests for repository access, analysis jobs, persistence, and authorization.
- Playwright tests for dashboard navigation, responsive behavior, and investigation flows.
- Controlled vulnerable and secure repositories for scanner regression testing.
- Failure-state tests ensuring incomplete analysis is never presented as complete.

## Deployment

The project is compatible with Vercel deployment:

1. Push the repository to GitHub, or use the existing Vercel project connection.
2. Import the repository into Vercel.
3. Use `pnpm build` as the build command.
4. Deploy the application.

For local installation from a generated v0 project, use the project’s shadcn CLI workflow or GitHub connection so the full project configuration and source files are preserved.

## Contributing

1. Create a focused feature branch.
2. Preserve the existing visual language and responsive behavior.
3. Run `pnpm build` before opening a pull request.
4. Add tests for new logic, especially security-sensitive behavior.
5. Document new integrations, environment variables, retention implications, and limitations.
6. Never commit credentials, real repository contents, unmasked secrets, or sensitive scanner output.

## License

This project is licensed under the [MIT License](LICENSE).

## Current status summary

- Frontend dashboard: implemented.
- Responsive navigation: implemented.
- Sample metrics and visualizations: implemented.
- Live repository ingestion: planned.
- Scanner execution: planned.
- Persistent findings database: planned.
- Authentication and authorization: planned.
- Architecture graph backend: planned.
- Historical posture comparisons: planned.
- Attack-path analysis: planned.
- AI-assisted investigation: planned.

Keep security claims proportional to the implementation: the current dashboard is a frontend prototype, not a security scanner or an assurance of repository safety.

## Quick reference

```bash
pnpm install
pnpm dev
pnpm build
pnpm start
```

TraceGuard’s long-term goal is to help developers understand not only which weaknesses exist in their software, but why they matter, what they may affect, how reliable the evidence is, what remains uncertain, and which actions can most effectively reduce risk.

**TraceGuard - evidence-driven security intelligence for modern software.**
