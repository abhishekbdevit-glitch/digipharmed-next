'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, Toast, ProgressBar, Dialog, InputTextarea } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const APPS = [
  { id:'WF-1042', institution:'Seven Hills College of Pharmacy', appType:'New Affiliation', course:'B.Pharm', stage:'Scrutiny',       assignedTo:'Dr. Kavitha N.', ageHours:2,  slaHours:48 },
  { id:'WF-1039', institution:'JSS College of Pharmacy',         appType:'Annual Renewal',  course:'D.Pharm', stage:'Verification',    assignedTo:'Priya S.',       ageHours:18, slaHours:24 },
  { id:'WF-1036', institution:'MAHE Manipal',                    appType:'Seat Increase',   course:'M.Pharm', stage:'Query Raised',    assignedTo:'—',              ageHours:32, slaHours:24 },
  { id:'WF-1031', institution:'Amrita School of Pharmacy',       appType:'New Affiliation', course:'Pharm.D', stage:'Final Approval',  assignedTo:'Registrar',      ageHours:45, slaHours:12 },
  { id:'WF-1029', institution:'KLE University',                  appType:'Annual Renewal',  course:'B.Pharm', stage:'Scrutiny',        assignedTo:'Unassigned',     ageHours:1,  slaHours:48 },
  { id:'WF-1024', institution:'SRM College of Pharmacy',         appType:'Course Addition', course:'Pharm.D', stage:'Verification',    assignedTo:'Raj Kumar',      ageHours:8,  slaHours:24 },
  { id:'WF-1019', institution:'Saveetha Pharmacy',               appType:'Annual Renewal',  course:'B.Pharm', stage:'Resubmitted',     assignedTo:'Dr. Kavitha N.', ageHours:4,  slaHours:48 },
];

const PIPELINE = [
  { stage:'Submitted',      count:342, color:'#6366f1' },
  { stage:'In Scrutiny',    count:87,  color:'#0ea5e9' },
  { stage:'Verification',   count:54,  color:'#14b8a6' },
  { stage:'Query Raised',   count:31,  color:'#f97316' },
  { stage:'Resubmitted',    count:18,  color:'#a855f7' },
  { stage:'Final Approval', count:12,  color:'#22c55e' },
  { stage:'Rejected',       count:7,   color:'#ef4444' },
];

const WorkflowPage = () => {
  const toast = useRef<any>(null);
  const [stageFilter, setStageFilter] = useState('All Stages');
  const [globalFilter, setGlobalFilter] = useState('');
  const [selected, setSelected] = useState<any[]>([]);
  const [queryDialog, setQueryDialog] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [activeApp, setActiveApp] = useState<any>(null);

  const filtered = APPS.filter(a => {
    const matchStage = stageFilter === 'All Stages' || a.stage === stageFilter;
    const matchGlobal = !globalFilter || a.institution.toLowerCase().includes(globalFilter.toLowerCase());
    return matchStage && matchGlobal;
  });

  const isBreached = (app: any) => app.ageHours > app.slaHours;

  const stageSev = (s: string) => s === 'Query Raised' || s === 'Rejected' ? 'danger' : s === 'Final Approval' ? 'warning' : 'info';

  const slaBody = (row: any) => {
    const breached = isBreached(row);
    const left = row.slaHours - row.ageHours;
    return (
      <div>
        <Tag value={breached ? 'SLA BREACH' : `${left}h left`} severity={breached ? 'danger' : left <= 6 ? 'warning' : 'success'} className="text-xs" />
        <ProgressBar value={Math.min(100,Math.round((row.ageHours/row.slaHours)*100))} showValue={false} style={{height:'4px',marginTop:'4px'}} color={breached ? '#ef4444' : '#22c55e'} />
      </div>
    );
  };

  const actBody = (row: any) => (
    <div className="flex gap-1">
      <Button icon="pi pi-check" tooltip="Approve" className="p-button-success p-button-text p-button-sm" onClick={() => toast.current?.show({severity:'success',summary:'Approved',detail:row.institution,life:2000})} />
      <Button icon="pi pi-question" tooltip="Query" className="p-button-warning p-button-text p-button-sm" onClick={() => {setActiveApp(row);setQueryDialog(true);}} />
      <Button icon="pi pi-times" tooltip="Reject" className="p-button-danger p-button-text p-button-sm" onClick={() => toast.current?.show({severity:'error',summary:'Rejected',detail:row.institution,life:2000})} />
    </div>
  );

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">342</div><div className="text-color-secondary text-sm mt-1">Total Applications</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">87</div><div className="text-color-secondary text-sm mt-1">SLA Breached</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">12</div><div className="text-color-secondary text-sm mt-1">Pending Final Approval</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">4.2h</div><div className="text-color-secondary text-sm mt-1">Avg. Decision Time</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-WE-01:</b> Configurable workflow stored in Workflow Master. <b>FR-WE-06:</b> Query raises pause SLA timer. <b>FR-WE-07:</b> Real-time status visible to applicants and officials.</span></div></div>
      <div className="col-12 md:col-4">
        <div className="card">
          <div className="font-semibold mb-3">Application Pipeline</div>
          {PIPELINE.map(p => (
            <div key={p.stage} className="flex align-items-center gap-2 mb-2">
              <span className="text-sm" style={{width:'110px',flexShrink:0}}>{p.stage}</span>
              <div className="flex-1 border-round overflow-hidden" style={{background:'var(--surface-ground)',height:'16px'}}><div style={{width:`${Math.round((p.count/342)*100)}%`,background:p.color,height:'100%',borderRadius:'3px'}} /></div>
              <span className="font-bold text-sm" style={{width:'30px',color:p.color,textAlign:'right'}}>{p.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 md:col-8">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border">
            <Dropdown value={stageFilter} options={['All Stages','Scrutiny','Verification','Query Raised','Final Approval','Resubmitted']} onChange={e=>setStageFilter(e.value)} className="text-sm" style={{width:'160px'}} />
            <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Search…" className="p-inputtext-sm" style={{width:'180px'}} /></span>
            {selected.length > 0 && <Button label={`Approve ${selected.length}`} icon="pi pi-check" className="p-button-success p-button-sm" />}
          </div>
          <DataTable value={filtered} selection={selected} onSelectionChange={e=>setSelected(e.value as any[])} dataKey="id" className="p-datatable-sm" showGridlines paginator rows={8} rowClassName={row=>isBreached(row)?'bg-red-50':''}>
            <Column selectionMode="multiple" style={{width:'3rem'}} />
            <Column header="Application" body={row=><div><div className="font-mono text-xs text-color-secondary">{row.id}</div><div className="font-medium text-sm mt-1">{row.institution}</div></div>} style={{minWidth:'180px'}} />
            <Column field="appType" header="Type" className="text-sm" style={{width:'130px'}} />
            <Column field="course" header="Course" body={row=><Tag value={row.course} severity="secondary" className="text-xs"/>} style={{width:'90px'}} />
            <Column field="stage" header="Stage" body={row=><Tag value={row.stage} severity={stageSev(row.stage) as any} className="text-xs"/>} style={{width:'120px'}} />
            <Column field="assignedTo" header="Assigned To" className="text-sm" style={{width:'120px'}} body={row=>row.assignedTo==='—'||row.assignedTo==='Unassigned'?<Tag value="Unassigned" severity="danger" className="text-xs"/>:<span>{row.assignedTo}</span>} />
            <Column header="SLA" body={slaBody} style={{width:'130px'}} />
            <Column header="Actions" body={actBody} style={{width:'130px'}} />
          </DataTable>
        </div>
      </div>
      <Dialog header={`Query — ${activeApp?.institution}`} visible={queryDialog} style={{width:'480px'}} onHide={()=>setQueryDialog(false)}
        footer={<div className="flex gap-2"><Button label="Send Query" icon="pi pi-send" className="p-button-warning" onClick={()=>{toast.current?.show({severity:'warn',summary:'Query Sent',detail:'SLA paused · Institution notified',life:3000});setQueryDialog(false);}}/><Button label="Cancel" className="p-button-text" onClick={()=>setQueryDialog(false)}/></div>}>
        <InputTextarea value={queryText} onChange={e=>setQueryText(e.target.value)} rows={4} className="w-full" placeholder="Describe the deficiency or document required… (FR-WE-06)" />
      </Dialog>
    </div>
  );
};
export default WorkflowPage;
