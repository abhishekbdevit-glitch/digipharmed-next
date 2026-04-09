'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, Toast, ProgressBar, Dialog, InputTextarea } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const DATA = [
  { id:'GR-1042', category:'Fee Refund',         institution:'SVCP Tirupati',  desc:'B.Pharm fee paid twice — refund pending',              age:2,  sla:24, status:'Open',       priority:'High'   },
  { id:'GR-1039', category:'Inspector Conduct',   institution:'JSS Mysuru',     desc:'Partial inspection — report incomplete',               age:1,  sla:48, status:'Escalated',  priority:'High'   },
  { id:'GR-1036', category:'Result Discrepancy',  institution:'MAHE Manipal',   desc:'Marks mismatch in supplementary result',              age:3,  sla:18, status:'In Progress',priority:'Medium' },
  { id:'GR-1031', category:'Portal Login',        institution:'KLE Belagavi',   desc:'Admin unable to log in since 3 days',                 age:5,  sla:72, status:'Open',       priority:'Low'    },
  { id:'GR-1029', category:'Doc Rejection',       institution:'Amrita Kochi',   desc:'NOC rejected — format mismatch',                      age:7,  sla:72, status:'Resolved',   priority:'Low'    },
  { id:'GR-1025', category:'Fee Refund',         institution:'SRM Chennai',    desc:'D.Pharm renewal fee overcharged',                      age:10, sla:24, status:'Resolved',   priority:'Medium' },
];

const statusSev = (s: string) => s==='Resolved'?'success':s==='Escalated'?'danger':s==='In Progress'?'warning':'info';
const priSev   = (p: string) => p==='High'?'danger':p==='Medium'?'warning':'success';

const GrievancePage = () => {
  const toast = useRef<any>(null);
  const [catFilter, setCatFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');
  const [respondDialog, setRespondDialog] = useState(false);
  const [activeRow, setActiveRow] = useState<any>(null);
  const [response, setResponse] = useState('');

  const filtered = DATA.filter(r => {
    const mc = catFilter==='All' || r.category===catFilter;
    const mg = !globalFilter || r.institution.toLowerCase().includes(globalFilter.toLowerCase()) || r.id.toLowerCase().includes(globalFilter.toLowerCase());
    return mc && mg;
  });

  const slaBody = (row: any) => {
    const breached = row.age > row.sla/24;
    const pct = Math.min(100, Math.round((row.age / (row.sla/24)) * 100));
    return (
      <div>
        <Tag value={breached?'SLA Breach':`${row.age}d / ${row.sla}h SLA`} severity={breached?'danger':pct>=80?'warning':'success'} className="text-xs"/>
        <ProgressBar value={pct} showValue={false} style={{height:'4px',marginTop:'4px'}} color={breached?'#ef4444':'#22c55e'}/>
      </div>
    );
  };

  const actBody = (row: any) => (
    <div className="flex gap-1">
      <Button icon="pi pi-eye" tooltip="View" className="p-button-text p-button-sm"/>
      <Button icon="pi pi-reply" tooltip="Respond" className="p-button-text p-button-sm" onClick={()=>{setActiveRow(row);setRespondDialog(true);}}/>
      {row.status!=='Resolved' && <Button icon="pi pi-check" tooltip="Mark Resolved" className="p-button-success p-button-text p-button-sm" onClick={()=>toast.current?.show({severity:'success',summary:'Resolved',detail:`${row.id} · Applicant acknowledgement required (FR-GV-04)`,life:3000})}/>}
    </div>
  );

  return (
    <div className="grid">
      <Toast ref={toast}/>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">23</div><div className="text-color-secondary text-sm mt-1">Open Tickets</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">8</div><div className="text-color-secondary text-sm mt-1">SLA Breached</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">4.2 days</div><div className="text-color-secondary text-sm mt-1">Avg. Resolution</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">91%</div><div className="text-color-secondary text-sm mt-1">Applicant Satisfaction</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-GV-01:</b> Auto-classification by category and priority. <b>FR-GV-03:</b> Automatic escalation on SLA breach. <b>FR-GV-04:</b> Resolution requires applicant acknowledgement before closure.</span></div></div>
      <div className="col-12">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border align-items-center justify-content-between">
            <Button label="Raise Ticket" icon="pi pi-plus" className="p-button-sm"/>
            <div className="flex gap-2">
              <Dropdown value={catFilter} options={['All','Fee Refund','Inspector Conduct','Result Discrepancy','Portal Login','Doc Rejection']} onChange={e=>setCatFilter(e.value)} className="text-sm" style={{width:'180px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Search…" className="p-inputtext-sm" style={{width:'180px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10} rowClassName={row=>row.status==='Escalated'?'bg-red-50':''}>
            <Column field="id" header="Ticket ID" className="font-mono text-xs" style={{width:'90px'}}/>
            <Column field="category" header="Category" body={row=><Tag value={row.category} severity="info" className="text-xs"/>} style={{width:'140px'}}/>
            <Column field="institution" header="Institution" className="font-medium text-sm" style={{minWidth:'160px'}}/>
            <Column field="desc" header="Description" className="text-sm text-color-secondary" style={{minWidth:'200px'}}/>
            <Column field="priority" header="Priority" body={row=><Tag value={row.priority} severity={priSev(row.priority) as any} className="text-xs"/>} style={{width:'80px'}}/>
            <Column header="SLA" body={slaBody} style={{width:'140px'}}/>
            <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'100px'}}/>
            <Column header="Actions" body={actBody} style={{width:'120px'}}/>
          </DataTable>
        </div>
      </div>
      <Dialog header={`Respond — ${activeRow?.id}`} visible={respondDialog} style={{width:'480px'}} onHide={()=>setRespondDialog(false)}
        footer={<div className="flex gap-2"><Button label="Send Response" icon="pi pi-send" onClick={()=>{toast.current?.show({severity:'success',summary:'Response Sent',detail:'Awaiting applicant acknowledgement (FR-GV-04)',life:3000});setRespondDialog(false);}}/><Button label="Cancel" className="p-button-text" onClick={()=>setRespondDialog(false)}/></div>}>
        <div className="mb-3 text-sm"><b>{activeRow?.institution}</b> · {activeRow?.category}<br/><span className="text-color-secondary">{activeRow?.desc}</span></div>
        <InputTextarea value={response} onChange={e=>setResponse(e.target.value)} rows={4} className="w-full" placeholder="Resolution notes (required before closure — FR-GV-04)"/>
      </Dialog>
    </div>
  );
};
export default GrievancePage;
