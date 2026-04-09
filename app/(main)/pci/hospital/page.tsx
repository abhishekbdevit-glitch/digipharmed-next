'use client';
import { DataTable, Column, Button, Tag, InputText, Dialog } from '../../../../lib/prime';
import React, { useState } from 'react';

const HOSPITALS = [
  { id:'H001', name:'AIIMS Visakhapatnam',       type:'Govt. Teaching', state:'Andhra Pradesh', beds:850, accred:'NABH',          mappedInst:7,  mouTill:'Dec 2027', staff:'Verified',      staffCount:142 },
  { id:'H002', name:'Manipal Hospital',           type:'Pvt. Teaching',  state:'Karnataka',      beds:1200,accred:'NABH, JCI',     mappedInst:12, mouTill:'Mar 2027', staff:'Verified',      staffCount:284 },
  { id:'H003', name:'Medical Trust Hospital',     type:'Pvt. Non-Teaching',state:'Kerala',       beds:450, accred:'NABH',          mappedInst:3,  mouTill:'Jun 2026', staff:'Pending Review', staffCount:68 },
  { id:'H004', name:'Govt. Medical College Hosp.',type:'Govt. Teaching', state:'Tamil Nadu',     beds:900, accred:'None',           mappedInst:5,  mouTill:'Sep 2026', staff:'Verified',      staffCount:190 },
  { id:'H005', name:'KMC Hospital Manipal',       type:'Pvt. Teaching',  state:'Karnataka',      beds:2000,accred:'NABH, JCI, NABL',mappedInst:9,  mouTill:'Dec 2028', staff:'Verified',      staffCount:420 },
];

const HospitalPage = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [detailDlg,    setDetailDlg]    = useState(false);
  const [activeHosp,   setActiveHosp]   = useState<any>(null);

  const filtered = HOSPITALS.filter(h => !globalFilter || h.name.toLowerCase().includes(globalFilter.toLowerCase()) || h.state.toLowerCase().includes(globalFilter.toLowerCase()));

  return (
    <div className="grid">
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">840</div><div className="text-color-secondary text-sm mt-1">Affiliated Hospitals</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">12</div><div className="text-color-secondary text-sm mt-1">Pending Approval</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">4,200</div><div className="text-color-secondary text-sm mt-1">Ancillary Staff</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">62</div><div className="text-color-secondary text-sm mt-1">Pharm.D Institutions</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-HM-01:</b> Hospital Master — bed strength, specialties, accreditation for Pharm.D. <b>FR-HM-02:</b> Ancillary staff records verifiable during inspection. <b>FR-HM-03:</b> Hospital-institution mapping with effective date and approval tracking.</span>
        </div>
      </div>
      <div className="col-12">
        <div className="card py-2 flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="flex gap-2">
            <Button label="Add Hospital" icon="pi pi-plus" className="p-button-sm" />
            <Button label="Export" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
          </div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search hospitals…" className="p-inputtext-sm" style={{ width:'220px' }} />
          </span>
        </div>
      </div>
      <div className="col-12">
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Hospital Master — Pharm.D Affiliations (FR-HM-01, FR-HM-03)</div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10}>
            <Column header="Hospital" style={{ minWidth:'200px' }} body={h => <div><div className="font-medium text-sm">{h.name}</div><div className="text-xs text-color-secondary">{h.state}</div></div>} />
            <Column field="type"       header="Type"         body={h => <Tag value={h.type} severity="info" className="text-xs" />} style={{ width:'140px' }} />
            <Column field="beds"       header="Beds"         className="font-mono text-sm text-center" style={{ width:'70px' }} />
            <Column field="accred"     header="Accreditation" className="text-sm" style={{ width:'130px' }} />
            <Column field="mappedInst" header="Mapped Inst." className="font-mono text-center" style={{ width:'100px' }} />
            <Column field="mouTill"    header="MoU Valid Till" className="text-sm" style={{ width:'110px' }} />
            <Column field="staffCount" header="Staff Records" className="font-mono text-center" style={{ width:'100px' }} />
            <Column header="Staff Status" style={{ width:'130px' }} body={h => <Tag value={h.staff} severity={h.staff==='Verified'?'success':'warning'} className="text-xs" />} />
            <Column header="Actions" style={{ width:'110px' }} body={h => (
              <div className="flex gap-1">
                <Button icon="pi pi-eye"    className="p-button-sm p-button-text" onClick={() => { setActiveHosp(h); setDetailDlg(true); }} />
                <Button icon="pi pi-pencil" className="p-button-sm p-button-text" />
                <Button icon="pi pi-check"  className="p-button-sm p-button-success p-button-text" />
              </div>
            )} />
          </DataTable>
        </div>
      </div>
      <Dialog header={activeHosp?.name} visible={detailDlg} style={{ width:'500px' }} onHide={() => setDetailDlg(false)}>
        {activeHosp && (
          <div className="grid">
            <div className="col-6"><div className="text-color-secondary text-sm">Type</div><div className="font-medium">{activeHosp.type}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">State</div><div className="font-medium">{activeHosp.state}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Bed Strength</div><div className="font-mono font-bold text-lg">{activeHosp.beds}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Accreditation</div><div className="font-medium">{activeHosp.accred}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Mapped Institutions</div><div className="font-mono font-bold text-lg">{activeHosp.mappedInst}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">MoU Valid Till</div><div className="font-medium">{activeHosp.mouTill}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Ancillary Staff</div><div className="font-mono font-bold text-lg">{activeHosp.staffCount}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Staff Records Status</div><Tag value={activeHosp.staff} severity={activeHosp.staff==='Verified'?'success':'warning'} className="mt-1" /></div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
export default HospitalPage;