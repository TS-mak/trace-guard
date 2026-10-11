'use client'

import { useState } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Boxes,
  ChevronDown,
  CircleCheck,
  Clock3,
  Code2,
  FileCode2,
  GitBranch,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Network,
  Radar,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  TrendingDown,
  Zap,
} from 'lucide-react'

const findings = [
  { title: 'Hardcoded AWS access key', repo: 'api-gateway / auth.ts', severity: 'Critical', score: '9.8', age: '2h ago', tone: 'critical' },
  { title: 'Prototype pollution in lodash', repo: 'checkout-service / package-lock.json', severity: 'High', score: '8.1', age: '5h ago', tone: 'high' },
  { title: 'Public S3 bucket policy', repo: 'infra / storage.tf', severity: 'High', score: '7.6', age: '1d ago', tone: 'high' },
  { title: 'Weak password hashing', repo: 'identity / passwords.py', severity: 'Medium', score: '5.4', age: '2d ago', tone: 'medium' },
]

const nav = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Findings', icon: Radar, count: '24' },
  { label: 'Architecture', icon: Network },
  { label: 'Attack paths', icon: Zap, count: '3' },
  { label: 'Dependencies', icon: Boxes },
  { label: 'Trends', icon: TrendingDown },
]

function ScoreRing() {
  return (
    <div className="score-ring" aria-label="Security score 78 out of 100">
      <div className="score-ring__inner"><strong>78</strong><span>/ 100</span></div>
    </div>
  )
}

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="brand"><div className="brand-mark"><ShieldCheck /></div><span>trace<span>guard</span></span></div>
        <button className="workspace-switcher"><span className="workspace-avatar">N</span><span className="workspace-copy"><b>Northstar Labs</b><small>Personal workspace</small></span><ChevronDown /></button>
        <div className="nav-label">Workspace</div>
        <nav className="nav-list" aria-label="Primary navigation">
          {nav.map(({ label, icon: Icon, count }) => <button key={label} className={`nav-item ${active === label ? 'nav-item--active' : ''}`} onClick={() => { setActive(label); setMobileOpen(false) }}><Icon /><span>{label}</span>{count && <em>{count}</em>}</button>)}
        </nav>
        <div className="nav-label nav-label--bottom">Manage</div>
        <nav className="nav-list"><button className="nav-item"><SlidersHorizontal /><span>Policies</span></button><button className="nav-item"><Settings2 /><span>Settings</span></button></nav>
        <div className="sidebar-footer"><div className="status-dot" /><div><b>All systems operational</b><small>Last scan completed 8m ago</small></div></div>
      </aside>

      {mobileOpen && <button className="sidebar-overlay" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <section className="main-content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu /></button><div className="breadcrumbs"><span>Workspace</span><span>/</span><b>{active}</b></div><div className="topbar-actions"><button className="icon-button" aria-label="Search"><Search /></button><button className="icon-button" aria-label="Notifications"><Bell /><i /></button><div className="profile"><span className="profile-avatar">JD</span><span className="profile-name">Jordan Davis</span><ChevronDown /></div></div></header>
        <div className="page-wrap">
          <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" /> Security overview</div><h1>Good morning, Jordan</h1><p>Here&apos;s what&apos;s happening across your software estate.</p></div><div className="heading-actions"><button className="button button--secondary"><GitBranch /> Connect repository</button><button className="button button--primary"><Zap /> Run analysis</button></div></div>
          <div className="filter-row"><button className="repo-filter"><span className="repo-icon"><GitBranch /></span><span><small>Repository</small><b>northstar-platform</b></span><ChevronDown /></button><span className="updated"><Clock3 /> Updated 8 minutes ago</span></div>

          <section className="stats-grid" aria-label="Security metrics">
            <article className="metric-card metric-card--score"><div className="metric-top"><span>Security score</span><span className="trend trend--up"><ArrowUpRight /> 6.2%</span></div><div className="score-row"><ScoreRing /><div><strong className="metric-value">Good</strong><p>vs. 72 last week</p></div></div><div className="metric-foot"><span><CircleCheck /> 4 areas improving</span><span>Target 85</span></div></article>
            <article className="metric-card"><div className="metric-top"><span>Open findings</span><span className="trend trend--down"><ArrowDownRight /> 12.5%</span></div><div className="metric-number">24</div><p className="metric-description">6 critical or high severity</p><div className="mini-bars"><i style={{ height: '62%' }} /><i style={{ height: '46%' }} /><i style={{ height: '73%' }} /><i style={{ height: '56%' }} /><i style={{ height: '36%' }} /><i style={{ height: '28%' }} /><i style={{ height: '22%' }} /></div></article>
            <article className="metric-card"><div className="metric-top"><span>Analysis coverage</span><span className="trend trend--up"><ArrowUpRight /> 4.8%</span></div><div className="metric-number">92<span>%</span></div><p className="metric-description">Across 18 services and 4 repos</p><div className="progress"><span style={{ width: '92%' }} /></div><div className="metric-foot"><span>Last 30 days</span><b>+8 files</b></div></article>
            <article className="metric-card"><div className="metric-top"><span>Remediation rate</span><span className="trend trend--up"><ArrowUpRight /> 18.4%</span></div><div className="metric-number">68<span>%</span></div><p className="metric-description">Issues resolved this month</p><div className="remediation-line"><span><b>16</b> resolved</span><span><b>8</b> remaining</span></div><div className="progress progress--violet"><span style={{ width: '68%' }} /></div></article>
          </section>

          <section className="content-grid"><article className="panel findings-panel"><div className="panel-heading"><div><h2>Priority findings</h2><p>Issues that need your attention first</p></div><button className="text-button" onClick={() => setActive('Findings')}>View all findings <ArrowUpRight /></button></div><div className="finding-list">{findings.map((finding) => <div className="finding-row" key={finding.title}><div className={`finding-icon finding-icon--${finding.tone}`}><AlertTriangle /></div><div className="finding-main"><b>{finding.title}</b><span><FileCode2 /> {finding.repo}</span></div><span className={`severity severity--${finding.tone}`}>{finding.severity}</span><span className="finding-score">{finding.score}</span><span className="finding-age">{finding.age}</span><button className="row-arrow" aria-label={`Open ${finding.title}`}><ArrowUpRight /></button></div>)}</div></article>
            <article className="panel activity-panel"><div className="panel-heading"><div><h2>Risk activity</h2><p>Last 30 days</p></div><button className="icon-button"><SlidersHorizontal /></button></div><div className="activity-chart"><div className="chart-y"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 430 150" preserveAspectRatio="none" aria-label="Risk activity trending down"><path className="chart-fill" d="M0,32 C30,38 35,21 62,39 S95,52 120,46 S143,62 172,55 S201,68 224,62 S247,80 273,71 S302,82 326,80 S352,98 377,90 S405,110 430,101 L430,150 L0,150Z" /><path className="chart-line" d="M0,32 C30,38 35,21 62,39 S95,52 120,46 S143,62 172,55 S201,68 224,62 S247,80 273,71 S302,82 326,80 S352,98 377,90 S405,110 430,101" /></svg><div className="chart-x"><span>May 12</span><span>May 19</span><span>May 26</span><span>Jun 02</span><span>Jun 09</span></div></div></div><div className="chart-legend"><span><i className="legend-dot legend-dot--risk" />Risk score <b>−18.4%</b></span><span><i className="legend-dot legend-dot--resolved" />Resolved <b>+12</b></span></div></article></section>

          <section className="lower-grid"><article className="panel architecture-panel"><div className="panel-heading"><div><h2>Architecture health</h2><p>Security signals across your system</p></div><button className="text-button" onClick={() => setActive('Architecture')}>Explore graph <ArrowUpRight /></button></div><div className="architecture-body"><div className="system-map"><div className="map-grid" /><div className="map-node map-node--core"><Code2 /><span>API Gateway</span><small>12 findings</small></div><div className="map-node map-node--db"><Boxes /><span>Data layer</span><small>3 findings</small></div><div className="map-node map-node--service"><TerminalSquare /><span>Auth service</span><small>1 critical</small></div><div className="map-node map-node--cloud"><Network /><span>Cloud infra</span><small>8 findings</small></div><svg className="map-lines" viewBox="0 0 470 185" preserveAspectRatio="none"><path d="M235 92 L95 42 M235 92 L373 42 M235 92 L95 144 M235 92 L373 144" /></svg></div><div className="health-list"><div><span className="health-dot health-dot--good" /><span>Healthy components</span><b>24</b></div><div><span className="health-dot health-dot--warn" /><span>Needs review</span><b>7</b></div><div><span className="health-dot health-dot--bad" /><span>At risk</span><b>3</b></div></div></div></article><article className="panel actions-panel"><div className="panel-heading"><div><h2>Recommended actions</h2><p>High-impact fixes to reduce risk</p></div><Sparkles className="sparkle" /></div><div className="action-list"><div className="action-item"><span className="action-index">01</span><div><b>Rotate exposed AWS credential</b><p>Removes 1 critical finding and 2 attack paths</p></div><ArrowUpRight /></div><div className="action-item"><span className="action-index">02</span><div><b>Upgrade lodash to 4.17.21</b><p>Resolves 3 vulnerabilities across 2 services</p></div><ArrowUpRight /></div><div className="action-item"><span className="action-index">03</span><div><b>Restrict public storage policy</b><p>Protects sensitive data layer from exposure</p></div><ArrowUpRight /></div></div><button className="button button--ghost">View remediation plan <ArrowUpRight /></button></article></section>
          <footer className="page-footer"><span><Activity /> Analysis engine v2.4.1</span><span><LockKeyhole /> Your repository data is encrypted at rest</span><span>Need help? <u>Read the docs</u></span></footer>
        </div>
      </section>
    </main>
  )
}

