'use client';
import { DataTable, Column, Button, InputText, Tag, Badge, Dialog, Dropdown, Toast, Toolbar, ProgressBar } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';
import { useRouter }     from 'next/navigation';

interface Institution {
  id: string;
  name: string;
  pciCode: string;
  state: string;
  courses: string[];
  compliance: number;
  sifStatus: string;
  inspectionStatus: string;
  lastAction: string;
  status: 'active' | 'suspended' | 'pending';
}

const INSTITUTIONS: Institution[] = [
  { id: 'I001', name: 'Seven Hills College of Pharmacy',  pciCode: 'AP-001', state: 'Andhra Pradesh', courses: ['B.Pharm', 'M.Pharm'],                    compliance: 82, sifStatus: 'Submitted',      inspectionStatus: 'Assigned',     lastAction: '2d ago',  status: 'active' },
  { id: 'I002', name: 'JSS College of Pharmacy',          pciCode: 'KA-004', state: 'Karnataka',      courses: ['B.Pharm','D.Pharm','M.Pharm','Pharm.D'], compliance: 94, sifStatus: 'Verified',        inspectionStatus: 'Completed',    lastAction: '5h ago',  status: 'active' },
  { id: 'I003', name: 'MAHE Manipal',                     pciCode: 'KA-007', state: 'Karnataka',      courses: ['B.Pharm','M.Pharm','Pharm.D'],            compliance: 91, sifStatus: 'Approved',        inspectionStatus: 'Completed',    lastAction: '1d ago',  status: 'active' },
  { id: 'I004', name: 'Amrita School of Pharmacy',        pciCode: 'KL-003', state: 'Kerala',         courses: ['B.Pharm','Pharm.D'],                      compliance: 68, sifStatus: 'Query Raised',    inspectionStatus: 'Pending',      lastAction: '3h ago',  status: 'active' },
  { id: 'I005', name: 'KLE University',                   pciCode: 'KA-012', state: 'Karnataka',      courses: ['B.Pharm','M.Pharm'],                      compliance: 57, sifStatus: 'Not Submitted',   inspectionStatus: 'Unassigned',   lastAction: '8d ago',  status: 'active' },
  { id: 'I006', name: 'Saveetha Pharmacy College',        pciCode: 'TN-009', state: 'Tamil Nadu',     courses: ['B.Pharm','D.Pharm'],                      compliance: 73, sifStatus: 'Submitted',       inspectionStatus: 'Assigned',     lastAction: '1d ago',  status: 'active' },
  { id: 'I007', name: 'SRM College of Pharmacy',          pciCode: 'TN-011', state: 'Tamil Nadu',     courses: ['B.Pharm','M.Pharm'],                      compliance: 88, sifStatus: 'Verified',        inspectionStatus: 'Completed',    lastAction: '2d ago',  status: 'active' },
  { id: 'I008', name: 'Poona College of Pharmacy',        pciCode: 'MH-002', state: 'Maharashtra',    courses: ['B.Pharm','D.Pharm'],                      compliance: 61, sifStatus: 'Not Submitted',   inspectionStatus: 'Not Started',  lastAction: '12d ago', status: 'suspended' },
];

const SIF_STATUS_MAP: Record<string, string> = {
  'Approved':      'success',
  'Verified':      'info',
  'Submitted':     'info',
  'Query Raised':  'warning',
  'Not Submitted': 'danger',
};

const INSP_STATUS_MAP: Record<string, string> = {
  'Completed':   'success',
  'Assigned':    'info',
  'Pending':     'warning',
  'Unassigned':  'danger',
  'Not Started': 'secondary',
};

const STATES = ['All States','Andhra Pradesh','Karnataka','Kerala','Maharashtra','Tamil Nadu','Telangana'];
const COURSES_FILTER = ['All Courses','B.Pharm','D.Pharm','M.Pharm','Pharm.D'];
const STATUS_FILTER  = ['All Status','Submitted','Verified','Approved','Query Raised','Not Submitted'];

const InstitutionPage = () => {
  const toast = useRef<any>(null);
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState('');
  const [stateFilter,  setStateFilter]  = useState('All States');
  const [sifFilter,    setSifFilter]    = useState('All Status');
  const [selected,     setSelected]     = useState<Institution[]>([]);
  const [detailDialog, setDetailDialog] = useState(false);
  const [activeInst,   setActiveInst]   = useState<Institution | null>(null);

  const filtered = INSTITUTIONS.filter(inst => {
    const matchGlobal = !globalFilter || inst.name.toLowerCase().includes(globalFilter.toLowerCase()) || inst.pciCode.toLowerCase().includes(globalFilter.toLowerCase());
    const matchState  = stateFilter  === 'All States'  || inst.state  === stateFilter;
    const matchSif    = sifFilter    === 'All Status'   || inst.sifStatus === sifFilter;
    return matchGlobal && matchState && matchSif;
  });

  const complianceTemplate = (row: Institution) => (
    <div style={{ minWidth: '80px' }}>
      <div className="flex align-items-center justify-content-between mb-1">
        <span className="text-sm font-medium">{row.compliance}%</span>
        <Tag value={row.compliance >= 85 ? 'OK' : row.compliance >= 70 ? 'Warn' : 'Low'}
             severity={row.compliance >= 85 ? 'success' : row.compliance >= 70 ? 'warning' : 'danger'} className="text-xs" />
      </div>
      <ProgressBar value={row.compliance} showValue={false} style={{ height: '5px' }} color={row.compliance >= 85 ? '#22c55e' : row.compliance >= 70 ? '#f97316' : '#ef4444'} />
    </div>
  );

  const nameTemplate = (row: Institution) => (
    <div>
      <div className="font-medium text-sm">{row.name}</div>
      <div className="text-color-secondary text-xs mt-1 font-mono">{row.pciCode} · {row.state}</div>
    </div>
  );

  const coursesTemplate = (row: Institution) => (
    <div className="flex flex-wrap gap-1">
      {row.courses.map(c => <Tag key={c} value={c} severity="info" className="text-xs" />)}
    </div>
  );

  const actionsTemplate = (row: Institution) => (
    <div className="flex gap-1">
      <Button icon="pi pi-eye"    className="p-button-sm p-button-text" tooltip="View details"   onClick={() => { setActiveInst(row); setDetailDialog(true); }} />
      <Button icon="pi pi-search" className="p-button-sm p-button-text" tooltip="Scrutiny report" onClick={() => router.push('/pci/scrutiny')} />
      <Button icon="pi pi-check"  className="p-button-sm p-button-success p-button-text" tooltip="Approve" />
      <Button icon="pi pi-times"  className="p-button-sm p-button-danger p-button-text" tooltip={row.status === 'active' ? 'Suspend' : 'Reactivate'} />
    </div>
  );

  const leftToolbar = () => (
    <div className="flex flex-wrap gap-2">
      <Button label="Register New" icon="pi pi-plus" className="p-button-sm" />
      <Button label="Bulk Assign Scrutinizer" icon="pi pi-users" className="p-button-outlined p-button-sm" disabled={selected.length === 0} />
      <Button label="Export" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
    </div>
  );

  const rightToolbar = () => (
    <div className="flex flex-wrap gap-2">
      <Dropdown value={stateFilter}  options={STATES}        onChange={e => setStateFilter(e.value)}  className="text-sm" style={{ width: '160px' }} />
      <Dropdown value={sifFilter}    options={STATUS_FILTER} onChange={e => setSifFilter(e.value)}    className="text-sm" style={{ width: '160px' }} />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search institutions…" className="p-inputtext-sm" style={{ width: '200px' }} />
      </span>
    </div>
  );

  return (
    <div className="grid">
      <Toast ref={toast} />

      {/* Stats */}
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">8,462</div><div className="text-color-secondary text-sm mt-1">Total Institutions</div><div className="text-xs text-color-secondary mt-1">8,212 active · 250 suspended</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">1,240</div><div className="text-color-secondary text-sm mt-1">SIF Pending</div><div className="text-xs text-orange-500 mt-1">Submission window closes in 18 days</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">342</div><div className="text-color-secondary text-sm mt-1">In Approval Queue</div><div className="text-xs text-color-secondary mt-1">87 scrutiny · 54 verification · 12 final</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">71.4%</div><div className="text-color-secondary text-sm mt-1">Avg. Compliance</div><div className="text-xs text-green-500 mt-1">↑ 2.1% from last session</div></div></div>

      {/* Regulation strip */}
      <div className="col-12">
        <div className="card p-2">
          <div className="flex align-items-center gap-2 text-sm text-color-secondary">
            <i className="pi pi-info-circle text-blue-400" />
            <span><b>FR-IM-01:</b> Multi-level approval: Document Verification → Scrutiny → Verification → Final Approval. <b>FR-IM-06:</b> Activate/Suspend/Deactivate — all changes immutably audit-logged.</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="col-12">
        <div className="card p-0">
          <Toolbar left={leftToolbar} right={rightToolbar} className="border-none border-bottom-1 surface-border" style={{ borderRadius: '10px 10px 0 0' }} />
          <DataTable
            value={filtered}
            selection={selected}
            onSelectionChange={e => setSelected(e.value as Institution[])}
            dataKey="id"
            paginator rows={10}
            className="p-datatable-sm"
            showGridlines
            emptyMessage="No institutions found"
            rowClassName={row => row.status === 'suspended' ? 'opacity-60' : ''}
          >
            <Column selectionMode="multiple" style={{ width: '3rem' }} />
            <Column header="Institution" body={nameTemplate} sortField="name" sortable style={{ minWidth: '220px' }} />
            <Column header="Courses" body={coursesTemplate} style={{ minWidth: '200px' }} />
            <Column header="Compliance" body={complianceTemplate} sortField="compliance" sortable style={{ width: '140px' }} />
            <Column field="sifStatus" header="SIF Status"
              body={row => <Tag value={row.sifStatus} severity={SIF_STATUS_MAP[row.sifStatus] as any} className="text-xs" />}
              style={{ width: '120px' }} />
            <Column field="inspectionStatus" header="Inspection"
              body={row => <Tag value={row.inspectionStatus} severity={INSP_STATUS_MAP[row.inspectionStatus] as any} className="text-xs" />}
              style={{ width: '110px' }} />
            <Column field="lastAction" header="Last Action" className="text-color-secondary text-sm" style={{ width: '90px' }} />
            <Column header="Actions" body={actionsTemplate} style={{ width: '160px' }} />
          </DataTable>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog
        header={activeInst?.name}
        visible={detailDialog}
        style={{ width: '600px' }}
        onHide={() => setDetailDialog(false)}
        footer={
          <div className="flex gap-2">
            <Button label="View Scrutiny Report" icon="pi pi-eye" className="p-button-outlined" onClick={() => { setDetailDialog(false); router.push('/pci/scrutiny'); }} />
            <Button label="Close" className="p-button-text" onClick={() => setDetailDialog(false)} />
          </div>
        }
      >
        {activeInst && (
          <div className="grid">
            <div className="col-6"><div className="text-color-secondary text-sm">PCI Code</div><div className="font-mono font-medium">{activeInst.pciCode}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">State</div><div className="font-medium">{activeInst.state}</div></div>
            <div className="col-12"><div className="text-color-secondary text-sm mb-1">Courses</div><div className="flex flex-wrap gap-1">{activeInst.courses.map(c => <Tag key={c} value={c} severity="info" />)}</div></div>
            <div className="col-12"><div className="text-color-secondary text-sm mb-1">Compliance Score</div><ProgressBar value={activeInst.compliance} style={{ height: '8px' }} /><div className="text-right text-sm mt-1">{activeInst.compliance}%</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">SIF Status</div><Tag value={activeInst.sifStatus} severity={SIF_STATUS_MAP[activeInst.sifStatus] as any} className="mt-1" /></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Inspection Status</div><Tag value={activeInst.inspectionStatus} severity={INSP_STATUS_MAP[activeInst.inspectionStatus] as any} className="mt-1" /></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Account Status</div><Tag value={activeInst.status} severity={activeInst.status === 'active' ? 'success' : 'danger'} className="mt-1" /></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Last Action</div><div className="font-medium mt-1">{activeInst.lastAction}</div></div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default InstitutionPage;
