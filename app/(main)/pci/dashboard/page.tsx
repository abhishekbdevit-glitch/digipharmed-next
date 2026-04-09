'use client';
import { ProgressBar, Button, Chart, DataTable, Column, Tag, Badge } from '../../../../lib/prime';
import React, { useState, useEffect, useContext } from 'react';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { useRouter }     from 'next/navigation';

// ── Seed data ─────────────────────────────────────────────────────────────────
const APPROVAL_QUEUE = [
  { id: 'WF-1042', institution: 'Seven Hills College of Pharmacy',  type: 'B.Pharm — New Affiliation', stage: 'Scrutiny',        age: '2h',  severity: 'success' },
  { id: 'WF-1039', institution: 'JSS College of Pharmacy',         type: 'D.Pharm — Renewal 2026-27', stage: 'Verification',    age: '18h', severity: 'warning' },
  { id: 'WF-1036', institution: 'MAHE Manipal',                    type: 'M.Pharm — Seat Increase',   stage: 'Query Raised',    age: '32h', severity: 'danger'  },
  { id: 'WF-1031', institution: 'Amrita School of Pharmacy',       type: 'Pharm.D — Final Approval',  stage: 'Final Approval',  age: '45h', severity: 'danger'  },
  { id: 'WF-1029', institution: 'Sri Venkateshwara Pharmacy',      type: 'B.Pharm — Renewal',         stage: 'Scrutiny',        age: '1h',  severity: 'success' },
  { id: 'WF-1024', institution: 'SRM College of Pharmacy',         type: 'Pharm.D — Course Addition', stage: 'Verification',    age: '8h',  severity: 'success' },
];

const INSPECTIONS = [
  { institution: 'Seven Hills College',  type: 'Physical', status: 'Assigned',    inspector: 'Raj Kumar',   severity: 'info'    },
  { institution: 'JSS Mysuru',           type: 'Virtual',  status: 'In Progress', inspector: 'Priya S.',    severity: 'warning' },
  { institution: 'MAHE Manipal',         type: 'Physical', status: 'Report Due',  inspector: 'Unassigned',  severity: 'danger'  },
  { institution: 'Amrita Kochi',         type: 'Physical', status: 'Completed',   inspector: 'Anita M.',    severity: 'success' },
  { institution: 'KLE Belagavi',         type: 'Virtual',  status: 'Unassigned',  inspector: '—',           severity: 'danger'  },
];

const COMPLIANCE_DATA = {
  labels: ['Faculty', 'Infrastructure', 'Equipment', 'Library', 'Students'],
  datasets: [
    { label: 'B.Pharm', data: [74, 68, 81, 92, 88], backgroundColor: 'rgba(99,102,241,0.7)',  borderColor: '#6366f1', borderWidth: 1 },
    { label: 'D.Pharm', data: [81, 72, 65, 87, 94], backgroundColor: 'rgba(20,184,166,0.7)', borderColor: '#14b8a6', borderWidth: 1 },
    { label: 'M.Pharm', data: [91, 85, 78, 96, 82], backgroundColor: 'rgba(249,115,22,0.7)', borderColor: '#f97316', borderWidth: 1 },
    { label: 'Pharm.D', data: [63, 54, 59, 74, 77], backgroundColor: 'rgba(239,68,68,0.7)',  borderColor: '#ef4444', borderWidth: 1 },
  ]
};

const WORKFLOW_PIPELINE = [
  { stage: 'Submitted',      count: 342, pct: 100, color: '#6366f1' },
  { stage: 'In Scrutiny',    count: 87,  pct: 25,  color: '#14b8a6' },
  { stage: 'Verification',   count: 54,  pct: 16,  color: '#0ea5e9' },
  { stage: 'Query Raised',   count: 31,  pct: 9,   color: '#f97316' },
  { stage: 'Final Approval', count: 12,  pct: 4,   color: '#22c55e' },
  { stage: 'Rejected',       count: 7,   pct: 2,   color: '#ef4444' },
];

const FEE_COLLECTION = [
  { course: 'B.Pharm',   collected: 180, target: 260, pct: 69 },
  { course: 'D.Pharm',   collected: 90,  target: 110, pct: 82 },
  { course: 'M.Pharm',   collected: 70,  target: 123, pct: 57 },
  { course: 'Pharm.D',   collected: 50,  target: 111, pct: 45 },
  { course: 'Inspector', collected: 30,  target: 34,  pct: 88 },
];

const ALERTS = [
  { icon: 'pi-times-circle',      color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    title: 'SLA Breach',             desc: '3 workflow applications exceeded 72h SLA — escalate immediately',   time: '2 min ago' },
  { icon: 'pi-exclamation-circle',color: '#f97316', bg: 'rgba(249,115,22,0.1)',   title: 'Payment Mismatch',       desc: 'Reconciliation error: ₹48,000 discrepancy in B.Pharm batch',          time: '14 min ago' },
  { icon: 'pi-clock',             color: '#f97316', bg: 'rgba(249,115,22,0.1)',   title: 'SIF Deadline Warning',   desc: 'Submission window closes in 18 days — 1,240 institutions pending',   time: '1 hr ago' },
  { icon: 'pi-ban',               color: '#ef4444', bg: 'rgba(239,68,68,0.1)',    title: 'Unassigned Inspections', desc: '5 inspections pending assignment for >24 hours',                     time: '3 hrs ago' },
  { icon: 'pi-info-circle',       color: '#6366f1', bg: 'rgba(99,102,241,0.1)',   title: 'Master Data Updated',    desc: 'M.Pharm fee revised for session 2026-27 — effective immediately',    time: 'Yesterday' },
];

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({ icon, label, value, sub, color, trend }: {
  icon: string; label: string; value: string; sub: string; color: string; trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <div className="col-12 md:col-6 xl:col-3">
      <div className="card mb-0 h-full">
        <div className="flex align-items-center justify-content-between mb-3">
          <span className="font-medium text-sm text-color-secondary">{label}</span>
          <div className="flex align-items-center justify-content-center border-round w-2rem h-2rem" style={{ backgroundColor: color + '22' }}>
            <i className={`pi ${icon} text-lg`} style={{ color }} />
          </div>
        </div>
        <div className="text-3xl font-bold text-color mb-2">{value}</div>
        <div className="flex align-items-center gap-2">
          {trend && (
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-color-secondary'}`}>
              <i className={`pi pi-arrow-${trend === 'up' ? 'up' : trend === 'down' ? 'down' : 'right'} text-xs mr-1`} />
            </span>
          )}
          <span className="text-color-secondary text-sm">{sub}</span>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
const PCIDashboard = () => {
  const { layoutConfig } = useContext(LayoutContext);
  const router = useRouter();
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color') || '#fff';
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColor }, grid: { display: false } },
        y: { ticks: { color: textColor }, min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
      }
    });
  }, [layoutConfig]);

  const stageSeverity = (stage: string) => {
    if (stage === 'Query Raised' || stage === 'Final Approval') return 'danger';
    if (stage === 'Verification') return 'warning';
    return 'info';
  };

  const ageSeverity = (age: string) => {
    const h = parseInt(age);
    return h >= 30 ? 'danger' : h >= 12 ? 'warning' : 'success';
  };

  return (
    <div className="grid">
      {/* ── KPI Strip ── */}
      <KpiCard icon="pi-building"     label="Total Institutions"  value="8,462"     sub="124 new this session"         color="#6366f1" trend="up"      />
      <KpiCard icon="pi-clock"        label="Pending Approvals"   value="342"       sub="87 SLA breached"              color="#f97316" trend="down"    />
      <KpiCard icon="pi-search"       label="Active Inspections"  value="156"       sub="5 unassigned"                 color="#14b8a6" trend="neutral" />
      <KpiCard icon="pi-check-circle" label="Compliance Rate"     value="71.4%"     sub="↑ 2.1% from last year"        color="#22c55e" trend="up"      />
      <KpiCard icon="pi-indian-rupee" label="Fee Collected"       value="₹4.2 Cr"  sub="Target ₹6.1 Cr · 69%"        color="#0ea5e9" trend="neutral" />
      <KpiCard icon="pi-ticket"       label="Open Grievances"     value="23"        sub="8 SLA breached"               color="#ef4444" trend="down"    />
      <KpiCard icon="pi-graduation-cap" label="Enrolled Students" value="6,12,400"  sub="↑ 18,200 this year"          color="#a855f7" trend="up"      />
      <KpiCard icon="pi-exclamation-triangle" label="Deficiency Rate" value="28.6%" sub="↓ 2.1% improvement"         color="#64748b" trend="up"      />

      {/* ── Row 1: Approval Queue + Inspection Tracker + Alerts ── */}
      <div className="col-12 xl:col-4">
        <div className="card h-full">
          <div className="flex align-items-center justify-content-between mb-3">
            <div className="flex align-items-center gap-2">
              <span className="font-semibold text-lg">Approval Queue</span>
              <Badge value="87 breach" severity="danger" />
            </div>
            <Button label="View all" link className="p-0 text-sm" onClick={() => router.push('/pci/workflow')} />
          </div>
          <div className="flex flex-column gap-2">
            {APPROVAL_QUEUE.map((item) => (
              <div key={item.id} className="flex align-items-start justify-content-between p-2 border-round surface-ground gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{item.institution}</div>
                  <div className="text-color-secondary text-xs mt-1">{item.type}</div>
                  <Tag value={item.stage} severity={stageSeverity(item.stage) as any} className="text-xs mt-1" />
                </div>
                <div className="flex flex-column align-items-end gap-1 flex-shrink-0">
                  <Tag value={item.age} severity={ageSeverity(item.age) as any} className="text-xs" />
                  <div className="flex gap-1">
                    <Button icon="pi pi-check" className="p-button-success p-button-text p-button-sm" style={{ padding: '0.1rem 0.3rem' }} tooltip="Approve" />
                    <Button icon="pi pi-question" className="p-button-warning p-button-text p-button-sm" style={{ padding: '0.1rem 0.3rem' }} tooltip="Query" />
                    <Button icon="pi pi-times" className="p-button-danger p-button-text p-button-sm" style={{ padding: '0.1rem 0.3rem' }} tooltip="Reject" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-4">
        <div className="card h-full">
          <div className="flex align-items-center justify-content-between mb-3">
            <span className="font-semibold text-lg">Inspection Tracker</span>
            <Button label="View all" link className="p-0 text-sm" onClick={() => router.push('/pci/inspection')} />
          </div>
          <DataTable value={INSPECTIONS} className="p-datatable-sm" showGridlines={false}>
            <Column field="institution" header="Institution" style={{ fontSize: '12px' }} />
            <Column field="type" header="Type" body={(r) => <Tag value={r.type} severity="info" className="text-xs" />} style={{ width: '80px' }} />
            <Column field="status" header="Status" body={(r) => <Tag value={r.status} severity={r.severity as any} className="text-xs" />} style={{ width: '100px' }} />
            <Column field="inspector" header="Inspector" style={{ fontSize: '12px', width: '100px' }} />
          </DataTable>
          <div className="mt-3 p-2 border-round surface-ground">
            <div className="flex gap-4 text-sm">
              <div className="text-center"><div className="text-2xl font-bold text-green-500">89</div><div className="text-color-secondary text-xs">Available</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-blue-400">156</div><div className="text-color-secondary text-xs">Assigned</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-red-500">5</div><div className="text-color-secondary text-xs">Unassigned</div></div>
              <div className="text-center"><div className="text-2xl font-bold text-orange-500">15</div><div className="text-color-secondary text-xs">Pending Appr.</div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-4">
        <div className="card h-full">
          <div className="flex align-items-center justify-content-between mb-3">
            <span className="font-semibold text-lg">Alerts & Escalations</span>
            <Badge value={ALERTS.length} severity="danger" />
          </div>
          <div className="flex flex-column gap-2">
            {ALERTS.map((alert, i) => (
              <div key={i} className="flex align-items-start gap-3 p-2 border-round" style={{ background: alert.bg }}>
                <div className="flex align-items-center justify-content-center border-circle w-2rem h-2rem flex-shrink-0" style={{ background: alert.color + '33' }}>
                  <i className={`pi ${alert.icon} text-sm`} style={{ color: alert.color }} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{alert.title}</div>
                  <div className="text-color-secondary text-xs mt-1 line-height-3">{alert.desc}</div>
                  <div className="text-color-secondary text-xs mt-1">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 2: Compliance Heatmap + Fee Collection + Workflow Pipeline ── */}
      <div className="col-12 xl:col-6">
        <div className="card">
          <div className="flex align-items-center justify-content-between mb-3">
            <div>
              <span className="font-semibold text-lg">Compliance by Course & Module</span>
              <div className="text-color-secondary text-xs mt-1">FR-DA-06 · Click any bar to drill down by institution</div>
            </div>
            <Button label="Drill down" link className="p-0 text-sm" onClick={() => router.push('/pci/reports')} />
          </div>
          <div style={{ height: '280px' }}>
            {chartOptions ? <Chart type="bar" data={COMPLIANCE_DATA} options={chartOptions} /> : <div style={{height:'280px',display:'flex',alignItems:'center',justifyContent:'center'}} className="text-color-secondary text-sm">Loading chart…</div>}
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-3">
        <div className="card h-full">
          <div className="flex align-items-center justify-content-between mb-3">
            <span className="font-semibold text-lg">Fee Collection</span>
            <Button label="Finance" link className="p-0 text-sm" onClick={() => router.push('/pci/finance')} />
          </div>
          {FEE_COLLECTION.map((f) => (
            <div key={f.course} className="mb-3">
              <div className="flex justify-content-between text-sm mb-1">
                <span className="font-medium">{f.course}</span>
                <span className="text-color-secondary">₹{f.collected}L / ₹{f.target}L</span>
              </div>
              <ProgressBar value={f.pct} showValue={false} style={{ height: '6px' }} color={f.pct >= 80 ? '#22c55e' : f.pct >= 60 ? '#f97316' : '#ef4444'} />
              <div className="text-right text-xs text-color-secondary mt-1">{f.pct}%</div>
            </div>
          ))}
          <div className="border-top-1 surface-border pt-2 mt-2">
            <div className="flex justify-content-between font-medium"><span>Total Collected</span><span className="text-green-500">₹4.2 Cr</span></div>
            <div className="flex justify-content-between text-sm text-color-secondary mt-1"><span>Target</span><span>₹6.1 Cr</span></div>
            <div className="flex justify-content-between text-sm text-red-500 mt-1"><span>Recon. Pending</span><span>₹48,000</span></div>
          </div>
        </div>
      </div>

      <div className="col-12 xl:col-3">
        <div className="card h-full">
          <div className="flex align-items-center justify-content-between mb-3">
            <span className="font-semibold text-lg">Workflow Pipeline</span>
            <Button label="Manage" link className="p-0 text-sm" onClick={() => router.push('/pci/workflow')} />
          </div>
          <div className="flex flex-column gap-2">
            {WORKFLOW_PIPELINE.map((stage) => (
              <div key={stage.stage} className="flex align-items-center gap-2">
                <span className="text-sm" style={{ width: '100px', flexShrink: 0 }}>{stage.stage}</span>
                <div className="flex-1" style={{ background: 'var(--surface-ground)', borderRadius: '3px', height: '14px', overflow: 'hidden' }}>
                  <div style={{ width: `${stage.pct}%`, background: stage.color, height: '100%', borderRadius: '3px', transition: 'width 0.3s' }} />
                </div>
                <span className="font-bold text-sm" style={{ width: '30px', textAlign: 'right', color: stage.color }}>{stage.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center p-2 border-round surface-ground">
            <div className="text-2xl font-bold text-color">342</div>
            <div className="text-color-secondary text-sm">Total applications</div>
            <div className="text-red-500 text-sm mt-1 font-medium">87 SLA breached</div>
          </div>
        </div>
      </div>

      {/* ── Row 3: Quick Actions ── */}
      <div className="col-12">
        <div className="card">
          <span className="font-semibold text-lg mb-3 block">Quick Actions</span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Assign Inspection',   icon: 'pi-clipboard',    route: '/pci/inspection'   },
              { label: 'Review Institution',  icon: 'pi-building',     route: '/pci/institutions' },
              { label: 'Workflow Engine',     icon: 'pi-arrow-right-arrow-left', route: '/pci/workflow'  },
              { label: 'Generate MIS Report', icon: 'pi-file-export',  route: '/pci/reports'      },
              { label: 'Update Master Data',  icon: 'pi-database',     route: '/pci/master-data'  },
              { label: 'Grievance Queue',     icon: 'pi-ticket',       route: '/pci/grievance'    },
              { label: 'Finance Summary',     icon: 'pi-indian-rupee', route: '/pci/finance'      },
              { label: 'Scrutiny Report',     icon: 'pi-eye',          route: '/pci/scrutiny'     },
            ].map((action) => (
              <Button
                key={action.label}
                label={action.label}
                icon={`pi ${action.icon}`}
                className="p-button-outlined p-button-sm"
                onClick={() => router.push(action.route)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCIDashboard;
