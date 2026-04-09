'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, Toast, ProgressBar } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const DATA = [
  { id:'INS-001', name:'Raj Kumar',        qual:'B.Pharm, M.Pharm, Ph.D', spec:'Pharmaceutics, Infra', zone:'North', inspections:48, rating:4.6, timeliness:98, status:'Available'   },
  { id:'INS-002', name:'Priya Sharma',     qual:'B.Pharm, D.Pharm',       spec:'All Courses',          zone:'South', inspections:32, rating:4.3, timeliness:92, status:'On Assignment'},
  { id:'INS-003', name:'Anita Mehta',      qual:'M.Pharm, Pharm.D',       spec:'Clinical, Hospital',   zone:'West',  inspections:91, rating:4.8, timeliness:99, status:'Available'   },
  { id:'INS-004', name:'Dr. Suresh Nair',  qual:'Pharm.D',                spec:'Hospital Affiliation', zone:'South', inspections:27, rating:3.9, timeliness:88, status:'On Leave'     },
  { id:'INS-005', name:'Dr. Mohan Rao',    qual:'B.Pharm, M.Pharm',       spec:'Infra, Equipment',     zone:'East',  inspections:55, rating:4.5, timeliness:94, status:'Available'   },
  { id:'INS-006', name:'Kavitha Krishnan', qual:'M.Pharm, Pharm.D',       spec:'Library, Education',   zone:'South', inspections:18, rating:4.1, timeliness:91, status:'Pending Approval'},
];

const statusSev = (s: string) => s==='Available'?'success':s==='On Assignment'?'info':s==='Pending Approval'?'warning':'secondary';

const InspectorMgmtPage = () => {
  const toast = useRef<any>(null);
  const [zoneFilter, setZoneFilter] = useState('All Zones');
  const [statusFilter, setStatusFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');

  const filtered = DATA.filter(r => {
    const mz = zoneFilter==='All Zones' || r.zone===zoneFilter;
    const ms = statusFilter==='All' || r.status===statusFilter;
    const mg = !globalFilter || r.name.toLowerCase().includes(globalFilter.toLowerCase());
    return mz && ms && mg;
  });

  const ratingBody = (row: any) => (
    <div>
      <span className="font-bold">★ {row.rating}</span>
      <div className="text-xs text-color-secondary mt-1">{row.timeliness}% timeliness</div>
    </div>
  );

  const actBody = (row: any) => (
    <div className="flex gap-1">
      <Button icon="pi pi-eye" tooltip="Profile" className="p-button-text p-button-sm"/>
      <Button icon="pi pi-map-marker" tooltip="Assign to Inspection" className="p-button-text p-button-sm" disabled={row.status!=='Available'}/>
      {row.status==='Pending Approval' && <Button icon="pi pi-check" tooltip="Approve" className="p-button-success p-button-text p-button-sm" onClick={()=>toast.current?.show({severity:'success',summary:'Inspector Approved',detail:row.name,life:2000})}/>}
    </div>
  );

  return (
    <div className="grid">
      <Toast ref={toast}/>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">284</div><div className="text-color-secondary text-sm mt-1">Total Inspectors</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">15</div><div className="text-color-secondary text-sm mt-1">Pending Approval</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">89</div><div className="text-color-secondary text-sm mt-1">Available Now</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">4.2</div><div className="text-color-secondary text-sm mt-1">Avg. Performance Rating</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-IN-02:</b> Approval routing with mandatory qualification checks. <b>FR-IN-04:</b> Performance tracking — inspection history, report quality, timeliness metrics per inspector.</span></div></div>
      <div className="col-12">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border align-items-center justify-content-between">
            <Button label="Add Inspector" icon="pi pi-plus" className="p-button-sm"/>
            <div className="flex gap-2 flex-wrap">
              <Dropdown value={zoneFilter} options={['All Zones','North','South','East','West']} onChange={e=>setZoneFilter(e.value)} className="text-sm" style={{width:'130px'}}/>
              <Dropdown value={statusFilter} options={['All','Available','On Assignment','On Leave','Pending Approval']} onChange={e=>setStatusFilter(e.value)} className="text-sm" style={{width:'160px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Search…" className="p-inputtext-sm" style={{width:'160px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10}>
            <Column field="id" header="ID" className="font-mono text-xs" style={{width:'80px'}}/>
            <Column field="name" header="Inspector" body={row=><div className="font-medium">{row.name}</div>} style={{minWidth:'150px'}}/>
            <Column field="qual" header="Qualification" className="text-xs text-color-secondary" style={{minWidth:'160px'}}/>
            <Column field="spec" header="Specialisation" className="text-sm" style={{minWidth:'150px'}}/>
            <Column field="zone" header="Zone" body={row=><Tag value={row.zone} severity="info" className="text-xs"/>} style={{width:'80px'}}/>
            <Column field="inspections" header="Done" className="font-mono font-bold" style={{width:'60px'}}/>
            <Column header="Rating & Timeliness" body={ratingBody} style={{width:'140px'}}/>
            <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'130px'}}/>
            <Column header="Actions" body={actBody} style={{width:'120px'}}/>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default InspectorMgmtPage;
