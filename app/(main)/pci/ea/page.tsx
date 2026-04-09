'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, Dialog, Divider } from '../../../../lib/prime';
import React, { useState } from 'react';

const EA_DATA = [
  { id:'EA001', name:'RGUHS Karnataka',       state:'Karnataka',      courses:'B.Pharm, M.Pharm, Pharm.D', institutions:124, examDate:'Apr 2026', resultsSubmitted:true,  deficiencies:0, status:'Approved' },
  { id:'EA002', name:'Dr. NTR University AP',  state:'Andhra Pradesh', courses:'B.Pharm, D.Pharm',           institutions:98,  examDate:'May 2026', resultsSubmitted:true,  deficiencies:2, status:'Approved' },
  { id:'EA003', name:'KUHS Kerala',            state:'Kerala',         courses:'All Courses',                 institutions:87,  examDate:'Apr 2026', resultsSubmitted:false, deficiencies:0, status:'Approved' },
  { id:'EA004', name:'MUHS Maharashtra',       state:'Maharashtra',    courses:'B.Pharm, D.Pharm',           institutions:142, examDate:'Jun 2026', resultsSubmitted:false, deficiencies:4, status:'Approved' },
  { id:'EA005', name:'KNR University TS',      state:'Telangana',      courses:'B.Pharm, D.Pharm, M.Pharm', institutions:76,  examDate:'May 2026', resultsSubmitted:false, deficiencies:0, status:'Pending'  },
];

const APPEALS = [
  { id:'APP-018', ea:'MUHS Maharashtra',  against:'Deficiency Notice — Lab Equipment',  filed:'Apr 3, 2026',  status:'Under Review'         },
  { id:'APP-014', ea:'RGUHS Karnataka',   against:'Exam Schedule Rejection',            filed:'Mar 28, 2026', status:'PCI Response Sent'     },
  { id:'APP-009', ea:'Dr. NTR AP',        against:'Result Verification Delay',          filed:'Mar 15, 2026', status:'Resolved'              },
];

const EAPage = () => {
  const [tab,          setTab]          = useState<'registry'|'appeals'|'results'>('registry');
  const [globalFilter, setGlobalFilter] = useState('');
  const [detailDlg,    setDetailDlg]    = useState(false);
  const [activeEA,     setActiveEA]     = useState<any>(null);

  const filtered = EA_DATA.filter(e => !globalFilter || e.name.toLowerCase().includes(globalFilter.toLowerCase()));

  return (
    <div className="grid">
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">140</div><div className="text-color-secondary text-sm mt-1">Approved EAs</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">8</div><div className="text-color-secondary text-sm mt-1">Pending Registration</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">24</div><div className="text-color-secondary text-sm mt-1">Active Deficiencies</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">6</div><div className="text-color-secondary text-sm mt-1">Open Appeals</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-EA-01:</b> EA registration with PCI approval workflow. <b>FR-EA-03:</b> Deficiency tracking with submission deadlines. <b>FR-EA-04:</b> Appeal workflow — raise, track, resolve against PCI decisions. <b>FR-EA-05:</b> Result handling — submission, verification, publication.</span>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="flex flex-wrap gap-2 mb-3">
            <Button label="EA Registry" icon="pi pi-list" className={`p-button-sm ${tab==='registry'?'':' p-button-outlined'}`} onClick={() => setTab('registry')} />
            <Button label="Appeal Management" icon="pi pi-comments" className={`p-button-sm ${tab==='appeals'?'':' p-button-outlined'}`} onClick={() => setTab('appeals')} />
            <Button label="Result Handling" icon="pi pi-chart-bar" className={`p-button-sm ${tab==='results'?'':' p-button-outlined'}`} onClick={() => setTab('results')} />
            <div className="ml-auto flex gap-2">
              <Button label="Register EA" icon="pi pi-plus" className="p-button-sm" />
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search EAs…" className="p-inputtext-sm" style={{ width:'180px' }} />
              </span>
            </div>
          </div>

          {tab === 'registry' && (
            <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10}>
              <Column header="Examining Authority" style={{ minWidth:'180px' }} body={e => <div><div className="font-medium">{e.name}</div><div className="text-xs text-color-secondary">{e.state}</div></div>} />
              <Column field="courses"      header="Courses" className="text-sm" style={{ width:'200px' }} />
              <Column field="institutions" header="Institutions" className="font-mono text-center" style={{ width:'110px' }} />
              <Column field="examDate"     header="Exam Schedule" className="text-sm" style={{ width:'120px' }} />
              <Column header="Results" style={{ width:'100px' }} body={e => <Tag value={e.resultsSubmitted?'Submitted':'Pending'} severity={e.resultsSubmitted?'success':'warning'} className="text-xs" />} />
              <Column header="Deficiencies" style={{ width:'110px' }} body={e => <Tag value={e.deficiencies>0?`${e.deficiencies} open`:'None'} severity={e.deficiencies>0?'danger':'success'} className="text-xs" />} />
              <Column header="Status" style={{ width:'100px' }} body={e => <Tag value={e.status} severity={e.status==='Approved'?'success':'warning'} className="text-xs" />} />
              <Column header="Actions" style={{ width:'110px' }} body={e => (
                <div className="flex gap-1">
                  <Button icon="pi pi-eye"    className="p-button-sm p-button-text" onClick={() => { setActiveEA(e); setDetailDlg(true); }} />
                  <Button icon="pi pi-check"  className="p-button-sm p-button-success p-button-text" />
                </div>
              )} />
            </DataTable>
          )}

          {tab === 'appeals' && (
            <DataTable value={APPEALS} className="p-datatable-sm" showGridlines>
              <Column field="id"      header="Appeal ID"  className="font-mono text-xs" style={{ width:'100px' }} />
              <Column field="ea"      header="EA"         className="font-medium text-sm" style={{ minWidth:'160px' }} />
              <Column field="against" header="Against Decision" className="text-sm" style={{ minWidth:'200px' }} />
              <Column field="filed"   header="Filed Date"  className="text-sm" style={{ width:'130px' }} />
              <Column header="Status" style={{ width:'160px' }} body={a => <Tag value={a.status} severity={a.status==='Resolved'?'success':a.status==='PCI Response Sent'?'info':'warning'} className="text-xs" />} />
              <Column header="Actions" style={{ width:'110px' }} body={() => (
                <div className="flex gap-1">
                  <Button icon="pi pi-eye" className="p-button-sm p-button-text" />
                  <Button label="Respond" className="p-button-sm p-button-outlined" style={{ padding:'0.2rem 0.5rem', fontSize:'11px' }} />
                </div>
              )} />
            </DataTable>
          )}

          {tab === 'results' && (
            <DataTable value={EA_DATA} className="p-datatable-sm" showGridlines>
              <Column field="name"      header="EA"         className="font-medium text-sm" style={{ minWidth:'180px' }} />
              <Column field="state"     header="State"      className="text-sm" style={{ width:'160px' }} />
              <Column field="courses"   header="Courses"    className="text-sm" style={{ width:'200px' }} />
              <Column field="examDate"  header="Exam Date"  className="text-sm" style={{ width:'120px' }} />
              <Column header="Results Status" style={{ width:'150px' }} body={e => (
                <Tag value={e.resultsSubmitted?'Verified & Published':'Pending Submission'} severity={e.resultsSubmitted?'success':'warning'} className="text-xs" />
              )} />
              <Column header="Actions" style={{ width:'110px' }} body={e => (
                <div className="flex gap-1">
                  {!e.resultsSubmitted && <Button label="Request" className="p-button-sm p-button-outlined" style={{ padding:'0.2rem 0.5rem', fontSize:'11px' }} />}
                  <Button icon="pi pi-eye" className="p-button-sm p-button-text" />
                </div>
              )} />
            </DataTable>
          )}
        </div>
      </div>
      <Dialog header={activeEA?.name} visible={detailDlg} style={{ width:'500px' }} onHide={() => setDetailDlg(false)}>
        {activeEA && (
          <div className="grid">
            <div className="col-6"><div className="text-color-secondary text-sm">State</div><div className="font-medium">{activeEA.state}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Status</div><Tag value={activeEA.status} severity={activeEA.status==='Approved'?'success':'warning'} className="mt-1" /></div>
            <div className="col-12"><div className="text-color-secondary text-sm">Courses</div><div className="font-medium">{activeEA.courses}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Affiliated Institutions</div><div className="font-mono font-bold text-xl">{activeEA.institutions}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Exam Schedule</div><div className="font-medium">{activeEA.examDate}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Results Submitted</div><Tag value={activeEA.resultsSubmitted?'Yes':'Pending'} severity={activeEA.resultsSubmitted?'success':'warning'} className="mt-1" /></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Open Deficiencies</div><Tag value={activeEA.deficiencies>0?`${activeEA.deficiencies} open`:'None'} severity={activeEA.deficiencies>0?'danger':'success'} className="mt-1" /></div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
export default EAPage;