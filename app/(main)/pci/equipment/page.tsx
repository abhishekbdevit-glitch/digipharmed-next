'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, ProgressBar, Panel } from '../../../../lib/prime';
import React, { useState } from 'react';
import {
  BPHARM_LABS, DPHARM_LABS, DPHARM_EQUIPMENT,
} from '../../../../lib/pci-constants';

const INSTITUTION_DATA = [
  { id:'I001', institution:'Seven Hills College', state:'AP',        course:'B.Pharm', required:148, submitted:142, gaps:6,  photos:'4 pending',  status:'Partial Compliant' },
  { id:'I002', institution:'JSS Mysuru',          state:'KA',        course:'D.Pharm', required:104, submitted:104, gaps:0,  photos:'All approved',status:'Compliant'         },
  { id:'I003', institution:'Amrita Kochi',         state:'KL',        course:'Pharm.D', required:86,  submitted:71,  gaps:15, photos:'8 pending',  status:'Non-Compliant'     },
  { id:'I004', institution:'KLE Belagavi',         state:'KA',        course:'B.Pharm', required:148, submitted:138, gaps:10, photos:'2 rejected',  status:'Partial Compliant' },
  { id:'I005', institution:'SRM Chennai',           state:'TN',        course:'M.Pharm', required:92,  submitted:80,  gaps:12, photos:'6 pending',  status:'Non-Compliant'     },
];

const statusSev = (s:string) => s==='Compliant'?'success':s==='Partial Compliant'?'warning':'danger';

const EquipmentPage = () => {
  const [courseFilter, setCourseFilter] = useState('All');
  const [globalFilter, setGlobalFilter] = useState('');
  const [showMaster, setShowMaster] = useState(false);

  const filtered = INSTITUTION_DATA.filter(r => {
    const mc = courseFilter==='All' || r.course===courseFilter;
    const mg = !globalFilter || r.institution.toLowerCase().includes(globalFilter.toLowerCase());
    return mc && mg;
  });

  return (
    <div className="grid">
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">8,462</div><div className="text-color-secondary text-sm mt-1">Institutions Tracked</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">65%</div><div className="text-color-secondary text-sm mt-1">D.Pharm Avg. Compliance</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">1,840</div><div className="text-color-secondary text-sm mt-1">Equipment Deficiencies</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">180+</div><div className="text-color-secondary text-sm mt-1">Equipment Types in Master</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-EQ-01:</b> Equipment Master configurable without code changes. <b>FR-EQ-02:</b> Gap identification — institution lists mapped to prescribed requirements. <b>FR-EQ-03:</b> Validation via inspection photos and documents.</span></div></div>

      {/* Equipment Master toggle */}
      <div className="col-12">
        <Button label={showMaster ? 'Hide Equipment Master' : 'View Equipment Master (FR-EQ-01)'} icon={`pi pi-${showMaster?'minus':'list'}`} className="p-button-outlined p-button-sm mb-3" onClick={()=>setShowMaster(p=>!p)}/>
        {showMaster && (
          <div className="grid">
            {Object.entries(DPHARM_EQUIPMENT).map(([lab, items]) => (
              <div key={lab} className="col-12 md:col-6">
                <Panel header={`D.Pharm — ${lab.replace(/_/g,' ').toUpperCase()}`} toggleable className="mb-3">
                  <DataTable value={items} className="p-datatable-sm" showGridlines>
                    <Column field="id" header="ID" className="font-mono text-xs" style={{width:'100px'}}/>
                    <Column field="label" header="Equipment Item" className="text-sm" style={{minWidth:'200px'}}/>
                    <Column field="minQty" header="Min. Qty" className="text-center font-bold" style={{width:'80px'}}/>
                    <Column field="ref" header="Ref." className="text-xs text-color-secondary" style={{width:'140px'}}/>
                  </DataTable>
                </Panel>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Institution compliance table */}
      <div className="col-12">
        <div className="card p-0">
          <div className="flex flex-wrap gap-2 p-3 border-bottom-1 surface-border justify-content-between">
            <Button label="Export Gap Report" icon="pi pi-file-export" className="p-button-outlined p-button-sm"/>
            <div className="flex gap-2">
              <Dropdown value={courseFilter} options={['All','B.Pharm','D.Pharm','M.Pharm','Pharm.D']} onChange={e=>setCourseFilter(e.value)} className="text-sm" style={{width:'130px'}}/>
              <span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Search…" className="p-inputtext-sm" style={{width:'180px'}}/></span>
            </div>
          </div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10} rowClassName={row=>row.gaps>10?'bg-red-50':''}>
            <Column field="institution" header="Institution" body={row=><div><div className="font-medium text-sm">{row.institution}</div><div className="text-color-secondary text-xs">{row.state}</div></div>} style={{minWidth:'180px'}}/>
            <Column field="course" header="Course" body={row=><Tag value={row.course} severity="info" className="text-xs"/>} style={{width:'90px'}}/>
            <Column field="required" header="Required" className="font-mono text-center" style={{width:'80px'}}/>
            <Column field="submitted" header="Submitted" className="font-mono text-center" style={{width:'90px'}}/>
            <Column field="gaps" header="Gaps" body={row=><Tag value={row.gaps>0?`${row.gaps} gaps`:'None'} severity={row.gaps>0?'danger':'success'} className="text-xs"/>} style={{width:'90px'}}/>
            <Column field="photos" header="Photo Evidence" body={row=><Tag value={row.photos} severity={row.photos==='All approved'?'success':row.photos.includes('rejected')?'danger':'warning'} className="text-xs"/>} style={{width:'120px'}}/>
            <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'140px'}}/>
            <Column header="Actions" body={()=><div className="flex gap-1"><Button icon="pi pi-eye" className="p-button-text p-button-sm"/><Button icon="pi pi-check-circle" className="p-button-text p-button-sm" tooltip="Validate (FR-EQ-03)"/></div>} style={{width:'90px'}}/>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default EquipmentPage;
