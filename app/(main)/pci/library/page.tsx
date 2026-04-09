'use client';
import { DataTable, Column, Button, Tag, InputText, ProgressBar } from '../../../../lib/prime';
import React, { useState } from 'react';
import { BPHARM_INFRA_CHECKLIST } from '../../../../lib/pci-constants';

const DATA = [
  { id:'L001', institution:'Seven Hills College', state:'Andhra Pradesh', course:'B.Pharm', titles:'1,180/1,200', journals:'18/15', seating:'80 seats', digital:true,  comp:88, inspSync:true  },
  { id:'L002', institution:'JSS College of Pharmacy', state:'Karnataka', course:'D.Pharm', titles:'1,480/1,200', journals:'22/15', seating:'120 seats', digital:true, comp:100, inspSync:true },
  { id:'L003', institution:'Amrita Kochi',         state:'Kerala',    course:'Pharm.D', titles:'980/1,200',  journals:'12/15', seating:'60 seats', digital:true,  comp:64,  inspSync:true  },
  { id:'L004', institution:'KLE Belagavi',          state:'Karnataka', course:'B.Pharm', titles:'1,100/1,200',journals:'14/15', seating:'95 seats', digital:false, comp:71,  inspSync:false },
  { id:'L005', institution:'SRM Chennai',           state:'Tamil Nadu', course:'M.Pharm', titles:'680/600',   journals:'10/10', seating:'50 seats', digital:true,  comp:96,  inspSync:true  },
  { id:'L006', institution:'Saveetha Pharmacy',     state:'Tamil Nadu', course:'D.Pharm', titles:'820/1,200',  journals:'9/15',  seating:'45 seats', digital:false, comp:52,  inspSync:false },
];

const LibraryPage = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const filtered = DATA.filter(r => !globalFilter || r.institution.toLowerCase().includes(globalFilter.toLowerCase()));
  return (
    <div className="grid">
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">8,462</div><div className="text-color-secondary text-sm mt-1">Institutions Tracked</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">72%</div><div className="text-color-secondary text-sm mt-1">Avg. Compliance</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">982</div><div className="text-color-secondary text-sm mt-1">Library Deficiencies</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">1,240</div><div className="text-color-secondary text-sm mt-1">Digital Resource Access</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-LM-01:</b> Min. book counts, journal subscriptions, digital resources per course from master data. <b>FR-LM-03:</b> Library records synced to Inspector Mobile App for on-site verification.</span>
        </div>
      </div>
      <div className="col-12">
        <div className="card py-2 flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="flex gap-2">
            <Button label="Export Deficiency Report" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
            <Button label="Sync to Inspector App" icon="pi pi-sync" className="p-button-outlined p-button-sm" />
          </div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search institutions…" className="p-inputtext-sm" style={{ width:'220px' }} />
          </span>
        </div>
      </div>
      <div className="col-12">
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Library Compliance (FR-LM-02)</div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10}>
            <Column header="Institution" style={{ minWidth:'200px' }} body={r => <div><div className="font-medium text-sm">{r.institution}</div><div className="text-xs text-color-secondary">{r.state}</div></div>} />
            <Column field="course"   header="Course" body={r => <Tag value={r.course} severity="info" className="text-xs" />} style={{ width:'90px' }} />
            <Column field="titles"   header="Titles (actual/req)" className="text-sm" style={{ width:'160px' }} />
            <Column field="journals" header="Journals (actual/req)" className="text-sm" style={{ width:'160px' }} />
            <Column field="seating"  header="Seating" className="text-sm" style={{ width:'100px' }} />
            <Column header="Digital Resources" style={{ width:'130px' }} body={r => <Tag value={r.digital?'Available':'Not Available'} severity={r.digital?'success':'danger'} className="text-xs" />} />
            <Column header="Compliance" style={{ width:'130px' }} body={r => (
              <div>
                <div className="flex justify-content-between text-sm mb-1"><span>{r.comp}%</span><Tag value={r.comp>=90?'OK':r.comp>=70?'Warn':'Low'} severity={r.comp>=90?'success':r.comp>=70?'warning':'danger'} className="text-xs" /></div>
                <ProgressBar value={r.comp} showValue={false} style={{ height:'5px' }} color={r.comp>=90?'#22c55e':r.comp>=70?'#f97316':'#ef4444'} />
              </div>
            )} />
            <Column header="Inspector Sync" style={{ width:'120px' }} body={r => <Tag value={r.inspSync?'Synced':'Not Synced'} severity={r.inspSync?'success':'warning'} className="text-xs" />} />
            <Column header="Actions" style={{ width:'110px' }} body={() => (
              <div className="flex gap-1">
                <Button icon="pi pi-eye"   className="p-button-sm p-button-text" />
                <Button icon="pi pi-check" className="p-button-sm p-button-success p-button-text" />
                <Button icon="pi pi-times" className="p-button-sm p-button-danger p-button-text" />
              </div>
            )} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default LibraryPage;