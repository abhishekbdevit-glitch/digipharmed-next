'use client';
import { DataTable, Column, Button, Tag } from '../../../../lib/prime';
import React, { useState } from 'react';
import { COURSES } from '../../../../lib/pci-constants';

const PROGRAMMES = [
  { id:'P001', name:'Bachelor of Pharmacy (B.Pharm)', duration:'4 years / 8 semesters', gazette:'Gazette No. 362, Dec 2014', minIntake:30, maxIntake:100, status:'Active' },
  { id:'P002', name:'Diploma in Pharmacy (D.Pharm)',  duration:'2 years / 4 semesters', gazette:'Gazette No. 325, Nov 2014', minIntake:30, maxIntake:60,  status:'Active' },
  { id:'P003', name:'Master of Pharmacy (M.Pharm)',   duration:'2 years / 4 semesters', gazette:'Gazette No. 412, Mar 2020', minIntake:10, maxIntake:30,  status:'Active' },
  { id:'P004', name:'Doctor of Pharmacy (Pharm.D)',   duration:'6 years (5+1 intern)',  gazette:'Gazette No. 435, Oct 2020', minIntake:30, maxIntake:60,  status:'Active' },
];

const EAS = [
  { id:'EA001', name:'Rajiv Gandhi University of Health Sciences', state:'Karnataka',      courses:'B.Pharm, M.Pharm, Pharm.D', institutions:124, status:'Approved' },
  { id:'EA002', name:'Dr. NTR University of Health Sciences',      state:'Andhra Pradesh', courses:'B.Pharm, D.Pharm, M.Pharm', institutions:98,  status:'Approved' },
  { id:'EA003', name:'Kerala University of Health Sciences',        state:'Kerala',         courses:'All Courses',                institutions:87,  status:'Approved' },
  { id:'EA004', name:'Maharashtra University of Health Sciences',   state:'Maharashtra',    courses:'B.Pharm, D.Pharm',           institutions:142, status:'Approved' },
  { id:'EA005', name:'Tamil Nadu Dr. MGR Medical University',       state:'Tamil Nadu',     courses:'All Courses',                institutions:110, status:'Approved' },
  { id:'EA006', name:'Kaloji Narayana Rao University of HS',        state:'Telangana',      courses:'B.Pharm, D.Pharm, M.Pharm', institutions:76,  status:'Pending'  },
];

const GeneralInfoPage = () => {
  const [activeTab, setActiveTab] = useState<'programmes'|'ea'>('programmes');
  return (
    <div className="grid">
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">4</div><div className="text-color-secondary text-sm mt-1">Active Programmes</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">140+</div><div className="text-color-secondary text-sm mt-1">Examining Authorities</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">29</div><div className="text-color-secondary text-sm mt-1">States / UTs</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">8</div><div className="text-color-secondary text-sm mt-1">Programme Updates</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-GI-01:</b> Programme Management — pharmacy education programmes with regulatory norms and eligibility. <b>FR-GI-02:</b> Examining Authority Master used for institution affiliation and student result validation.</span>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="flex gap-2 mb-3">
            <Button label="Programme Management" icon="pi pi-book" className={`p-button-sm ${activeTab==='programmes'?'':' p-button-outlined'}`} onClick={() => setActiveTab('programmes')} />
            <Button label="Examining Authority Master" icon="pi pi-verified" className={`p-button-sm ${activeTab==='ea'?'':' p-button-outlined'}`} onClick={() => setActiveTab('ea')} />
          </div>

          {activeTab === 'programmes' && (
            <>
              <div className="flex justify-content-between align-items-center mb-3">
                <span className="font-semibold">Programme Management (FR-GI-01)</span>
                <Button label="Add Programme" icon="pi pi-plus" className="p-button-sm" />
              </div>
              <DataTable value={PROGRAMMES} className="p-datatable-sm" showGridlines>
                <Column field="name"       header="Programme" style={{ minWidth:'220px' }} />
                <Column field="duration"   header="Duration" className="text-sm" style={{ width:'160px' }} />
                <Column field="gazette"    header="Gazette Reference" className="font-mono text-xs" style={{ width:'200px' }} />
                <Column field="minIntake"  header="Min. Intake" className="text-center font-mono" style={{ width:'90px' }} />
                <Column field="maxIntake"  header="Max. Intake" className="text-center font-mono" style={{ width:'90px' }} />
                <Column field="status"     header="Status" body={r => <Tag value={r.status} severity="success" className="text-xs" />} style={{ width:'80px' }} />
                <Column header="Actions" body={() => <div className="flex gap-1"><Button icon="pi pi-pencil" className="p-button-sm p-button-text" /><Button icon="pi pi-eye" className="p-button-sm p-button-text" /></div>} style={{ width:'90px' }} />
              </DataTable>
            </>
          )}

          {activeTab === 'ea' && (
            <>
              <div className="flex justify-content-between align-items-center mb-3">
                <span className="font-semibold">Examining Authority Master (FR-GI-02)</span>
                <Button label="Add EA" icon="pi pi-plus" className="p-button-sm" />
              </div>
              <DataTable value={EAS} className="p-datatable-sm" showGridlines paginator rows={10}>
                <Column field="name"         header="Examining Authority" style={{ minWidth:'240px' }} />
                <Column field="state"        header="State" className="text-sm" style={{ width:'160px' }} />
                <Column field="courses"      header="Courses" className="text-sm" style={{ width:'180px' }} />
                <Column field="institutions" header="Institutions" className="font-mono text-center" style={{ width:'110px' }} />
                <Column field="status"       header="Status" body={r => <Tag value={r.status} severity={r.status==='Approved'?'success':'warning'} className="text-xs" />} style={{ width:'90px' }} />
                <Column header="Actions" body={() => <div className="flex gap-1"><Button icon="pi pi-pencil" className="p-button-sm p-button-text" /><Button icon="pi pi-eye" className="p-button-sm p-button-text" /></div>} style={{ width:'90px' }} />
              </DataTable>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default GeneralInfoPage;