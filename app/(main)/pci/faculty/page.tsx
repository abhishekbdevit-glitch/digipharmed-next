'use client';
import { DataTable, Column, Tag, Button, Dialog, InputText, Dropdown, SelectButton, Panel, Toast, Divider, ProgressBar, Message } from '../../../../lib/prime';
import React, { useState, useCallback, useRef } from 'react';
import {useFacultyStore} from "../../../../lib/useFacultyStore"
import {
  COURSES, DEPARTMENTS, DESIGNATIONS,
  DEPT_LABELS, DESIG_LABELS, WORKLOAD,
  NON_TEACHING_REQUIREMENTS,
} from '../../../../lib/regulations';

// ── Constants ────────────────────────────────────────────────────────────────
const INTAKE_OPTIONS = [
  { label: '60 Seats', value: 60 },
  { label: '100 Seats', value: 100 },
];

const MATRIX_ROWS = [
  [DEPARTMENTS.PHARMACEUTICS,     DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACEUTICS,     DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACEUTICS,     DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARM_CHEMISTRY,   DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARM_CHEMISTRY,   DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARM_CHEMISTRY,   DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARMACOLOGY,      DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACOLOGY,      DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACOLOGY,      DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARMACOGNOSY,     DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACOGNOSY,     DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACOGNOSY,     DESIGNATIONS.LECTURER],
  [DEPARTMENTS.PHARMACY_PRACTICE, DESIGNATIONS.PROFESSOR],
  [DEPARTMENTS.PHARMACY_PRACTICE, DESIGNATIONS.ASST_PROF],
  [DEPARTMENTS.PHARMACY_PRACTICE, DESIGNATIONS.LECTURER],
];

const DEPT_OPTIONS = Object.entries(DEPT_LABELS).map(([value, label]) => ({ value, label }));
const DESIG_OPTIONS = [
  { value: DESIGNATIONS.HOI,        label: DESIG_LABELS[DESIGNATIONS.HOI] },
  { value: DESIGNATIONS.PROFESSOR,  label: DESIG_LABELS[DESIGNATIONS.PROFESSOR] },
  { value: DESIGNATIONS.ASSOC_PROF, label: DESIG_LABELS[DESIGNATIONS.ASSOC_PROF] },
  { value: DESIGNATIONS.ASST_PROF,  label: DESIG_LABELS[DESIGNATIONS.ASST_PROF] },
  { value: DESIGNATIONS.LECTURER,   label: DESIG_LABELS[DESIGNATIONS.LECTURER] },
];
const EMP_OPTIONS   = [{ value: 'full-time', label: 'Full-time' }, { value: 'part-time', label: 'Part-time' }];
const SPC_OPTIONS   = [{ value: 'valid', label: 'Valid' }, { value: 'pending', label: 'Pending' }, { value: 'expired', label: 'Expired' }];
const STATUS_OPTIONS = [{ value: 'verified', label: 'Verified' }, { value: 'qual_review', label: 'Qual. Review' }, { value: 'pending', label: 'Pending' }];

const EMPTY_FORM = { name: '', councilNo: '', department: '', designation: '', ugQual: '', pgQual: '', phd: '', employmentType: 'full-time', experienceYears: '', dateOfJoining: '', spcRegistration: 'pending' };

function qualHint(dept, desig) {
  if (desig === DESIGNATIONS.PROFESSOR || desig === DESIGNATIONS.HOI) return 'M.Pharm + Ph.D (mandatory)';
  if (desig === DESIGNATIONS.ASSOC_PROF) return 'M.Pharm + Ph.D within 7 yrs';
  const m: Record<string, string> = {
    [DEPARTMENTS.PHARMACEUTICS]: 'M.Pharm (Pharmaceutics)', [DEPARTMENTS.PHARM_CHEMISTRY]: 'M.Pharm (Pharm. Chem.)',
    [DEPARTMENTS.PHARMACOLOGY]: 'M.Pharm (Pharmacology)', [DEPARTMENTS.PHARMACOGNOSY]: 'M.Pharm (Pharmacognosy)',
    [DEPARTMENTS.PHARMACY_PRACTICE]: 'M.Pharm / Pharm.D',
  };
  return (m[dept] || 'M.Pharm') + '; 1st Class B.Pharm';
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const FacultyPage = () => {
  const store   = useFacultyStore();
  const toast   = useRef<any>(null);
  const [addDlg,    setAddDlg]    = useState(false);
  const [editDlg,   setEditDlg]   = useState(false);
  const [editFacId, setEditFacId] = useState<string | null>(null);
  const [form,      setForm]      = useState<any>(EMPTY_FORM);
  const [prefillDept, setPrefillDept] = useState('');
  const [prefillDesig, setPrefillDesig] = useState('');

  const showToast = useCallback((msg: string, severity: 'success' | 'info' | 'warn' | 'error' = 'success') => {
    toast.current?.show({ severity, summary: severity === 'error' ? 'Error' : 'Done', detail: msg, life: 3000 });
  }, []);

  function openAdd(dept = '', desig = '') {
    setForm({ ...EMPTY_FORM, department: dept, designation: desig });
    setPrefillDept(dept); setPrefillDesig(desig);
    setAddDlg(true);
  }

  function openEdit(fac: any) {
    setForm({
      name: fac.name, councilNo: fac.councilNo, department: fac.department,
      designation: fac.designation, ugQual: fac.qualification?.ug || '',
      pgQual: fac.qualification?.pg || '', phd: fac.qualification?.phd || '',
      employmentType: fac.employmentType, experienceYears: fac.experienceYears,
      dateOfJoining: fac.dateOfJoining || '', spcRegistration: fac.spcRegistration,
    });
    setEditFacId(fac.id); setEditDlg(true);
  }

  function handleSave() {
    if (!form.name.trim()) { showToast('Faculty name is required', 'error'); return; }
    if (!form.councilNo.trim()) { showToast('Council registration number is required', 'error'); return; }
    if (!form.department) { showToast('Department is required', 'error'); return; }
    if (!form.designation) { showToast('Designation is required', 'error'); return; }
    store.addFaculty({
      name: form.name.trim(), councilNo: form.councilNo.trim(),
      department: form.department, designation: form.designation,
      qualification: { ug: form.ugQual || null, pg: form.pgQual || null, phd: form.phd || null },
      experienceYears: parseFloat(form.experienceYears) || 0,
      dateOfJoining: form.dateOfJoining || null, employmentType: form.employmentType,
      spcRegistration: form.spcRegistration || 'pending', status: 'pending', courses: [store.course],
    });
    setAddDlg(false); showToast('Faculty member added');
  }

  function handleUpdate() {
    if (!editFacId) return;
    store.updateFaculty(editFacId, {
      name: form.name, councilNo: form.councilNo, department: form.department,
      designation: form.designation, experienceYears: parseFloat(form.experienceYears) || 0,
      employmentType: form.employmentType, spcRegistration: form.spcRegistration,
      qualification: { ug: form.ugQual || null, pg: form.pgQual || null, phd: form.phd || null },
    });
    setEditDlg(false); showToast('Faculty record updated');
  }

  const { compliance, filteredFaculty, slotCounts, requirements, ntCounts } = store;
  const hoi = filteredFaculty.find((f: any) => f.designation === DESIGNATIONS.HOI);

  // ── Compliance summary ─────────────────────────────────────────────────────
  const ComplianceSummary = () => (
    <div className="grid mb-3">
      {[
        { label: 'Required (incl. HOI)', value: compliance.totalRequired, color: 'var(--blue-400)' },
        { label: 'Slots Filled',          value: compliance.totalFilled,   color: 'var(--green-400)' },
        { label: 'Slots Vacant',          value: compliance.totalVacant,   color: compliance.totalVacant > 0 ? 'var(--orange-400)' : 'var(--green-400)' },
        { label: 'Qual. Pending',         value: compliance.qualPending,   color: compliance.qualPending > 0 ? 'var(--yellow-400)' : 'var(--green-400)' },
        { label: 'NT Staff Gaps',         value: compliance.ntVacant,      color: compliance.ntVacant > 0 ? 'var(--red-400)' : 'var(--green-400)' },
        { label: 'Compliance %',          value: `${compliance.pct}%`,     color: compliance.pct >= 90 ? 'var(--green-400)' : compliance.pct >= 70 ? 'var(--yellow-400)' : 'var(--red-400)' },
      ].map(s => (
        <div key={s.label} className="col-6 md:col-2">
          <div className="card text-center py-3">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-color-secondary text-xs">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // ── HOI Section ────────────────────────────────────────────────────────────
  const HOISection = () => (
    <Panel header={
      <div className="flex align-items-center justify-content-between w-full">
        <div className="flex align-items-center gap-2">
          <i className="pi pi-user text-blue-400" />
          <span className="font-semibold">Head of Institution / Director / Principal</span>
          <Tag value={hoi ? '1 / 1' : '0 / 1'} severity={hoi ? 'success' : 'danger'} className="text-xs" />
        </div>
        <span className="text-xs text-color-secondary">Appendix-A, Cl. 3(ii) · Mandatory · First Class B.Pharm + M.Pharm + Ph.D · 15 yrs exp.</span>
      </div>
    } className="mb-3" toggleable>
      {hoi ? (
        <DataTable value={[hoi]} className="p-datatable-sm" showGridlines>
          <Column header="Name" body={(r: any) => <div><div className="font-medium">{r.name}</div><div className="text-xs text-color-secondary font-mono">{r.councilNo}</div></div>} />
          <Column header="Qualification" body={(r: any) => (
            <div className="flex align-items-center gap-2">
              <i className={`pi ${r.qualification?.phd ? 'pi-check-circle text-green-400' : 'pi-exclamation-circle text-orange-400'}`} />
              <span className="text-sm">{[r.qualification?.pg, r.qualification?.phd].filter(Boolean).join(' + ')}</span>
            </div>
          )} />
          <Column header="Experience" body={(r: any) => <span>{r.experienceYears} yrs</span>} style={{ width: '110px' }} />
          <Column header="Employment" body={(r: any) => <Tag value={r.employmentType} severity={r.employmentType === 'full-time' ? 'success' : 'warning'} className="text-xs" />} style={{ width: '110px' }} />
          <Column header="SPC Reg." body={(r: any) => <Tag value={r.spcRegistration} severity={r.spcRegistration === 'valid' ? 'success' : 'warning'} className="text-xs" />} style={{ width: '100px' }} />
          <Column header="Status" body={(r: any) => <Tag value={r.status} severity={r.status === 'verified' ? 'success' : 'warning'} className="text-xs" />} style={{ width: '100px' }} />
          <Column header="" body={(r: any) => <Button icon="pi pi-pencil" className="p-button-sm p-button-text" onClick={() => openEdit(r)} />} style={{ width: '60px' }} />
        </DataTable>
      ) : (
        <Message severity="error" text="No Head of Institution appointed. This is a mandatory requirement." className="w-full mb-3" />
      )}
      {!hoi && <Button label="+ Appoint HOI" icon="pi pi-plus" className="p-button-sm" onClick={() => openAdd('', DESIGNATIONS.HOI)} />}
    </Panel>
  );

  // ── Requirement Matrix ─────────────────────────────────────────────────────
  const RequirementMatrix = () => {
    const totalFilled   = Object.values(slotCounts as Record<string, number>).reduce((s, v) => s + v, 0);
    const totalRequired = Object.values(requirements as Record<string, number>).reduce((s, v) => s + v, 0);
    const totalVacant   = Math.max(0, totalRequired - totalFilled);
    let lastDept = '';
    return (
      <Panel header={
        <div className="flex align-items-center justify-content-between w-full">
          <div className="flex align-items-center gap-2">
            <i className="pi pi-table text-blue-400" />
            <span className="font-semibold">Teaching Faculty — Requirement Matrix</span>
            <Tag value={`${totalFilled} / ${totalRequired}`} severity={totalVacant === 0 ? 'success' : totalVacant <= 3 ? 'warning' : 'danger'} className="text-xs" />
          </div>
          <span className="text-xs text-color-secondary">Switch intake above to recalculate</span>
        </div>
      } className="mb-3" toggleable>
        <DataTable value={MATRIX_ROWS.map(([dept, desig]) => {
          const key = `${dept}_${desig}`;
          const required = (requirements as Record<string, number>)[key] ?? 0;
          const filled   = (slotCounts as Record<string, number>)[key]   ?? 0;
          const vacant   = Math.max(0, required - filled);
          const isNewDept = dept !== lastDept;
          if (isNewDept) lastDept = dept;
          return { dept, desig, key, required, filled, vacant, isNewDept };
        })} className="p-datatable-sm" showGridlines
          rowClassName={(r: any) => r.vacant > 0 ? 'bg-red-50' : ''}>
          <Column header="Department" style={{ minWidth: '160px' }} body={(r: any) => r.isNewDept ? <span className="font-semibold text-sm">{DEPT_LABELS[r.dept]}</span> : null} />
          <Column header="Designation" style={{ minWidth: '160px' }} body={(r: any) => (
            <div>
              <div className="text-sm">{DESIG_LABELS[r.desig]}</div>
              {r.dept === DEPARTMENTS.PHARMACY_PRACTICE && r.desig === DESIGNATIONS.PROFESSOR && (
                <div className="text-xs text-color-secondary">{store.intake === 60 ? '(not required at 60)' : '(required at 100)'}</div>
              )}
            </div>
          )} />
          <Column header="Required" style={{ width: '90px' }} body={(r: any) => <span className={`font-mono font-bold ${r.required === 0 ? 'text-color-secondary' : ''}`}>{r.required === 0 ? '—' : r.required}</span>} />
          <Column header="Filled" style={{ width: '80px' }} body={(r: any) => r.required > 0 ? <span className={`font-mono font-bold ${r.filled >= r.required ? 'text-green-400' : 'text-red-400'}`}>{r.filled}</span> : <span className="text-color-secondary">—</span>} />
          <Column header="Vacant" style={{ width: '80px' }} body={(r: any) => r.required > 0 ? <Tag value={`${r.vacant}`} severity={r.vacant === 0 ? 'success' : 'danger'} className="text-xs" /> : <span className="text-color-secondary">—</span>} />
          <Column header="Workload" style={{ width: '100px' }} body={(r: any) => {
            const hrs = WORKLOAD[r.desig as keyof typeof WORKLOAD];
            return <Tag value={hrs ? `${hrs} hrs/wk` : 'Admin'} severity="info" className="text-xs" />;
          }} />
          <Column header="Qualification" className="text-xs text-color-secondary" style={{ minWidth: '200px' }} body={(r: any) => <span className="text-xs">{qualHint(r.dept, r.desig)}</span>} />
          <Column header="" style={{ width: '80px' }} body={(r: any) => (
            <Button label="+ Add" className="p-button-sm p-button-text p-button-warning" onClick={() => openAdd(r.dept, r.desig)} />
          )} />
        </DataTable>
      </Panel>
    );
  };

  // ── Faculty Roster ─────────────────────────────────────────────────────────
  const FacultyRoster = () => (
    <Panel header={
      <div className="flex align-items-center justify-content-between w-full">
        <div className="flex align-items-center gap-2">
          <i className="pi pi-list text-green-400" />
          <span className="font-semibold">Faculty Roster</span>
          <Tag value={`${filteredFaculty.length} entries`} severity="info" className="text-xs" />
        </div>
        <Button label="+ Add Faculty" icon="pi pi-plus" className="p-button-sm" onClick={() => openAdd()} />
      </div>
    } className="mb-3" toggleable>
      <DataTable value={filteredFaculty} className="p-datatable-sm" showGridlines paginator rows={10}
        emptyMessage="No faculty added yet">
        <Column header="Faculty" style={{ minWidth: '200px' }} body={(r: any) => (
          <div><div className="font-medium text-sm">{r.name}</div><div className="text-xs font-mono text-color-secondary">{r.councilNo}</div></div>
        )} />
        <Column header="Dept." style={{ width: '160px' }} body={(r: any) => <span className="text-xs">{DEPT_LABELS[r.department] || r.department}</span>} />
        <Column header="Designation" style={{ width: '150px' }} body={(r: any) => <span className="text-xs">{DESIG_LABELS[r.designation] || r.designation}</span>} />
        <Column header="Qualification" style={{ width: '180px' }} body={(r: any) => (
          <div className="flex align-items-center gap-1">
            <i className={`pi ${r.qualification?.phd === 'Ph.D' ? 'pi-check-circle text-green-400' : r.qualification?.pg ? 'pi-info-circle text-yellow-400' : 'pi-times-circle text-red-400'} text-sm`} />
            <span className="text-xs">{[r.qualification?.pg, r.qualification?.phd].filter(Boolean).join(' + ') || 'Not entered'}</span>
          </div>
        )} />
        <Column header="Exp." style={{ width: '70px' }} body={(r: any) => <span className="text-xs">{r.experienceYears} yrs</span>} />
        <Column header="Employment" style={{ width: '110px' }} body={(r: any) => <Tag value={r.employmentType} severity={r.employmentType === 'full-time' ? 'success' : 'warning'} className="text-xs" />} />
        <Column header="SPC" style={{ width: '90px' }} body={(r: any) => <Tag value={r.spcRegistration} severity={r.spcRegistration === 'valid' ? 'success' : 'warning'} className="text-xs" />} />
        <Column header="Status" style={{ width: '100px' }} body={(r: any) => <Tag value={r.status === 'qual_review' ? 'Qual. Review' : r.status} severity={r.status === 'verified' ? 'success' : 'warning'} className="text-xs" />} />
        <Column header="" style={{ width: '90px' }} body={(r: any) => (
          <div className="flex gap-1">
            <Button icon="pi pi-pencil" className="p-button-sm p-button-text" onClick={() => openEdit(r)} />
            <Button icon="pi pi-trash" className="p-button-sm p-button-danger p-button-text" onClick={() => { store.removeFaculty(r.id); showToast('Faculty member removed', 'info'); }} />
          </div>
        )} />
      </DataTable>
    </Panel>
  );

  // ── Non-Teaching Staff ─────────────────────────────────────────────────────
  const NonTeachingStaff = () => {
    const totalRequired = NON_TEACHING_REQUIREMENTS.reduce((s: number, r: any) => s + r.minCount, 0);
    const totalFilled   = NON_TEACHING_REQUIREMENTS.reduce((s: number, r: any) => s + Math.min(ntCounts[r.id] || 0, r.minCount), 0);
    return (
      <Panel header={
        <div className="flex align-items-center gap-2">
          <i className="pi pi-users text-yellow-400" />
          <span className="font-semibold">Non-Teaching Staff — B.Pharm</span>
          <Tag value={`${totalFilled} / ${totalRequired}`} severity={totalFilled >= totalRequired ? 'success' : 'warning'} className="text-xs" />
          <span className="text-xs text-color-secondary ml-2">Appendix-A, Clause 4</span>
        </div>
      } className="mb-3" toggleable>
        <div className="grid">
          {NON_TEACHING_REQUIREMENTS.map((req: any) => {
            const actual = ntCounts[req.id] || 0;
            const short  = Math.max(0, req.minCount - actual);
            const isOk   = short === 0;
            return (
              <div key={req.id} className="col-12 md:col-6 lg:col-4">
                <div className={`card border-1 ${!isOk ? 'border-red-400' : 'surface-border'}`} style={{ padding: '12px' }}>
                  <div className="flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="font-medium text-sm">{req.role}</div>
                      <div className="text-xs text-color-secondary mt-1">{req.qualification}</div>
                    </div>
                    <Tag value={req.countNote} severity={isOk ? 'success' : 'danger'} className="text-xs" style={{ whiteSpace: 'nowrap' }} />
                  </div>
                  <div className="flex align-items-center gap-2 mt-2">
                    <Button icon="pi pi-minus" className="p-button-sm p-button-outlined p-button-secondary" style={{ width: '32px', height: '32px' }} onClick={() => store.adjustNtCount(req.id, -1)} />
                    <span className={`font-bold text-xl mx-2 ${isOk ? 'text-green-400' : 'text-red-400'}`}>{actual}</span>
                    <Button icon="pi pi-plus" className="p-button-sm p-button-outlined" style={{ width: '32px', height: '32px' }} onClick={() => store.adjustNtCount(req.id, +1)} />
                    <Tag value={isOk ? 'Compliant' : `${short} short`} severity={isOk ? 'success' : 'danger'} className="text-xs ml-2" />
                  </div>
                  <div className="text-xs text-color-secondary mt-2">{req.ref}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Panel>
    );
  };

  // ── Add / Edit form dialog ─────────────────────────────────────────────────
  const FormDialog = ({ visible, onHide, onSave, title }: any) => (
    <Dialog header={title} visible={visible} style={{ width: '580px' }} onHide={onHide}
      footer={
        <div className="flex gap-2 justify-content-end">
          <Button label="Cancel" className="p-button-text p-button-sm" onClick={onHide} />
          <Button label="Save" icon="pi pi-check" className="p-button-sm" onClick={onSave} />
        </div>
      }>
      <div className="grid gap-0">
        <div className="col-12 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Full Name *</label><InputText value={form.name} onChange={e => setForm((f: any) => ({ ...f, name: e.target.value }))} className="p-inputtext-sm" /></div>
        <div className="col-12 md:col-6 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Council Registration No. *</label><InputText value={form.councilNo} onChange={e => setForm((f: any) => ({ ...f, councilNo: e.target.value }))} className="p-inputtext-sm font-mono" /></div>
        <div className="col-12 md:col-6 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Experience (years)</label><InputText value={form.experienceYears} onChange={e => setForm((f: any) => ({ ...f, experienceYears: e.target.value }))} className="p-inputtext-sm" type="number" /></div>
        <div className="col-12 md:col-6 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Department *</label><Dropdown value={form.department} options={DEPT_OPTIONS} onChange={e => setForm((f: any) => ({ ...f, department: e.value }))} className="p-inputtext-sm" placeholder="Select…" /></div>
        <div className="col-12 md:col-6 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Designation *</label><Dropdown value={form.designation} options={DESIG_OPTIONS} onChange={e => setForm((f: any) => ({ ...f, designation: e.value }))} className="p-inputtext-sm" placeholder="Select…" /></div>
        <div className="col-12 md:col-4 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">UG Qualification</label><InputText value={form.ugQual} onChange={e => setForm((f: any) => ({ ...f, ugQual: e.target.value }))} className="p-inputtext-sm" placeholder="e.g. B.Pharm" /></div>
        <div className="col-12 md:col-4 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">PG Qualification</label><InputText value={form.pgQual} onChange={e => setForm((f: any) => ({ ...f, pgQual: e.target.value }))} className="p-inputtext-sm" placeholder="e.g. M.Pharm" /></div>
        <div className="col-12 md:col-4 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Ph.D</label><InputText value={form.phd} onChange={e => setForm((f: any) => ({ ...f, phd: e.target.value }))} className="p-inputtext-sm" placeholder="e.g. Ph.D" /></div>
        <div className="col-12 md:col-6 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Employment Type *</label><Dropdown value={form.employmentType} options={EMP_OPTIONS} onChange={e => setForm((f: any) => ({ ...f, employmentType: e.value }))} className="p-inputtext-sm" /></div>
        <div className="col-12 md:col-6 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">SPC Registration</label><Dropdown value={form.spcRegistration} options={SPC_OPTIONS} onChange={e => setForm((f: any) => ({ ...f, spcRegistration: e.value }))} className="p-inputtext-sm" /></div>
        <div className="col-12 flex flex-column gap-1 mb-2"><label className="text-sm font-medium">Date of Joining</label><InputText type="date" value={form.dateOfJoining} onChange={e => setForm((f: any) => ({ ...f, dateOfJoining: e.target.value }))} className="p-inputtext-sm" /></div>
        {form.designation === DESIGNATIONS.PROFESSOR || form.designation === DESIGNATIONS.HOI ? (
          <div className="col-12"><Message severity="warn" text="Professors and HOI must hold a PCI-recognized Ph.D — mandatory per MQT 2014." className="w-full" /></div>
        ) : null}
      </div>
    </Dialog>
  );

  // ── Page render ────────────────────────────────────────────────────────────
  return (
    <div className="grid">
      <Toast ref={toast} />

      {/* Reg strip */}
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>Regulatory basis:</b> B.Pharm Course Regulations 2014, Appendix-A, Clause 3 &amp; 4 · MQT Regulations 2014 · All faculty must be <b>full-time</b></span>
        </div>
      </div>

      {/* Course + intake selector */}
      <div className="col-12">
        <div className="card py-2 flex flex-wrap align-items-center gap-3">
          <span className="font-medium text-sm">Course:</span>
          <SelectButton
            value={store.course}
            options={COURSES.filter((c: any) => ['bpharm', 'dpharm', 'mpharm', 'pharmd'].includes(c.id)).map((c: any) => ({ label: c.label, value: c.id }))}
            onChange={e => { if (e.value) store.setCourse(e.value); }}
          />
          {store.course === 'bpharm' && (
            <>
              <Divider layout="vertical" className="mx-1" />
              <span className="font-medium text-sm">Intake:</span>
              <SelectButton value={store.intake} options={INTAKE_OPTIONS} onChange={e => { if (e.value) store.setIntake(e.value); }} />
            </>
          )}
        </div>
      </div>

      {/* Compliance bar */}
      <div className="col-12"><ComplianceSummary /></div>

      {/* HOI */}
      <div className="col-12"><HOISection /></div>

      {/* Matrix */}
      {store.course === 'bpharm' && <div className="col-12"><RequirementMatrix /></div>}

      {/* Roster */}
      <div className="col-12"><FacultyRoster /></div>

      {/* NT Staff */}
      {store.course === 'bpharm' && <div className="col-12"><NonTeachingStaff /></div>}

      {/* Dialogs */}
      <FormDialog visible={addDlg} onHide={() => setAddDlg(false)} onSave={handleSave} title="Add Faculty Member" />
      <FormDialog visible={editDlg} onHide={() => setEditDlg(false)} onSave={handleUpdate} title="Edit Faculty Member" />
    </div>
  );
};

export default FacultyPage;
