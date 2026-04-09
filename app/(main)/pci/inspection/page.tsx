'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, Toast, Dialog } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const DATA = [
  { id:'INS-156', institution:'Seven Hills College of Pharmacy', type:'Physical', course:'B.Pharm', inspector:'Raj Kumar',   observer:'—',         scheduled:'Apr 12, 2026', status:'Assigned',     deficiencies:0 },
  { id:'INS-155', institution:'JSS College of Pharmacy',         type:'Virtual', course:'D.Pharm', inspector:'Priya S.',    observer:'Anand V.',  scheduled:'Apr 10, 2026', status:'In Progress',  deficiencies:0 },
  { id:'INS-154', institution:'MAHE Manipal',                    type:'Physical', course:'All',    inspector:'Anita Mehta', observer:'—',         scheduled:'Apr 8, 2026',  status:'Report Due',   deficiencies:0 },
  { id:'INS-153', institution:'KLE Belagavi',                    type:'Virtual', course:'B.Pharm', inspector:'Unassigned', observer:'—',         scheduled:'—',             status:'Unassigned',   deficiencies:0 },
  { id:'INS-152', institution:'Amrita Kochi',                    type:'Physical', course:'Pharm.D',inspector:'Suresh R.',  observer:'—',         scheduled:'Apr 5, 2026',  status:'Completed',    deficiencies:3 },
  { id:'INS-151', institution:'SRM Chennai',                     type:'Virtual', course:'M.Pharm', inspector:'Kavitha N.', observer:'—',         scheduled:'Apr 15, 2026', status:'Scheduled',    deficiencies:0 },
  { id:'INS-150', institution:'Poona College of Pharmacy',       type:'Physical', course:'B.Pharm', inspector:'Mohan Rao',  observer:'—',         scheduled:'Apr 18, 2026', status:'Scheduled',    deficiencies:0 },
];

const statusSev = (s: string) => s==='Completed'?'success':s==='Assigned'||s==='Scheduled'?'info':s==='In Progress'?'warning':'danger';

const InspectionPage = () => {
  const toast = useRef<any>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');
  const [assignDialog, setAssignDialog] = useState(false);
  const [activeRow, setActiveRow] = useState<any>(null);

  const filtered = DATA.filter(r => {
    const ms = statusFilter === 'All' || r.status === statusFilter;
    const mg = !globalFilter || r.institution.toLowerCase().includes(globalFilter.toLowerCase());
    return ms && mg;
  });

  const actBody = (row: any) => (
    <div className="flex gap-1">
      <Button icon="pi pi-eye" tooltip="View Report" className="p-button-text p-button-sm"/>
      {row.status==='Unassigned'
        ? <Button icon="pi pi-user-plus" tooltip="Assign Inspector" className="p-button-primary p-button-sm" onClick={()=>{setActiveRow(row);setAssignDialog(true);}}/>
        : <Button icon="pi pi-refresh" tooltip="Reassign" className="p-button-text p-button-sm"/>}
      {row.deficiencies>0 && <Button icon="pi pi-exclamation-triangle" tooltip={`${row.deficiencies} deficiencies`} className="p-button-warning p-button-text p-button-sm"/>}
    </div>
  );

  return (
    <div className="grid">
      <Toast ref={toast}/>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">156</div><div className="text-color-secondary text-sm mt-1">Active Inspections</div><div className="text-xs text-color-secondary mt-1">89 physical · 67 virtual</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">5</div><div className="text-color-secondary text-sm mt-1">Unassigned</div><div className="text-xs text-red-400 mt-1">Action required — FR-IS-02</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">284</div><div className="text-color-secondary text-sm mt-1">Inspector Pool</div><div className="text-xs text-color-secondary mt-1">89 available now</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">42</div><div className="text-color-secondary text-sm mt-1">Completed (month)</div><div className="text-xs text-color-secondary mt-1">18 deficiency reports raised</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-IS-02:</b> Assignment with conflict-of-interest checks. <b>FR-IS-04:</b> Digital reports integrated from Mobile App. <b>FR-IS-07:</b> Observer assignment with role-specific data access.</span></div></div>
      <div className="col-12">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border align-items-center justify-content-between">
            <div className="flex gap-2">
              <Button label="Schedule Inspection" icon="pi pi-plus" className="p-button-sm"/>
              <Button label="Assign All Unassigned" icon="pi pi-user-plus" className="p-button-outlined p-button-sm"/>
            </div>
            <div className="flex gap-2">
              <Dropdown value={statusFilter} options={['All','Unassigned','Assigned','In Progress','Report Due','Completed','Scheduled']} onChange={e=>setStatusFilter(e.value)} className="text-sm" style={{width:'150px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Search…" className="p-inputtext-sm" style={{width:'180px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10} rowClassName={row=>row.status==='Unassigned'||row.status==='Report Due'?'bg-red-50':''}>
            <Column field="id" header="Insp. ID" className="font-mono text-xs" style={{width:'90px'}}/>
            <Column field="institution" header="Institution" style={{minWidth:'200px'}} body={row=><div className="font-medium text-sm">{row.institution}</div>}/>
            <Column field="type" header="Type" body={row=><Tag value={row.type} severity="info" className="text-xs"/>} style={{width:'80px'}}/>
            <Column field="course" header="Course" body={row=><Tag value={row.course} severity="info" className="text-xs"/>} style={{width:'90px'}}/>
            <Column field="inspector" header="Inspector" className="text-sm" style={{width:'120px'}} body={row=>row.inspector==='Unassigned'?<Tag value="Unassigned" severity="danger" className="text-xs"/>:<span>{row.inspector}</span>}/>
            <Column field="observer" header="Observer" className="text-sm text-color-secondary" style={{width:'90px'}}/>
            <Column field="scheduled" header="Scheduled" className="text-sm" style={{width:'110px'}}/>
            <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'100px'}}/>
            <Column header="Actions" body={actBody} style={{width:'140px'}}/>
          </DataTable>
        </div>
      </div>
      <Dialog header={`Assign Inspector — ${activeRow?.institution}`} visible={assignDialog} style={{width:'440px'}} onHide={()=>setAssignDialog(false)}
        footer={<div className="flex gap-2"><Button label="Assign" icon="pi pi-check" className="p-button-primary" onClick={()=>{toast.current?.show({severity:'success',summary:'Inspector Assigned',detail:`${activeRow?.institution} · Conflict-of-interest check passed`,life:3000});setAssignDialog(false);}}/><Button label="Cancel" className="p-button-text" onClick={()=>setAssignDialog(false)}/></div>}>
        <div className="field mb-3"><label className="font-medium text-sm block mb-2">Select Inspector</label>
          <Dropdown options={['Raj Kumar (North · Available)','Priya Sharma (South · Available)','Anita Mehta (West · Available)','Mohan Rao (East · Available)']} placeholder="Choose inspector…" className="w-full"/></div>
        <div className="text-xs text-color-secondary"><i className="pi pi-shield mr-1"/>Conflict-of-interest validation will run automatically (FR-IS-02)</div>
      </Dialog>
    </div>
  );
};
export default InspectionPage;
