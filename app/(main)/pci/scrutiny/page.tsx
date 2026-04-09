'use client';
import { DataTable, Column, Tag, Button, Dropdown, Panel, Divider } from '../../../../lib/prime';
import { ProgressBar } from '../../../../lib/prime';
import React, { useState, useMemo, useCallback } from 'react';
import {
  COURSES, BPHARM_REQUIREMENTS, NON_TEACHING_REQUIREMENTS,
  DEPT_LABELS, DESIG_LABELS, DEPARTMENTS, DESIGNATIONS,
  BPHARM_ROOMS, BPHARM_LABS, BPHARM_LAB_FITTINGS,
  DPHARM_LABS, DPHARM_EQUIPMENT,
  BPHARM_INFRA_CHECKLIST, DPHARM_INFRA_CHECKLIST,
  SEED_FACULTY, SEED_NON_TEACHING_COUNTS,
} from '../../../../lib/pci-constants';

type StatusType = 'compliant' | 'non_compliant' | 'partial' | 'not_entered';
interface ScrutinyItem {
  id: string;
  section: string;
  label: string;
  detail: string;
  ref: string;
  status: StatusType;
  manual: boolean;
}

function getTagSeverity(status: StatusType) {
  switch (status) {
    case 'compliant':     return 'success';
    case 'non_compliant': return 'danger';
    case 'partial':       return 'warning';
    default:              return 'secondary';
  }
}
function getTagLabel(status: StatusType) {
  switch (status) {
    case 'compliant':     return 'Compliant';
    case 'non_compliant': return 'Non-Compliant';
    case 'partial':       return 'Partial';
    default:              return 'Not Entered';
  }
}

// ── Compute faculty scrutiny from SEED data ───────────────────────────────────
function computeFacultyScrutiny(course: string, intake: 60 | 100): ScrutinyItem[] {
  const items: ScrutinyItem[] = [];
  const faculty = SEED_FACULTY.filter(f => f.courses.includes(course as any));

  // HOI check
  const hoi = faculty.find(f => f.designation === 'hoi');
  items.push({
    id: 'hoi', section: 'Teaching Faculty', manual: false,
    label: 'Head of Institution / Director / Principal',
    detail: hoi ? `${hoi.name} · ${hoi.experienceYears} yrs` : 'Not appointed',
    ref: 'Appendix-A, Cl. 3(ii)',
    status: hoi ? 'compliant' : 'non_compliant',
  });

  if (course === 'bpharm') {
    const reqs = BPHARM_REQUIREMENTS[intake] || BPHARM_REQUIREMENTS[60];
    const slotCounts: Record<string, number> = {};
    faculty.forEach(f => {
      const desigKey = f.designation === 'assoc_prof' ? 'professor' : f.designation;
      const key = `${f.department}_${desigKey}`;
      slotCounts[key] = (slotCounts[key] || 0) + 1;
    });

    Object.entries(reqs).forEach(([key, req]) => {
      if (req === 0) return;
      const [dept, desig] = key.split(/_([^_]+)$/); // split from last underscore
      const deptKey  = key.substring(0, key.lastIndexOf('_'));
      const desigKey = key.substring(key.lastIndexOf('_') + 1);
      const filled   = slotCounts[key] || 0;
      const status: StatusType = filled >= req ? 'compliant' : filled > 0 ? 'partial' : 'non_compliant';
      items.push({
        id: key, section: 'Teaching Faculty', manual: false,
        label: `${DEPT_LABELS[deptKey] || deptKey} — ${DESIG_LABELS[desigKey] || desigKey}`,
        detail: `${filled} of ${req} required`,
        ref: 'Appendix-A, Cl. 3(iii)',
        status,
      });
    });

    // Ph.D gate checks for Professor/HOI
    faculty.forEach(f => {
      if ((f.designation === 'professor' || f.designation === 'hoi') &&
          (!f.qualification?.phd || f.qualification.phd !== 'Ph.D')) {
        items.push({
          id: `phd-${f.id}`, section: 'Teaching Faculty', manual: false,
          label: `Ph.D required — ${f.name}`,
          detail: 'Professor/Principal must hold PCI-recognized Ph.D (MQT 2014)',
          ref: 'MQT 2014 — Table, Section II',
          status: 'non_compliant',
        });
      }
    });

    // Full-time checks
    faculty.forEach(f => {
      if (f.employmentType !== 'full-time') {
        items.push({
          id: `ft-${f.id}`, section: 'Teaching Faculty', manual: false,
          label: `Full-time violation — ${f.name}`,
          detail: 'All faculty must be full-time (Appendix-A, Cl. 3(i))',
          ref: 'Appendix-A, Cl. 3(i)',
          status: 'non_compliant',
        });
      }
    });
  }

  // Non-teaching staff
  NON_TEACHING_REQUIREMENTS.forEach(r => {
    const actual = SEED_NON_TEACHING_COUNTS[r.id] || 0;
    items.push({
      id: `nt-${r.id}`, section: 'Non-Teaching Staff', manual: false,
      label: r.role,
      detail: `${actual} present, ${r.minCount} required — ${r.qualification}`,
      ref: r.ref,
      status: actual >= r.minCount ? 'compliant' : 'non_compliant',
    });
  });

  return items;
}

// ── Compute infra scrutiny ────────────────────────────────────────────────────
function computeInfraScrutiny(course: string, overrides: Record<string, StatusType>): ScrutinyItem[] {
  const items: ScrutinyItem[] = [];

  if (course === 'bpharm') {
    BPHARM_ROOMS.filter(r => r.mandatory).forEach(r => {
      items.push({ id: r.id, section: 'Rooms & Facilities', manual: true, label: r.label, detail: r.note, ref: r.ref, status: overrides[r.id] || 'not_entered' });
    });
    BPHARM_LABS.forEach(l => {
      items.push({ id: l.id, section: 'Laboratories', manual: true, label: l.label, detail: `Min. ${l.minArea} ${l.areaUnit} incl. Preparation Room — ${l.note}`, ref: l.ref, status: overrides[l.id] || 'not_entered' });
    });
    BPHARM_LAB_FITTINGS.forEach(f => {
      items.push({ id: f.id, section: 'Lab Fittings', manual: true, label: f.label, detail: 'Mandatory fitting requirement', ref: f.ref, status: overrides[f.id] || 'not_entered' });
    });
    BPHARM_INFRA_CHECKLIST.forEach(c => {
      items.push({ id: `cl-${c.id}`, section: 'Compliance Checklist', manual: true, label: c.text, detail: 'Verify during on-site inspection', ref: c.ref, status: overrides[`cl-${c.id}`] || 'not_entered' });
    });
  }

  if (course === 'dpharm') {
    DPHARM_LABS.forEach(l => {
      items.push({ id: l.id, section: 'Laboratories', manual: true, label: l.label, detail: `Min. ${l.minArea} ${l.areaUnit} — ${l.note}`, ref: l.ref, status: overrides[l.id] || 'not_entered' });
    });
    Object.entries(DPHARM_EQUIPMENT).slice(0, 3).forEach(([labId, equipList]) => {
      equipList.forEach(e => {
        items.push({ id: e.id, section: 'Equipment', manual: true, label: e.label, detail: `Min. qty: ${e.minQty} — ${labId.replace(/_/g, ' ')}`, ref: e.ref, status: overrides[e.id] || 'not_entered' });
      });
    });
    DPHARM_INFRA_CHECKLIST.forEach(c => {
      items.push({ id: `cl-${c.id}`, section: 'Compliance Checklist', manual: true, label: c.text, detail: 'Verify during on-site inspection', ref: c.ref, status: overrides[`cl-${c.id}`] || 'not_entered' });
    });
  }

  return items;
}

// ── Page ──────────────────────────────────────────────────────────────────────
const ScrutinyPage = () => {
  const [course, setCourse] = useState('bpharm');
  const [intake, setIntake] = useState<60 | 100>(60);
  const [infraOverrides, setInfraOverrides] = useState<Record<string, StatusType>>({});

  const facultyItems = useMemo(() => computeFacultyScrutiny(course, intake), [course, intake]);
  const infraItems   = useMemo(() => computeInfraScrutiny(course, infraOverrides), [course, infraOverrides]);
  const allItems     = [...facultyItems, ...infraItems];

  const compliant    = allItems.filter(i => i.status === 'compliant').length;
  const nonCompliant = allItems.filter(i => i.status === 'non_compliant').length;
  const partial      = allItems.filter(i => i.status === 'partial').length;
  const notEntered   = allItems.filter(i => i.status === 'not_entered').length;
  const total        = allItems.length;
  const score        = total > 0 ? Math.round(((compliant + partial * 0.5) / total) * 100) : 0;

  function handleOverride(id: string, status: StatusType) {
    setInfraOverrides(prev => ({ ...prev, [id]: status }));
  }

  const sections = [...new Set(allItems.map(i => i.section))];

  const statusTemplate = (row: ScrutinyItem) => (
    <Tag value={getTagLabel(row.status)} severity={getTagSeverity(row.status) as any} className="text-xs" />
  );

  const actionsTemplate = (row: ScrutinyItem) => {
    if (!row.manual) return <span className="text-color-secondary text-xs">Auto-computed</span>;
    return (
      <div className="flex gap-1">
        {(['compliant', 'non_compliant', 'not_entered'] as StatusType[]).map(s => (
          <Button
            key={s}
            label={s === 'compliant' ? '✓' : s === 'non_compliant' ? '✗' : '—'}
            className={`p-button-sm p-button-text ${row.status === s ? (s === 'compliant' ? 'p-button-success' : s === 'non_compliant' ? 'p-button-danger' : '') : ''}`}
            onClick={() => handleOverride(row.id, s)}
            style={{ padding: '0.1rem 0.4rem', minWidth: '28px' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="grid">
      {/* ── Header ── */}
      <div className="col-12">
        <div className="card">
          <div className="flex flex-wrap align-items-center justify-content-between gap-3">
            <div>
              <h4 className="m-0 font-bold">Scrutiny Module</h4>
              <p className="text-color-secondary text-sm mt-1 mb-0">
                FR-IS-05 · Auto-computed from faculty roster + infra form · Manual override for infra items
              </p>
            </div>
            <div className="flex flex-wrap gap-3 align-items-center">
              <div className="flex align-items-center gap-2">
                <label className="font-medium text-sm">Course</label>
                <Dropdown
                  value={course}
                  options={COURSES.map(c => ({ label: c.label, value: c.id }))}
                  onChange={e => setCourse(e.value)}
                  className="text-sm"
                  style={{ width: '140px' }}
                />
              </div>
              {course === 'bpharm' && (
                <div className="flex align-items-center gap-2">
                  <label className="font-medium text-sm">Intake</label>
                  <Dropdown
                    value={intake}
                    options={[{ label: '60 Seats', value: 60 }, { label: '100 Seats', value: 100 }]}
                    onChange={e => setIntake(e.value)}
                    className="text-sm"
                    style={{ width: '120px' }}
                  />
                </div>
              )}
              <Button label="Export Report" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Summary bar ── */}
      <div className="col-12 sm:col-6 md:col-3">
        <div className="card text-center">
          <div className="text-3xl font-bold text-green-500">{compliant}</div>
          <div className="text-color-secondary text-sm mt-1">Compliant</div>
        </div>
      </div>
      <div className="col-12 sm:col-6 md:col-3">
        <div className="card text-center">
          <div className="text-3xl font-bold text-red-500">{nonCompliant}</div>
          <div className="text-color-secondary text-sm mt-1">Non-Compliant</div>
        </div>
      </div>
      <div className="col-12 sm:col-6 md:col-3">
        <div className="card text-center">
          <div className="text-3xl font-bold text-orange-500">{partial}</div>
          <div className="text-color-secondary text-sm mt-1">Partial</div>
        </div>
      </div>
      <div className="col-12 sm:col-6 md:col-3">
        <div className="card text-center">
          <div className="text-3xl font-bold" style={{ color: score >= 90 ? '#22c55e' : score >= 70 ? '#f97316' : '#ef4444' }}>{score}%</div>
          <div className="text-color-secondary text-sm mt-1">Compliance Score</div>
          <ProgressBar value={score} showValue={false} className="mt-2" style={{ height: '6px' }} />
        </div>
      </div>

      {/* ── Per-section tables ── */}
      {sections.map(section => {
        const sectionItems = allItems.filter(i => i.section === section);
        const secOk   = sectionItems.filter(i => i.status === 'compliant').length;
        const secFail = sectionItems.filter(i => i.status === 'non_compliant').length;
        return (
          <div className="col-12" key={section}>
            <Panel
              header={
                <div className="flex align-items-center justify-content-between w-full">
                  <span className="font-semibold">{section}</span>
                  <div className="flex gap-2">
                    <Tag value={`${secOk} compliant`} severity="success" className="text-xs" />
                    {secFail > 0 && <Tag value={`${secFail} deficien${secFail !== 1 ? 'cies' : 'cy'}`} severity="danger" className="text-xs" />}
                  </div>
                </div>
              }
              toggleable
              className="mb-3"
            >
              <DataTable value={sectionItems} className="p-datatable-sm" showGridlines rowClassName={row => row.status === 'non_compliant' ? 'bg-red-50' : row.status === 'partial' ? 'bg-orange-50' : ''}>
                <Column field="label"  header="Requirement" style={{ minWidth: '260px' }} />
                <Column field="detail" header="Status Detail" className="text-color-secondary text-sm" style={{ minWidth: '200px' }} />
                <Column field="ref"    header="Regulation Ref." className="text-xs text-color-secondary" style={{ width: '160px' }} />
                <Column header="Status"  body={statusTemplate}  style={{ width: '130px' }} />
                <Column header="Override" body={actionsTemplate} style={{ width: '160px' }} />
              </DataTable>
            </Panel>
          </div>
        );
      })}
    </div>
  );
};

export default ScrutinyPage;
