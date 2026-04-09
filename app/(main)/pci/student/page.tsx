'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown } from '../../../../lib/prime';
import React, { useState } from 'react';

const DATA = [
  { id:'PCI-STU-2026-001', name:'Anjali Krishnan',     course:'B.Pharm', year:'I',   institution:'Seven Hills', type:'Regular',      ekyc:'Verified',  academic:'Active',                status:'Verified'              },
  { id:'PCI-STU-2026-002', name:'Mohammed Farhan',     course:'D.Pharm', year:'II',  institution:'JSS Mysuru', type:'Regular',      ekyc:'Verified',  academic:'Active',                status:'Verified'              },
  { id:'PCI-STU-2026-003', name:'Sneha Patil',         course:'M.Pharm', year:'I',   institution:'MAHE Manipal', type:'Regular',    ekyc:'Pending',   academic:'Pending Verification', status:'Pending Verification'  },
  { id:'PCI-STU-2025-891', name:'Rahul Nair',          course:'B.Pharm', year:'III', institution:'Amrita Kochi', type:'Lateral Entry', ekyc:'Verified', academic:'Active',               status:'Verified'              },
  { id:'PCI-STU-2026-004', name:'Deepika S.',          course:'Pharm.D', year:'I',   institution:'KLE Belagavi', type:'Regular',    ekyc:'Failed',    academic:'Rejected',             status:'Rejected'              },
  { id:'PCI-STU-2026-005', name:'Arjun Mehta',         course:'B.Pharm', year:'II',  institution:'SRM Chennai', type:'Regular',     ekyc:'Verified',  academic:'Active',               status:'Verified'              },
];
const statusSev = (s: string) => s==='Verified'?'success':s==='Rejected'?'danger':'warning';
const StudentPage = () => {
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');
  const filtered = DATA.filter(r => {
    const mc = courseFilter==='All' || r.course===courseFilter;
    const ms = statusFilter==='All' || r.status===statusFilter;
    const mg = !globalFilter || r.name.toLowerCase().includes(globalFilter.toLowerCase()) || r.id.toLowerCase().includes(globalFilter.toLowerCase());
    return mc && ms && mg;
  });
  return (
    <div className="grid">
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">6,12,400</div><div className="text-color-secondary text-sm mt-1">Total Students</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">1,247</div><div className="text-color-secondary text-sm mt-1">Pending Verification</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">18,200</div><div className="text-color-secondary text-sm mt-1">New Enrolments 2026-27</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">4,820</div><div className="text-color-secondary text-sm mt-1">Lateral Entry</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-SM-01:</b> Aadhaar-linked eKYC verification. <b>FR-SM-02:</b> Enrollment tracking with intake limit enforcement. <b>FR-SM-05:</b> Cross-reference against institution-uploaded data.</span></div></div>
      <div className="col-12">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border justify-content-between">
            <Button label="Bulk Verify" icon="pi pi-check-square" className="p-button-sm"/>
            <div className="flex gap-2 flex-wrap">
              <Dropdown value={courseFilter} options={['All','B.Pharm','D.Pharm','M.Pharm','Pharm.D']} onChange={e=>setCourseFilter(e.value)} className="text-sm" style={{width:'130px'}}/>
              <Dropdown value={statusFilter} options={['All','Verified','Pending Verification','Rejected']} onChange={e=>setStatusFilter(e.value)} className="text-sm" style={{width:'170px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Name, reg. no…" className="p-inputtext-sm" style={{width:'180px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10} rowClassName={row=>row.status==='Rejected'?'bg-red-50':''}>
            <Column field="name" header="Student" body={row=><div><div className="font-medium text-sm">{row.name}</div><div className="font-mono text-xs text-color-secondary">{row.id}</div></div>} style={{minWidth:'180px'}}/>
            <Column field="course" header="Course" body={row=><Tag value={row.course} severity="info" className="text-xs"/>} style={{width:'90px'}}/>
            <Column field="year" header="Year" className="text-center text-sm" style={{width:'60px'}}/>
            <Column field="institution" header="Institution" className="text-sm" style={{minWidth:'150px'}}/>
            <Column field="type" header="Enrolment" body={row=><Tag value={row.type} severity={row.type==='Regular'?'secondary':'info'} className="text-xs"/>} style={{width:'110px'}}/>
            <Column field="ekyc" header="eKYC" body={row=><Tag value={row.ekyc} severity={row.ekyc==='Verified'?'success':row.ekyc==='Failed'?'danger':'warning'} className="text-xs"/>} style={{width:'80px'}}/>
            <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'150px'}}/>
            <Column header="Actions" body={row=><div className="flex gap-1"><Button icon="pi pi-eye" className="p-button-text p-button-sm"/>{row.status==='Pending Verification'&&<Button icon="pi pi-check" className="p-button-success p-button-text p-button-sm" tooltip="Verify"/>}</div>} style={{width:'90px'}}/>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default StudentPage;
