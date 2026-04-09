'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown } from '../../../../lib/prime';
import React, { useState } from 'react';

const EMPLOYERS = [
  { id:'E001', name:'Apollo Hospitals',          type:'Hospital',        states:'Multiple', activeJobs:12, applications:340, verified:true,  status:'Active'           },
  { id:'E002', name:'MedPlus Pharmacy Chain',    type:'Pharmacy Retail', states:'South',    activeJobs:24, applications:890, verified:true,  status:'Active'           },
  { id:'E003', name:'Sun Pharmaceutical',         type:'Pharma Industry', states:'Multiple', activeJobs:8,  applications:220, verified:true,  status:'Active'           },
  { id:'E004', name:'AIIMS New Delhi',            type:'Govt. Hospital',  states:'Delhi',    activeJobs:4,  applications:180, verified:true,  status:'Active'           },
  { id:'E005', name:'Cipla Limited',              type:'Pharma Industry', states:'Multiple', activeJobs:6,  applications:150, verified:false, status:'Pending Approval'  },
  { id:'E006', name:'Fortis Healthcare',          type:'Hospital',        states:'North',    activeJobs:9,  applications:280, verified:true,  status:'Active'           },
  { id:'E007', name:'Dr. Reddys Laboratories',  type:'Pharma Industry', states:'Multiple', activeJobs:11, applications:310, verified:true,  status:'Active'           },
  { id:'E008', name:'Zydus Lifesciences',         type:'Pharma Industry', states:'Gujarat',  activeJobs:7,  applications:190, verified:false, status:'Pending Approval'  },
];

const TYPES = ['All Types','Hospital','Pharmacy Retail','Pharma Industry','Govt. Hospital'];

const EmployerPage = () => {
  const [typeFilter,   setTypeFilter]   = useState('All Types');
  const [globalFilter, setGlobalFilter] = useState('');

  const filtered = EMPLOYERS.filter(e =>
    (typeFilter==='All Types'||e.type===typeFilter) &&
    (!globalFilter||e.name.toLowerCase().includes(globalFilter.toLowerCase()))
  );

  return (
    <div className="grid">
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">1,240</div><div className="text-color-secondary text-sm mt-1">Registered Employers</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">18</div><div className="text-color-secondary text-sm mt-1">Pending Approval</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">3,480</div><div className="text-color-secondary text-sm mt-1">Active Job Postings</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">24,600</div><div className="text-color-secondary text-sm mt-1">Total Applications</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-OE-01:</b> Organisation registration with document verification and admin approval. <b>FR-OE-03:</b> PCI admin moderation on all job postings. <b>FR-OE-04:</b> Applicant tracking dashboard per employer posting.</span>
        </div>
      </div>
      <div className="col-12">
        <div className="card py-2 flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="flex gap-2">
            <Button label="Register Employer" icon="pi pi-plus" className="p-button-sm" />
            <Button label="Moderate Job Posts" icon="pi pi-eye" className="p-button-outlined p-button-sm" />
            <Button label="Export" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
          </div>
          <div className="flex gap-2">
            <Dropdown value={typeFilter} options={TYPES} onChange={e => setTypeFilter(e.value)} className="text-sm" style={{ width:'160px' }} />
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search employers…" className="p-inputtext-sm" style={{ width:'200px' }} />
            </span>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Employer Registry (FR-OE-02)</div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10}
            rowClassName={e => !e.verified?'bg-orange-50':''}>
            <Column field="name"         header="Organisation" className="font-medium text-sm" style={{ minWidth:'200px' }} />
            <Column field="type"         header="Type"         body={e => <Tag value={e.type} severity="secondary" className="text-xs" />} style={{ width:'130px' }} />
            <Column field="states"       header="States"       className="text-sm" style={{ width:'100px' }} />
            <Column field="activeJobs"   header="Active Jobs"  className="font-mono text-center" style={{ width:'90px' }} />
            <Column field="applications" header="Applications" className="font-mono text-center" style={{ width:'110px' }} />
            <Column header="Verified" style={{ width:'90px' }} body={e => <Tag value={e.verified?'Yes':'Pending'} severity={e.verified?'success':'warning'} className="text-xs" />} />
            <Column header="Status" style={{ width:'130px' }} body={e => <Tag value={e.status} severity={e.status==='Active'?'success':'warning'} className="text-xs" />} />
            <Column header="Actions" style={{ width:'130px' }} body={e => (
              <div className="flex gap-1">
                <Button icon="pi pi-eye"    className="p-button-sm p-button-text" tooltip="View profile" />
                <Button icon="pi pi-list"   className="p-button-sm p-button-text" tooltip="View job postings" />
                {!e.verified && <Button icon="pi pi-check" className="p-button-sm p-button-success p-button-text" tooltip="Approve" />}
              </div>
            )} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default EmployerPage;