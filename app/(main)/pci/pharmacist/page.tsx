'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown } from '../../../../lib/prime';
import React, { useState } from 'react';

const DATA = [
  { id:'BH-P-23-18028',        name:'Dr. Ravi Kumar',  state:'Andhra Pradesh', qual:'B.Pharm, M.Pharm, Ph.D', appType:'New Registration', nha:'Yes', validTill:'31 Mar 2027', status:'Active'        },
  { id:'KA-P-24-00412',        name:'Meena Sharma',    state:'Karnataka',      qual:'B.Pharm',               appType:'Renewal',           nha:'No',  validTill:'30 Jun 2026', status:'Active'        },
  { id:'KL-P-22-99241',        name:'Arun Pillai',     state:'Kerala',         qual:'D.Pharm',               appType:'Renewal',           nha:'Yes', validTill:'31 Dec 2025', status:'Renewal Due'   },
  { id:'MH-P-25-11204',        name:'Sunita Gupta',    state:'Maharashtra',    qual:'B.Pharm',               appType:'New Registration', nha:'No',  validTill:'—',           status:'Pending PRTS'  },
  { id:'AP-P-21-44109',        name:'Dr. Venkat Rao', state:'Andhra Pradesh', qual:'B.Pharm, M.Pharm',      appType:'Duplicate Cert.',   nha:'Yes', validTill:'31 Mar 2026', status:'Active'        },
];
const statusSev = (s: string) => s==='Active'?'success':s==='Renewal Due'?'warning':'info';
const PharmacistPage = () => {
  const [stateFilter, setStateFilter] = useState('All States');
  const [statusFilter, setStatusFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');
  const filtered = DATA.filter(r => {
    const ms = stateFilter==='All States' || r.state===stateFilter;
    const mst= statusFilter==='All' || r.status===statusFilter;
    const mg = !globalFilter || r.name.toLowerCase().includes(globalFilter.toLowerCase()) || r.id.toLowerCase().includes(globalFilter.toLowerCase());
    return ms && mst && mg;
  });
  return (
    <div className="grid">
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">1,42,600</div><div className="text-color-secondary text-sm mt-1">Active Pharmacists</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">834</div><div className="text-color-secondary text-sm mt-1">Pending PRTS</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">41,800</div><div className="text-color-secondary text-sm mt-1">NHA Listed</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-400">2,140</div><div className="text-color-secondary text-sm mt-1">Renewals Due (30d)</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-PM-02:</b> 12 application types supported. <b>FR-PM-04:</b> NHA Approved Pharmacist List maintained and published. <b>FR-PM-03:</b> Immutable audit logging on all approvals.</span></div></div>
      <div className="col-12">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border justify-content-between">
            <Button label="NHA List (FR-PM-04)" icon="pi pi-list" className="p-button-outlined p-button-sm"/>
            <div className="flex gap-2 flex-wrap">
              <Dropdown value={stateFilter} options={['All States','Andhra Pradesh','Karnataka','Kerala','Maharashtra']} onChange={e=>setStateFilter(e.value)} className="text-sm" style={{width:'160px'}}/>
              <Dropdown value={statusFilter} options={['All','Active','Renewal Due','Pending PRTS']} onChange={e=>setStatusFilter(e.value)} className="text-sm" style={{width:'150px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Name, council no…" className="p-inputtext-sm" style={{width:'200px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10} rowClassName={row=>row.status==='Renewal Due'?'bg-orange-50':''}>
            <Column field="name" header="Pharmacist" body={row=><div><div className="font-medium">{row.name}</div><div className="font-mono text-xs text-color-secondary">{row.id}</div></div>} style={{minWidth:'180px'}}/>
            <Column field="state" header="State Council" className="text-sm" style={{minWidth:'150px'}}/>
            <Column field="qual" header="Qualification" className="text-xs text-color-secondary" style={{minWidth:'160px'}}/>
            <Column field="appType" header="App. Type" className="text-sm" style={{width:'140px'}}/>
            <Column field="nha" header="NHA" body={row=><Tag value={row.nha} severity={row.nha==='Yes'?'success':'secondary'} className="text-xs"/>} style={{width:'60px'}}/>
            <Column field="validTill" header="Valid Till" className="text-sm" style={{width:'110px'}}/>
            <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'120px'}}/>
            <Column header="Actions" body={()=><div className="flex gap-1"><Button icon="pi pi-eye" className="p-button-text p-button-sm"/><Button icon="pi pi-check" className="p-button-success p-button-text p-button-sm"/></div>} style={{width:'90px'}}/>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default PharmacistPage;
