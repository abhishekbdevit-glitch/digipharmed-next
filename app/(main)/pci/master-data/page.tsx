'use client';
import { DataTable, Column, Button, Tag, InputText, Dialog } from '../../../../lib/prime';
import React, { useState } from 'react';

const ENTITIES = [
  { id:'MD01', icon:'pi-book',         name:'Course / Program Master',   ref:'FR-MD-02', desc:'4 courses with attributes and validity periods', records:4,   lastUpdate:'Jan 2026', version:'v2.4', pending:false },
  { id:'MD02', icon:'pi-calendar',     name:'Session / Academic Year',   ref:'FR-MD-03', desc:'2026-27 Active · Window: 01 Aug – 31 Oct 2026',  records:3,   lastUpdate:'Jan 2026', version:'v1.2', pending:false },
  { id:'MD03', icon:'pi-list',         name:'Subject Master',            ref:'FR-MD-02', desc:'248 subjects across 4 courses, 8 semesters',     records:248, lastUpdate:'Mar 2026', version:'v1.8', pending:false },
  { id:'MD04', icon:'pi-cog',          name:'Equipment Master',          ref:'FR-EQ-01', desc:'Equipment lists per course type — configurable', records:180, lastUpdate:'Feb 2026', version:'v1.6', pending:false },
  { id:'MD05', icon:'pi-file',         name:'Document Master',           ref:'FR-MD-04', desc:'32 doc types · Propagated to all workflows auto',records:32,  lastUpdate:'Apr 2026', version:'v2.1', pending:false },
  { id:'MD06', icon:'pi-indian-rupee', name:'Fee Master',                ref:'FR-MD-03', desc:'8 fee types · Effective date managed per course', records:8,   lastUpdate:'Jan 2026', version:'v2.3', pending:true  },
  { id:'MD07', icon:'pi-map',          name:'State / District Master',   ref:'FR-MD-01', desc:'29 States + UTs · 750 districts · SPC mapping', records:779, lastUpdate:'Dec 2025', version:'v1.0', pending:false },
  { id:'MD08', icon:'pi-arrow-right-arrow-left', name:'Workflow Master', ref:'FR-MD-05', desc:'Configurable approval chains — no code deploy',  records:12,  lastUpdate:'Mar 2026', version:'v1.4', pending:true  },
  { id:'MD09', icon:'pi-check-circle', name:'Validation Rules Master',  ref:'FR-MD-06', desc:'Field-level and business rules — configurable',  records:64,  lastUpdate:'Mar 2026', version:'v1.9', pending:false },
];

const PENDING = [
  { type:'Fee Master',     change:'M.Pharm annual fee: ₹80,000 → ₹90,000 · Effective 2026-27',           by:'Suresh Menon',  status:'Awaiting DS' },
  { type:'Workflow Master',change:'Pharm.D scrutiny: add Sub-Scrutinizer step before Scrutinizer',        by:'Dr. Ramesh K.', status:'Awaiting DS' },
  { type:'Document Master',change:'New requirement: GST Certificate for all institution types',           by:'IT Admin',      status:'Approved'    },
];

const MasterDataPage = () => {
  const [editDlg,    setEditDlg]    = useState(false);
  const [activeEnt,  setActiveEnt]  = useState<any>(null);

  return (
    <div className="grid">
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">9</div><div className="text-color-secondary text-sm mt-1">Master Entities</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">48</div><div className="text-color-secondary text-sm mt-1">Changes This Month</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">3</div><div className="text-color-secondary text-sm mt-1">Pending DS Approval</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">v2.4</div><div className="text-color-secondary text-sm mt-1">Current Version</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-MD-01:</b> All changes versioned — old versions archived, never deleted. <b>FR-MD-07:</b> Full audit trail on every change: user, timestamp, before/after values. Changes require Deputy Secretary approval.</span>
        </div>
      </div>
      <div className="col-12 xl:col-8">
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Active Master Entities</div>
          <DataTable value={ENTITIES} className="p-datatable-sm" showGridlines>
            <Column header="Entity" style={{ minWidth:'220px' }} body={e => (
              <div className="flex align-items-center gap-2">
                <i className={`pi ${e.icon} text-blue-400`} />
                <div>
                  <div className="font-medium text-sm">{e.name}</div>
                  <div className="text-xs text-color-secondary">{e.desc}</div>
                </div>
              </div>
            )} />
            <Column field="ref"        header="FR Ref." className="font-mono text-xs" style={{ width:'90px' }} />
            <Column field="records"    header="Records" className="font-mono text-center" style={{ width:'80px' }} />
            <Column field="lastUpdate" header="Last Updated" className="text-sm" style={{ width:'110px' }} />
            <Column field="version"    header="Version" className="font-mono text-xs" style={{ width:'80px' }} />
            <Column header="Status" style={{ width:'100px' }} body={e => <Tag value={e.pending?'Pending Change':'Current'} severity={e.pending?'warning':'success'} className="text-xs" />} />
            <Column header="Actions" style={{ width:'100px' }} body={e => (
              <div className="flex gap-1">
                <Button icon="pi pi-eye"    className="p-button-sm p-button-text" />
                <Button icon="pi pi-pencil" className="p-button-sm p-button-text" onClick={() => { setActiveEnt(e); setEditDlg(true); }} />
              </div>
            )} />
          </DataTable>
        </div>
      </div>
      <div className="col-12 xl:col-4">
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Pending DS Approval</div>
          {PENDING.map((p, i) => (
            <div key={i} className="p-3 border-bottom-1 surface-border">
              <div className="flex justify-content-between align-items-center mb-1">
                <span className="font-medium text-sm">{p.type}</span>
                <Tag value={p.status} severity={p.status==='Approved'?'success':'warning'} className="text-xs" />
              </div>
              <div className="text-sm text-color-secondary mb-1">{p.change}</div>
              <div className="text-xs text-color-secondary mb-2">By {p.by}</div>
              {p.status !== 'Approved' && (
                <div className="flex gap-2">
                  <Button label="Approve" icon="pi pi-check" className="p-button-success p-button-sm p-button-outlined" />
                  <Button label="Reject" icon="pi pi-times" className="p-button-danger p-button-sm p-button-text" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Dialog header={`Edit — ${activeEnt?.name}`} visible={editDlg} style={{ width:'500px' }} onHide={() => setEditDlg(false)}
        footer={<div className="flex gap-2"><Button label="Submit for DS Approval" icon="pi pi-send" className="p-button-sm" /><Button label="Cancel" className="p-button-text p-button-sm" onClick={() => setEditDlg(false)} /></div>}>
        {activeEnt && (
          <div className="text-color-secondary text-sm">
            <p><b>{activeEnt.ref}:</b> {activeEnt.desc}</p>
            <p className="mt-2">Version: {activeEnt.version} · Last updated: {activeEnt.lastUpdate}</p>
            <p className="mt-2 text-orange-500">All changes create a new version. Previous version is archived, not deleted. A reason for change is mandatory and logged in the audit trail (FR-MD-07).</p>
          </div>
        )}
      </Dialog>
    </div>
  );
};
export default MasterDataPage;