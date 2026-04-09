'use client';
import { Button, Tag, Dropdown, Toast } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const REPORTS = [
  { title:'★ Student Reports',         desc:'Enrollment by course, institution, state, year · Pass/fail analytics · Lateral entry stats', ref:'FR-RP-01', category:'Academic' },
  { title:'★ Institution Reports',     desc:'Compliance status, approval history, inspection summary · State-wise drill-down',             ref:'FR-RP-01', category:'Institutional' },
  { title:'★ SIF Reports',             desc:'Submission status, compliance scores, deficiency summary per session',                        ref:'FR-RP-01', category:'Compliance' },
  { title:'★ Inspection Reports',      desc:'Counts, deficiencies, inspector performance, pending actions',                                ref:'FR-RP-01', category:'Operations' },
  { title:'★ Payment Reports',         desc:'Collection summary, outstanding dues, course-wise breakdown, reconciliation',                  ref:'FR-RP-01', category:'Finance' },
  { title:'★ Decision Reports',        desc:'Tamper-proof PCI decisions — digitally signed · Approval/rejection with remarks (FR-RP-04)', ref:'FR-RP-04', category:'Governance' },
  { title:'EA Reports',               desc:'Examining authority affiliation, result submissions, appeal outcomes',                         ref:'FR-RP-01', category:'Academic' },
  { title:'Inspector Performance',    desc:'Inspections assigned vs completed, rating trends, SLA compliance per inspector',               ref:'FR-RP-01', category:'Operations' },
  { title:'Workflow Pipeline',         desc:'Applications at each stage · Ageing analysis · SLA breach trends',                            ref:'FR-RP-01', category:'Operations' },
  { title:'Grievance Resolution MIS', desc:'Ticket volume by category, resolution time, SLA compliance rate',                             ref:'FR-RP-01', category:'Governance' },
];

const TRENDS = [
  { metric:'B.Pharm Compliance Rate',     y23:'64%', y24:'68%', y25:'71%' },
  { metric:'Inspection Completion Rate',  y23:'78%', y24:'84%', y25:'89%' },
  { metric:'SIF Submission Rate',         y23:'71%', y24:'79%', y25:'86%' },
  { metric:'Grievance Resolution Rate',   y23:'82%', y24:'88%', y25:'91%' },
];

const ReportsPage = () => {
  const toast = useRef<any>(null);
  const [module, setModule] = useState('Institution Management');
  const [exportFmt, setExportFmt] = useState('Excel (XLSX)');
  const [catFilter, setCatFilter] = useState('All');

  const filtered = REPORTS.filter(r => catFilter==='All' || r.category===catFilter);

  return (
    <div className="grid">
      <Toast ref={toast}/>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-RP-03:</b> All reports exportable in Excel, PDF, and CSV. <b>FR-RP-04:</b> Decision Reports are tamper-proof with digital signatures. <b>FR-RP-05:</b> Trend data for evidence-based policy decisions for PCI leadership.</span></div></div>
      <div className="col-12 md:col-7">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border align-items-center justify-content-between">
            <span className="font-semibold">Pre-built MIS Reports</span>
            <div className="flex gap-2">
              {['All','Academic','Compliance','Operations','Finance','Governance'].map(c=><Button key={c} label={c} className={catFilter===c?'p-button-sm':'p-button-outlined p-button-sm'} onClick={()=>setCatFilter(c)}/>)}
            </div>
          </div>
          {filtered.map(r=>(
            <div key={r.title} className="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border" onMouseEnter={e=>(e.currentTarget.style.background='var(--surface-ground)')} onMouseLeave={e=>(e.currentTarget.style.background='')}>
              <div>
                <div className="flex align-items-center gap-2">
                  <span className="font-medium text-sm">{r.title}</span>
                  <Tag value={r.ref} severity="secondary" className="text-xs"/>
                  <Tag value={r.category} severity="info" className="text-xs"/>
                </div>
                <div className="text-color-secondary text-xs mt-1">{r.desc}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0 ml-3">
                <Button label="Preview" className="p-button-text p-button-sm"/>
                <Button label="Export" icon="pi pi-file-export" className="p-button-outlined p-button-sm" onClick={()=>toast.current?.show({severity:'success',summary:'Export Started',detail:`${r.title} — generating ${exportFmt}`,life:2000})}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 md:col-5">
        <div className="card mb-3">
          <div className="font-semibold mb-3">Custom Report Builder</div>
          <div className="field mb-3"><label className="font-medium text-sm block mb-1">Module</label><Dropdown value={module} options={['Institution Management','Student Management','Faculty Compliance','Infrastructure','Equipment','Library','Finance & Payments','Inspections','Grievance Management']} onChange={e=>setModule(e.value)} className="w-full text-sm"/></div>
          <div className="grid mb-3">
            <div className="col-6 field"><label className="font-medium text-sm block mb-1">From Date</label><input type="date" defaultValue="2026-04-01" className="p-inputtext p-component w-full text-sm" style={{padding:'0.5rem'}}/></div>
            <div className="col-6 field"><label className="font-medium text-sm block mb-1">To Date</label><input type="date" defaultValue="2026-04-08" className="p-inputtext p-component w-full text-sm" style={{padding:'0.5rem'}}/></div>
          </div>
          <div className="field mb-3"><label className="font-medium text-sm block mb-1">Export Format (FR-RP-03)</label><Dropdown value={exportFmt} options={['Excel (XLSX)','PDF','CSV']} onChange={e=>setExportFmt(e.value)} className="w-full text-sm"/></div>
          <Button label="Generate Report" icon="pi pi-cog" className="w-full" onClick={()=>toast.current?.show({severity:'info',summary:'Generating…',detail:`${module} · ${exportFmt}`,life:3000})}/>
        </div>
        <div className="card">
          <div className="font-semibold mb-3">Trend Analytics (FR-RP-05)</div>
          {TRENDS.map(t=>(
            <div key={t.metric} className="mb-3 border-bottom-1 surface-border pb-2">
              <div className="font-medium text-sm mb-1">{t.metric}</div>
              <div className="flex gap-3 text-sm text-color-secondary"><span>{t.y23}</span><span>→ {t.y24}</span><span className="text-green-400 font-bold">→ {t.y25}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ReportsPage;
