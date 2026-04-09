'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown } from '../../../../lib/prime';
import React, { useState } from 'react';

const DATA = [
  { ts:'2026-04-08 14:23:11', user:'Dr. Ramesh Kumar', role:'Registrar',         action:'Approved',    module:'Workflow',    entity:'WF-2026-1024', detail:'Final approval — SRM Chennai Pharm.D · All compliant', ip:'192.168.1.42' },
  { ts:'2026-04-08 14:18:05', user:'Dr. Kavitha Nair', role:'Scrutinizer',       action:'Query Raised',module:'Workflow',    entity:'WF-2026-1036', detail:'Faculty deficiency — MAHE · 2 departments short',       ip:'10.0.0.21'    },
  { ts:'2026-04-08 13:55:42', user:'Suresh Menon',     role:'Accts-Maker',       action:'Updated',     module:'Finance',     entity:'TXN-2026-9810',detail:'Reconciliation note added — Amrita mismatch ₹48k',     ip:'10.0.0.34'    },
  { ts:'2026-04-08 13:41:20', user:'Anand Kumar',      role:'IT Admin',           action:'Modified',    module:'Master Data', entity:'FEE-001',      detail:'M.Pharm fee: ₹80,000 → ₹90,000 · New version v2.4',  ip:'192.168.1.10' },
  { ts:'2026-04-08 13:22:08', user:'Unknown',          role:'—',                  action:'Failed Login', module:'Auth',        entity:'—',            detail:'3 consecutive failed attempts — account locked',         ip:'103.21.44.12' },
  { ts:'2026-04-08 12:58:00', user:'Priya Sharma',     role:'Inspector Approver',action:'Assigned',    module:'Inspection',  entity:'INS-2026-0156',detail:'Raj Kumar → Seven Hills · No conflict detected',        ip:'10.0.0.15'    },
  { ts:'2026-04-08 12:30:00', user:'Dr. Kavitha Nair', role:'Scrutinizer',       action:'Approved',    module:'Workflow',    entity:'WF-2026-1029',detail:'Scrutiny complete — KLE forwarded to Verifier',          ip:'10.0.0.21'    },
];
const actionSev = (a: string) => a==='Approved'||a==='Assigned'?'success':a==='Failed Login'?'danger':a==='Query Raised'?'warning':'info';
const AuditPage = () => {
  const [moduleFilter, setModuleFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');
  const filtered = DATA.filter(r => {
    const mm = moduleFilter==='All' || r.module===moduleFilter;
    const mg = !globalFilter || r.user.toLowerCase().includes(globalFilter.toLowerCase()) || r.action.toLowerCase().includes(globalFilter.toLowerCase());
    return mm && mg;
  });
  return (
    <div className="grid">
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">1,42,800</div><div className="text-color-secondary text-sm mt-1">Log Entries (90 days)</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">3</div><div className="text-color-secondary text-sm mt-1">Security Events</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">48</div><div className="text-color-secondary text-sm mt-1">Data Changes</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">284</div><div className="text-color-secondary text-sm mt-1">Approval Actions</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-AU-01:</b> Immutable audit trail — no UPDATE or DELETE on log records (FR-SEC-07). <b>FR-AU-05:</b> Approval logs with approver identity, timestamp, and remarks are immutable after creation.</span></div></div>
      <div className="col-12">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border justify-content-between">
            <Button label="Export Audit Log" icon="pi pi-file-export" className="p-button-outlined p-button-sm"/>
            <div className="flex gap-2">
              <Dropdown value={moduleFilter} options={['All','Workflow','Finance','Master Data','Inspection','Auth']} onChange={e=>setModuleFilter(e.value)} className="text-sm" style={{width:'150px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="User, action…" className="p-inputtext-sm" style={{width:'180px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10} rowClassName={row=>row.action==='Failed Login'?'bg-red-50':''}>
            <Column field="ts" header="Timestamp" className="font-mono text-xs" style={{width:'160px'}}/>
            <Column field="user" header="User" className="font-medium text-sm" style={{width:'150px'}}/>
            <Column field="role" header="Role" body={row=><Tag value={row.role} severity="info" className="text-xs"/>} style={{width:'130px'}}/>
            <Column field="action" header="Action" body={row=><Tag value={row.action} severity={actionSev(row.action) as any} className="text-xs"/>} style={{width:'110px'}}/>
            <Column field="module" header="Module" className="text-sm" style={{width:'110px'}}/>
            <Column field="entity" header="Record ID" className="font-mono text-xs" style={{width:'130px'}}/>
            <Column field="detail" header="Details" className="text-xs text-color-secondary" style={{minWidth:'200px'}}/>
            <Column field="ip" header="IP Address" className="font-mono text-xs" style={{width:'120px'}}/>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default AuditPage;
