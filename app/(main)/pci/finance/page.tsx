'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, Toast, ProgressBar } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const TRANSACTIONS = [
  { id:'TXN-9812', institution:'Seven Hills College', feeType:'B.Pharm Affiliation', amount:'₹1,00,000', mode:'NEFT', date:'Apr 8, 2026',  status:'Collected',   invoice:'INV-2026-0421' },
  { id:'TXN-9811', institution:'JSS Mysuru',          feeType:'Renewal — All Courses', amount:'₹2,40,000', mode:'RTGS', date:'Apr 8, 2026',  status:'Collected',   invoice:'INV-2026-0420' },
  { id:'TXN-9810', institution:'Amrita Kochi',        feeType:'Pharm.D Affiliation', amount:'₹1,80,000', mode:'NEFT', date:'Apr 7, 2026',  status:'Recon. Error',invoice:'INV-2026-0419' },
  { id:'TXN-9808', institution:'KLE Belagavi',        feeType:'B.Pharm Renewal',     amount:'₹80,000',   mode:'Cheque',date:'Apr 6, 2026',  status:'Pending',     invoice:'—' },
  { id:'TXN-9805', institution:'SRM Chennai',         feeType:'M.Pharm Affiliation', amount:'₹1,20,000', mode:'RTGS', date:'Apr 5, 2026',  status:'Collected',   invoice:'INV-2026-0418' },
  { id:'TXN-9801', institution:'Saveetha Pharmacy',   feeType:'D.Pharm Renewal',     amount:'₹60,000',   mode:'NEFT', date:'Apr 3, 2026',  status:'Collected',   invoice:'INV-2026-0417' },
];

const BUDGET = [
  { dept:'Registration & Approval', alloc:3.2, spent:2.1 },
  { dept:'Inspection Division',     alloc:0.8, spent:0.5 },
  { dept:'Finance & Accounts',      alloc:0.4, spent:0.3 },
  { dept:'IT & Systems',            alloc:0.6, spent:0.4 },
];

const FEE_COLLECTION = [
  { course:'B.Pharm',   pct:69, collected:'₹1.8 Cr' },
  { course:'D.Pharm',   pct:82, collected:'₹0.9 Cr' },
  { course:'M.Pharm',   pct:57, collected:'₹0.7 Cr' },
  { course:'Pharm.D',   pct:45, collected:'₹0.5 Cr' },
  { course:'Inspector', pct:88, collected:'₹0.3 Cr' },
];

const statusSev = (s: string) => s==='Collected'?'success':s==='Recon. Error'?'danger':'warning';

const FinancePage = () => {
  const toast = useRef<any>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');

  const filtered = TRANSACTIONS.filter(r => {
    const ms = statusFilter==='All' || r.status===statusFilter;
    const mg = !globalFilter || r.institution.toLowerCase().includes(globalFilter.toLowerCase());
    return ms && mg;
  });

  return (
    <div className="grid">
      <Toast ref={toast}/>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">₹4.2 Cr</div><div className="text-color-secondary text-sm mt-1">Total Collected FY 2026-27</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">₹1.9 Cr</div><div className="text-color-secondary text-sm mt-1">Pending Dues</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">₹48,000</div><div className="text-color-secondary text-sm mt-1">Recon. Error</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">₹6.1 Cr</div><div className="text-color-secondary text-sm mt-1">Annual Target (69%)</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-FP-03:</b> Online payment integration with automated receipt generation. <b>FR-FP-05:</b> GST-compliant invoices with sequential numbering — PDF downloadable. <b>FR-FP-04:</b> Outstanding dues with automated reminders.</span></div></div>
      <div className="col-12 md:col-8">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border align-items-center justify-content-between">
            <div className="flex gap-2"><Button label="Generate GST Invoice" icon="pi pi-file-pdf" className="p-button-sm"/><Button label="Export I&E Statement" icon="pi pi-file-export" className="p-button-outlined p-button-sm"/></div>
            <div className="flex gap-2">
              <Dropdown value={statusFilter} options={['All','Collected','Pending','Recon. Error']} onChange={e=>setStatusFilter(e.value)} className="text-sm" style={{width:'140px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Search…" className="p-inputtext-sm" style={{width:'180px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={8} rowClassName={row=>row.status==='Recon. Error'?'bg-red-50':''}>
            <Column field="id" header="Txn ID" className="font-mono text-xs" style={{width:'100px'}}/>
            <Column field="institution" header="Institution" className="font-medium text-sm" style={{minWidth:'160px'}}/>
            <Column field="feeType" header="Fee Type" className="text-sm" style={{minWidth:'150px'}}/>
            <Column field="amount" header="Amount" className="font-mono font-bold" style={{width:'110px'}}/>
            <Column field="mode" header="Mode" body={row=><Tag value={row.mode} severity="info" className="text-xs"/>} style={{width:'80px'}}/>
            <Column field="date" header="Date" className="text-sm" style={{width:'110px'}}/>
            <Column field="invoice" header="Invoice" className="font-mono text-xs" style={{width:'120px'}}/>
            <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'110px'}}/>
            <Column header="Actions" body={row=><div className="flex gap-1"><Button icon="pi pi-eye" className="p-button-text p-button-sm"/>{row.status==='Recon. Error'&&<Button icon="pi pi-wrench" className="p-button-warning p-button-text p-button-sm" tooltip="Fix mismatch" onClick={()=>toast.current?.show({severity:'warn',summary:'Reconciliation',detail:'Review in Reconciliation module',life:2000})}/>}</div>} style={{width:'90px'}}/>
          </DataTable>
        </div>
      </div>
      <div className="col-12 md:col-4">
        <div className="card mb-3">
          <div className="font-semibold mb-3">Fee Collection by Course</div>
          {FEE_COLLECTION.map(f=>(
            <div key={f.course} className="mb-3">
              <div className="flex justify-content-between text-sm mb-1"><span className="font-medium">{f.course}</span><span className="text-color-secondary">{f.collected}</span></div>
              <ProgressBar value={f.pct} showValue={false} style={{height:'6px'}} color={f.pct>=80?'#22c55e':f.pct>=60?'#f97316':'#ef4444'}/>
              <div className="text-right text-xs text-color-secondary mt-1">{f.pct}%</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="font-semibold mb-3">Budget Utilisation (FR-FP-02)</div>
          {BUDGET.map(b=>(
            <div key={b.dept} className="mb-3">
              <div className="flex justify-content-between text-sm mb-1"><span>{b.dept}</span><span className="font-mono">₹{b.spent}Cr / ₹{b.alloc}Cr</span></div>
              <ProgressBar value={Math.round((b.spent/b.alloc)*100)} showValue={false} style={{height:'5px'}}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FinancePage;
