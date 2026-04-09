'use client';
import { DataTable, Column, Button, Tag, InputText, Dialog, Toast } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const RECON_DATA = [
  { id:'TXN-9810', institution:'Amrita Kochi',         gatewayAmt:'₹1,80,000', ledgerAmt:'₹1,32,000', diff:'₹48,000',  date:'Apr 7, 2026', status:'Mismatch',      resolved:false },
  { id:'TXN-9808', institution:'KLE Belagavi',          gatewayAmt:'₹80,000',  ledgerAmt:'₹80,000',  diff:'—',          date:'Apr 6, 2026', status:'Pending Match', resolved:false },
  { id:'TXN-9812', institution:'Seven Hills College',   gatewayAmt:'₹1,00,000',ledgerAmt:'₹1,00,000',diff:'—',          date:'Apr 8, 2026', status:'Matched',       resolved:true  },
  { id:'TXN-9811', institution:'JSS Mysuru',            gatewayAmt:'₹2,40,000',ledgerAmt:'₹2,40,000',diff:'—',          date:'Apr 8, 2026', status:'Matched',       resolved:true  },
  { id:'TXN-9805', institution:'SRM Chennai',           gatewayAmt:'₹1,20,000',ledgerAmt:'₹1,20,000',diff:'—',          date:'Apr 5, 2026', status:'Matched',       resolved:true  },
  { id:'TXN-9801', institution:'Saveetha Pharmacy',     gatewayAmt:'₹60,000',  ledgerAmt:'₹60,000',  diff:'—',          date:'Apr 4, 2026', status:'Matched',       resolved:true  },
];

const statusSev = (s: string) => s==='Matched'?'success':s==='Mismatch'?'danger':'warning';

const ReconciliationPage = () => {
  const toast = useRef<any>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [fixDlg,       setFixDlg]       = useState(false);
  const [activeRow,    setActiveRow]     = useState<any>(null);

  const filtered = RECON_DATA.filter(r => !globalFilter || r.institution.toLowerCase().includes(globalFilter.toLowerCase()) || r.id.includes(globalFilter));

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">2,840</div><div className="text-color-secondary text-sm mt-1">Transactions This Month</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">2,837</div><div className="text-color-secondary text-sm mt-1">Matched</div><div className="text-xs text-green-500 mt-1">99.9% auto-reconciled</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">3</div><div className="text-color-secondary text-sm mt-1">Mismatches</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">₹48,000</div><div className="text-color-secondary text-sm mt-1">Unreconciled Amount</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-FP-03:</b> Payment gateway records matched against PCI ledger. Mismatches flagged and routed to Accounts Maker for correction. Retry and correction workflow is tracked and audit-logged.</span>
        </div>
      </div>
      <div className="col-12">
        <div className="card py-2 flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="flex gap-2">
            <Button label="Auto-Reconcile" icon="pi pi-sync" className="p-button-sm" onClick={() => toast.current?.show({ severity:'info', summary:'Running', detail:'Auto-reconciliation in progress…', life:3000 })} />
            <Button label="Export Recon Report" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
          </div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value={globalFilter} onChange={e => setGlobalFilter(e.target.value)} placeholder="Search transactions…" className="p-inputtext-sm" style={{ width:'220px' }} />
          </span>
        </div>
      </div>
      <div className="col-12">
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Reconciliation Register — Gateway vs. PCI Ledger</div>
          <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10}
            rowClassName={r => !r.resolved && r.status==='Mismatch' ? 'bg-red-50' : ''}>
            <Column field="id"          header="Txn ID"       className="font-mono text-xs" style={{ width:'110px' }} />
            <Column field="institution" header="Institution"  className="text-sm font-medium" style={{ minWidth:'180px' }} />
            <Column field="gatewayAmt"  header="Gateway Amt"  className="font-mono text-center" style={{ width:'120px' }} />
            <Column field="ledgerAmt"   header="Ledger Amt"   className="font-mono text-center" style={{ width:'120px' }} />
            <Column header="Difference" style={{ width:'100px' }} body={r => (
              <span className={`font-mono font-bold ${r.diff==='—'?'text-color-secondary':'text-red-500'}`}>{r.diff}</span>
            )} />
            <Column field="date"        header="Date"         className="text-sm" style={{ width:'110px' }} />
            <Column header="Status" style={{ width:'120px' }} body={r => <Tag value={r.status} severity={statusSev(r.status) as any} className="text-xs" />} />
            <Column header="Actions" style={{ width:'110px' }} body={r => (
              <div className="flex gap-1">
                <Button icon="pi pi-eye" className="p-button-sm p-button-text" />
                {!r.resolved && r.status === 'Mismatch' && (
                  <Button icon="pi pi-wrench" className="p-button-sm p-button-warning p-button-text" tooltip="Fix mismatch"
                    onClick={() => { setActiveRow(r); setFixDlg(true); }} />
                )}
              </div>
            )} />
          </DataTable>
        </div>
      </div>
      <Dialog header={`Fix Mismatch — ${activeRow?.id}`} visible={fixDlg} style={{ width:'480px' }} onHide={() => setFixDlg(false)}
        footer={<div className="flex gap-2"><Button label="Submit Correction" icon="pi pi-check" className="p-button-sm" onClick={() => { setFixDlg(false); toast.current?.show({ severity:'success', summary:'Submitted', detail:'Correction request sent for Accounts Verifier review', life:3000 }); }} /><Button label="Cancel" className="p-button-text p-button-sm" onClick={() => setFixDlg(false)} /></div>}>
        {activeRow && (
          <div className="grid">
            <div className="col-6"><div className="text-color-secondary text-sm">Institution</div><div className="font-medium">{activeRow.institution}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Transaction ID</div><div className="font-mono">{activeRow.id}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Gateway Amount</div><div className="font-mono text-lg font-bold text-green-500">{activeRow.gatewayAmt}</div></div>
            <div className="col-6"><div className="text-color-secondary text-sm">Ledger Amount</div><div className="font-mono text-lg font-bold">{activeRow.ledgerAmt}</div></div>
            <div className="col-12"><div className="text-color-secondary text-sm">Difference</div><div className="font-mono text-xl font-bold text-red-500">{activeRow.diff}</div></div>
            <div className="col-12 flex flex-column gap-1"><label className="text-sm font-medium">Correction Note (mandatory)</label><InputText placeholder="Explain the discrepancy and proposed correction…" className="p-inputtext-sm" /></div>
          </div>
        )}
      </Dialog>
    </div>
  );
};
export default ReconciliationPage;