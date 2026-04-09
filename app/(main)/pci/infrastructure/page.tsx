'use client';
import { DataTable, Column, Tag, Button, Panel, SelectButton, InputText, Toast, Message, Divider } from '../../../../lib/prime';
import React, { useState, useCallback, useRef } from 'react';
import { useInfrastructureStore } from '../../../../lib/useInfrastructureStore';
import { COURSES }                from '../../../../lib/regulations';
import {
  BPHARM_ROOMS, BPHARM_LABS, BPHARM_LAB_FITTINGS, BPHARM_INFRA_CHECKLIST,
  DPHARM_LABS, DPHARM_EQUIPMENT, DPHARM_INFRA_CHECKLIST,
} from '../../../../lib/infrastructure';

const YesNoToggle = ({ value, onChange }) => (
  <div className="flex gap-1">
    <Button label="Yes" icon="pi pi-check" className={`p-button-sm ${value === true ? 'p-button-success' : 'p-button-outlined p-button-secondary'}`}
      style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => onChange(value === true ? null : true)} />
    <Button label="No" icon="pi pi-times" className={`p-button-sm ${value === false ? 'p-button-danger' : 'p-button-outlined p-button-secondary'}`}
      style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => onChange(value === false ? null : false)} />
  </div>
);

const availTag = (v) =>
  v === true  ? <Tag value="Available"     severity="success"   className="text-xs" /> :
  v === false ? <Tag value="Not Available" severity="danger"    className="text-xs" /> :
                <Tag value="Not Entered"   severity="secondary" className="text-xs" />;

const InfrastructurePage = () => {
  const store = useInfrastructureStore('bpharm');
  const toast = useRef(null);
  const [activeEquipTab, setActiveEquipTab] = useState('');

  const showToast = useCallback((msg, severity = 'success') => {
    toast.current?.show({ severity, summary: 'Done', detail: msg, life: 3000 });
  }, []);

  const { form, activeCourse, compliance, equipmentDeficiencies } = store;

  const regText = activeCourse === 'bpharm'
    ? 'B.Pharm Course Regulations 2014, Appendix-A, Clause 5 & 6 (Gazette No. 362) — Min. 900 sq. ft. per lab incl. Preparation Room'
    : 'D.Pharm ER-2020, Appendix-3 (Gazette No. 435) — Equipment counts for batch of 20 students · Scale proportionally for larger intake';

  return (
    <div className="grid">
      <Toast ref={toast} />

      {/* Reg strip */}
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>Regulatory basis:</b> {regText}</span>
        </div>
      </div>

      {/* Course selector */}
      <div className="col-12">
        <div className="card py-2 flex flex-wrap align-items-center gap-3">
          <span className="font-medium text-sm">Course:</span>
          <SelectButton
            value={activeCourse}
            options={[{label:'B.Pharm',value:'bpharm'},{label:'D.Pharm',value:'dpharm'}]}
            onChange={e => { if (e.value) { store.changeCourse(e.value); showToast(`Switched to ${e.value.toUpperCase()}`, 'info'); } }}
          />
          <Button label="Save Draft" icon="pi pi-save" className="p-button-outlined p-button-sm ml-auto"
            onClick={() => { store.setLastSaved('just now'); showToast('Draft saved'); }} />
        </div>
      </div>

      {/* Compliance summary */}
      <div className="col-6 md:col-3"><div className="card text-center py-3"><div className="text-3xl font-bold text-blue-400">{compliance.total}</div><div className="text-color-secondary text-xs">Total Checks</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center py-3"><div className="text-3xl font-bold text-green-400">{compliance.passed}</div><div className="text-color-secondary text-xs">Passed</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center py-3"><div className="text-3xl font-bold" style={{color: compliance.failed > 0 ? 'var(--red-400)' : 'var(--green-400)'}}>{compliance.failed}</div><div className="text-color-secondary text-xs">Deficiencies</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center py-3"><div className="text-3xl font-bold" style={{color: compliance.pct >= 90 ? 'var(--green-400)' : compliance.pct >= 70 ? 'var(--yellow-400)' : 'var(--red-400)'}}>{compliance.pct}%</div><div className="text-color-secondary text-xs">Compliance</div></div></div>

      {compliance.failed > 0 && <div className="col-12"><Message severity="error" text={`${compliance.failed} deficiencies detected — resolve before SIF submission`} className="w-full" /></div>}
      {compliance.failed === 0 && compliance.total > 0 && <div className="col-12"><Message severity="success" text="All checks passed — infrastructure is compliant and ready for submission" className="w-full" /></div>}

      {/* Auto-detected deficiencies */}
      {compliance.deficiencies && compliance.deficiencies.length > 0 && (
        <div className="col-12">
          <Panel header={<div className="flex align-items-center gap-2"><i className="pi pi-exclamation-triangle text-red-400"/><span className="font-semibold">Auto-Detected Deficiencies</span><Tag value={`${compliance.deficiencies.length}`} severity="danger" className="text-xs"/></div>} toggleable className="mb-3">
            <DataTable value={compliance.deficiencies} className="p-datatable-sm" showGridlines>
              <Column field="section" header="Section" body={d => <Tag value={d.section} severity="secondary" className="text-xs"/>} style={{width:'120px'}}/>
              <Column field="label"   header="Item"    className="font-medium text-sm" style={{minWidth:'200px'}}/>
              <Column field="detail"  header="Detail"  className="text-sm text-color-secondary"/>
              <Column field="ref"     header="Ref."    className="text-xs text-color-secondary" style={{width:'150px'}}/>
            </DataTable>
          </Panel>
        </div>
      )}

      {/* B.Pharm Rooms */}
      {activeCourse === 'bpharm' && (
        <div className="col-12">
          <Panel header={
            <div className="flex align-items-center gap-2">
              <i className="pi pi-building text-blue-400"/>
              <span className="font-semibold">Rooms & Facilities</span>
              <Tag value={`${BPHARM_ROOMS.filter(r => r.mandatory && form.rooms[r.id]?.available === true).length} / ${BPHARM_ROOMS.filter(r => r.mandatory).length} mandatory`}
                severity={BPHARM_ROOMS.filter(r => r.mandatory).every(r => form.rooms[r.id]?.available === true) ? 'success' : 'warning'} className="text-xs"/>
              <span className="text-xs text-color-secondary ml-2">Appendix-A, Cl. 5</span>
            </div>
          } toggleable className="mb-3">
            <DataTable value={BPHARM_ROOMS} className="p-datatable-sm" showGridlines>
              <Column header="Room / Facility" style={{minWidth:'240px'}} body={r => (
                <div>
                  <div className="font-medium text-sm flex align-items-center gap-2">{r.label}<Tag value={r.mandatory?'Mandatory':'Conditional'} severity={r.mandatory?'info':'secondary'} className="text-xs"/></div>
                  {r.note && <div className="text-xs text-color-secondary mt-1">{r.note}</div>}
                </div>
              )}/>
              <Column header="Min. Count" body={r => <span className="font-mono">{r.minCount||'—'}</span>} style={{width:'100px'}}/>
              <Column header="Min. Area"  body={r => r.minAreaPerUnit ? <span className="font-mono">{r.minAreaPerUnit} {r.areaUnit}</span> : <span className="text-color-secondary">—</span>} style={{width:'130px'}}/>
              <Column header="Available?" style={{width:'180px'}} body={r => <YesNoToggle value={form.rooms[r.id]?.available??null} onChange={v=>store.updateRoom(r.id,'available',v)}/>}/>
              <Column header="Area (sq. ft.)" style={{width:'140px'}} body={r => <InputText value={form.rooms[r.id]?.area||''} onChange={e=>store.updateRoom(r.id,'area',e.target.value)} className="p-inputtext-sm w-full" placeholder="Enter area" type="number"/>}/>
              <Column header="Status" style={{width:'130px'}} body={r => availTag(form.rooms[r.id]?.available??null)}/>
              <Column field="ref" header="Ref." className="text-xs text-color-secondary" style={{width:'140px'}}/>
            </DataTable>

            <Divider className="my-3"/>
            <div className="font-semibold text-sm mb-2 flex align-items-center gap-2">
              <i className="pi pi-wrench text-blue-400"/> Lab Fittings (Mandatory)
              <Tag value={`${BPHARM_LAB_FITTINGS.filter(f=>f.mandatory&&form.fittings[f.id]?.available===true).length} / ${BPHARM_LAB_FITTINGS.filter(f=>f.mandatory).length}`}
                severity={BPHARM_LAB_FITTINGS.filter(f=>f.mandatory).every(f=>form.fittings[f.id]?.available===true)?'success':'warning'} className="text-xs"/>
            </div>
            <div className="grid">
              {BPHARM_LAB_FITTINGS.map(f => (
                <div key={f.id} className="col-12 md:col-6 lg:col-4">
                  <div className={`card border-1 ${form.fittings[f.id]?.available===false?'border-red-400':form.fittings[f.id]?.available===true?'border-green-400':'surface-border'}`} style={{padding:'12px'}}>
                    <div className="font-medium text-sm mb-2">{f.label}</div>
                    <div className="flex align-items-center justify-content-between">
                      <YesNoToggle value={form.fittings[f.id]?.available??null} onChange={v=>store.updateFitting(f.id,v)}/>
                      {availTag(form.fittings[f.id]?.available??null)}
                    </div>
                    <div className="text-xs text-color-secondary mt-1">{f.ref}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {/* Labs — both courses */}
      <div className="col-12">
        {(() => {
          const labs     = activeCourse === 'bpharm' ? BPHARM_LABS : DPHARM_LABS;
          const formLabs = form.labs || {};
          const unit     = activeCourse === 'bpharm' ? 'sq. ft.' : 'sq. mt.';
          const avail    = labs.filter(l => formLabs[l.id]?.available === true).length;
          const subtitle = activeCourse === 'bpharm'
            ? 'Appendix-A, Cl. 5 — Min. 8 labs · 900 sq. ft. incl. Preparation Room'
            : 'Appendix-3, ER-2020 — 4 mandatory labs + Machine Room + Model Pharmacy';
          return (
            <Panel header={
              <div className="flex align-items-center gap-2">
                <i className="pi pi-desktop text-blue-400"/>
                <span className="font-semibold">Laboratories</span>
                <Tag value={`${avail} / ${labs.length}`} severity={avail===labs.length?'success':avail>=labs.length*0.75?'warning':'danger'} className="text-xs"/>
                <span className="text-xs text-color-secondary">{subtitle}</span>
              </div>
            } toggleable className="mb-3">
              <DataTable value={labs} className="p-datatable-sm" showGridlines rowClassName={l=>formLabs[l.id]?.available===false?'bg-red-50':''}>
                <Column header="Laboratory" style={{minWidth:'220px'}} body={l=>(
                  <div><div className="font-medium text-sm">{l.label}</div>{l.note&&<div className="text-xs text-color-secondary mt-1">{l.note}</div>}</div>
                )}/>
                <Column header={`Min. Area (${unit})`} style={{width:'160px'}} body={l=>l.minArea?<span className="font-mono font-bold">{l.minArea} {unit}</span>:<span className="text-color-secondary">—</span>}/>
                <Column header="Available?" style={{width:'180px'}} body={l=><YesNoToggle value={formLabs[l.id]?.available??null} onChange={v=>store.updateLab(l.id,'available',v)}/>}/>
                <Column header={`Area (${unit})`} style={{width:'150px'}} body={l=>{
                  const val=formLabs[l.id]||{};
                  const ae=parseFloat(val.area);
                  const ok=!l.minArea||isNaN(ae)||ae>=l.minArea;
                  return <div>
                    <InputText value={val.area||''} onChange={e=>store.updateLab(l.id,'area',e.target.value)} className={`p-inputtext-sm w-full ${!ok?'p-invalid':''}`} placeholder={l.minArea?`Min. ${l.minArea}`:''} type="number"/>
                    {!ok&&<div className="text-xs text-red-400 mt-1">{ae} &lt; {l.minArea} {unit}</div>}
                  </div>;
                }}/>
                <Column header="Status" style={{width:'130px'}} body={l=>availTag(formLabs[l.id]?.available??null)}/>
                <Column field="ref" header="Ref." className="text-xs text-color-secondary" style={{width:'140px'}}/>
              </DataTable>
            </Panel>
          );
        })()}
      </div>

      {/* Equipment — D.Pharm only */}
      {activeCourse === 'dpharm' && (
        <div className="col-12">
          {(() => {
            const equipment=form.equipment||{};
            const allItems=Object.values(DPHARM_EQUIPMENT).flat();
            const filled=allItems.filter(item=>item.qtyType==='numeric'&&!isNaN(parseInt(equipment[item.id]?.qty??'',10))).length;
            const defCount=Object.values(equipmentDeficiencies).flat().length;
            const currentTab=activeEquipTab||DPHARM_LABS[0]?.id||'';
            return (
              <Panel header={
                <div className="flex align-items-center gap-2">
                  <i className="pi pi-cog text-green-400"/>
                  <span className="font-semibold">Equipment Inventory — D.Pharm</span>
                  <Tag value={defCount>0?`${defCount} deficiencies`:`${filled}/${allItems.length} entered`} severity={defCount>0?'danger':filled>0?'success':'warning'} className="text-xs"/>
                  <span className="text-xs text-color-secondary">Appendix-3, ER-2020</span>
                </div>
              } toggleable className="mb-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {DPHARM_LABS.map(lab=>{
                    const labDef=(equipmentDeficiencies[lab.id]||[]).length;
                    return <Button key={lab.id} label={`${lab.label.replace(/Lab \d — /,'')}${labDef>0?` (${labDef})`:''}}`}
                      className={`p-button-sm ${(activeEquipTab||DPHARM_LABS[0]?.id)===lab.id?'':'p-button-outlined'} ${labDef>0?'p-button-warning':''}`}
                      onClick={()=>setActiveEquipTab(lab.id)}/>;
                  })}
                </div>
                {DPHARM_LABS.map(lab=>{
                  if(currentTab!==lab.id) return null;
                  const items=DPHARM_EQUIPMENT[lab.id]||[];
                  const labDef=equipmentDeficiencies[lab.id]||[];
                  return <div key={lab.id}>
                    {lab.note&&<Message severity="info" text={lab.note} className="w-full mb-3"/>}
                    {labDef.length>0&&<Message severity="error" className="w-full mb-3" text={`${labDef.length} deficiencie${labDef.length!==1?'s':''}: ${labDef.map(d=>`${d.label} (have ${d.actual}, need ${d.required})`).join('; ')}`}/>}
                    <DataTable value={items} className="p-datatable-sm" showGridlines rowClassName={item=>labDef.some(d=>d.itemId===item.id)?'bg-red-50':''}>
                      <Column field="label" header="Equipment Item" style={{minWidth:'220px'}}/>
                      <Column header="Min. Qty" style={{width:'120px'}} body={item=><span className="font-mono font-bold">{item.minQty}</span>}/>
                      <Column header="Qty Available" style={{width:'160px'}} body={item=>{
                        if(item.qtyType==='boolean'){
                          return <YesNoToggle value={equipment[item.id]?.qty==='yes'?true:equipment[item.id]?.qty==='no'?false:null}
                            onChange={v=>store.updateEquipment(item.id,'qty',v===true?'yes':v===false?'no':'')}/>;
                        }
                        const entered=parseInt(equipment[item.id]?.qty??'',10);
                        const short=!isNaN(entered)&&entered<item.minQty;
                        return <InputText value={equipment[item.id]?.qty||''} onChange={e=>store.updateEquipment(item.id,'qty',e.target.value)}
                          className={`p-inputtext-sm w-full font-mono ${short?'p-invalid':''}`} type="number" placeholder={`Min. ${item.minQty}`}/>;
                      }}/>
                      <Column header="Status" style={{width:'140px'}} body={item=>{
                        const entered=parseInt(equipment[item.id]?.qty??'',10);
                        if(isNaN(entered)) return <Tag value="Not Entered" severity="secondary" className="text-xs"/>;
                        return entered>=item.minQty?<Tag value="Compliant" severity="success" className="text-xs"/>:<Tag value={`Short by ${item.minQty-entered}`} severity="danger" className="text-xs"/>;
                      }}/>
                      <Column field="ref" header="Ref." className="text-xs text-color-secondary" style={{width:'140px'}}/>
                    </DataTable>
                  </div>;
                })}
              </Panel>
            );
          })()}
        </div>
      )}

      {/* Checklist */}
      <div className="col-12">
        {(() => {
          const items=activeCourse==='bpharm'?BPHARM_INFRA_CHECKLIST:DPHARM_INFRA_CHECKLIST;
          const checklist=form.checklist||{};
          const OPTS=[{label:'✓ Compliant',value:'compliant'},{label:'✗ Non-Compliant',value:'non_compliant'},{label:'N/A',value:'na'},{label:'WIP',value:'wip'}];
          const compliantCt=items.filter(c=>checklist[c.id]==='compliant').length;
          const failedCt=items.filter(c=>checklist[c.id]==='non_compliant').length;
          return (
            <Panel header={
              <div className="flex align-items-center gap-2">
                <i className="pi pi-check-square text-green-400"/>
                <span className="font-semibold">Infrastructure Compliance Checklist</span>
                <Tag value={`${compliantCt} compliant`} severity="success" className="text-xs"/>
                {failedCt>0&&<Tag value={`${failedCt} failed`} severity="danger" className="text-xs"/>}
              </div>
            } toggleable className="mb-3">
              <DataTable value={items} className="p-datatable-sm" showGridlines rowClassName={c=>checklist[c.id]==='non_compliant'?'bg-red-50':''}>
                <Column field="text" header="Compliance Item" style={{minWidth:'300px'}}/>
                <Column field="ref"  header="Ref." className="text-xs text-color-secondary" style={{width:'160px'}}/>
                <Column header="Status" style={{width:'360px'}} body={c=>(
                  <div className="flex gap-1 flex-wrap">
                    {OPTS.map(opt=>(
                      <Button key={opt.value} label={opt.label}
                        className={`p-button-sm ${checklist[c.id]===opt.value?(opt.value==='compliant'?'p-button-success':opt.value==='non_compliant'?'p-button-danger':'p-button-secondary'):'p-button-outlined p-button-secondary'}`}
                        style={{padding:'3px 8px',fontSize:'11px'}}
                        onClick={()=>store.updateChecklist(c.id,opt.value)}/>
                    ))}
                  </div>
                )}/>
              </DataTable>
            </Panel>
          );
        })()}
      </div>
    </div>
  );
};
export default InfrastructurePage;
