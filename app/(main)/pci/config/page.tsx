'use client';
import { Button, InputText, Dropdown, Tag, Toast, DataTable, Column } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const INTEGRATIONS = [
  { name:'DigiLocker API (NIC/GoI)',    status:'Connected',    ref:'FR-AI-01', icon:'pi-cloud',   color:'#22c55e' },
  { name:'Aadhaar eKYC (UIDAI)',        status:'Connected',    ref:'FR-AI-04', icon:'pi-id-card', color:'#22c55e' },
  { name:'e-Sign Service (GoI)',         status:'Connected',    ref:'FR-AI-03', icon:'pi-pencil',  color:'#22c55e' },
  { name:'PFMS Payment Gateway',         status:'Connected',    ref:'FR-FP-03', icon:'pi-credit-card', color:'#22c55e' },
  { name:'UMANG Platform (MeitY)',       status:'Connected',    ref:'FR-AI-02', icon:'pi-mobile',  color:'#22c55e' },
  { name:'SMS Gateway',                  status:'Connected',    ref:'FR-CM-01', icon:'pi-comment', color:'#22c55e' },
  { name:'WhatsApp Business API',        status:'Not Connected',ref:'FR-CM-01', icon:'pi-whatsapp',color:'#ef4444' },
  { name:'State Council API (SPC)',      status:'Partial (22/29)',ref:'FR-PM-01',icon:'pi-sitemap', color:'#f97316' },
  { name:'Video KYC Provider',           status:'Not Connected',ref:'FR-AI-04', icon:'pi-video',   color:'#ef4444' },
];

const PERM_ROWS = [
  { module:'Dashboard',       registrar:'Full',         scrutinizer:'View',         verifier:'View',  accounts:'Finance only', it:'Full' },
  { module:'Institutions',    registrar:'Full',         scrutinizer:'Scrutinize',   verifier:'Verify',accounts:'None',         it:'View' },
  { module:'Workflow Engine', registrar:'Approve/Reject',scrutinizer:'Scrutinize',  verifier:'Verify',accounts:'None',         it:'View' },
  { module:'Finance',         registrar:'View',         scrutinizer:'None',         verifier:'None',  accounts:'Full',         it:'View' },
  { module:'Master Data',     registrar:'Approve',      scrutinizer:'None',         verifier:'None',  accounts:'Fee only',     it:'Full' },
  { module:'Config & Settings',registrar:'None',        scrutinizer:'None',         verifier:'None',  accounts:'None',         it:'Full' },
  { module:'Audit Logs',      registrar:'Full',         scrutinizer:'View own',     verifier:'View own',accounts:'View own',   it:'Full' },
];

const permSev = (v: string) => v==='Full'?'success':v==='None'?'secondary':'info';

const ConfigPage = () => {
  const toast = useRef<any>(null);
  const [scrutinySLA, setScrutinySLA] = useState('48');
  const [verifSLA,    setVerifSLA]    = useState('24');
  const [finalSLA,    setFinalSLA]    = useState('12');
  const [timeout,     setTimeout_]    = useState('30');
  const [maxAttempts, setMaxAttempts] = useState('5');

  const save = (section: string) => toast.current?.show({ severity:'success', summary:'Saved', detail:`${section} configuration saved successfully`, life:3000 });

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">9</div><div className="text-color-secondary text-sm mt-1">External Integrations</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">7</div><div className="text-color-secondary text-sm mt-1">Connected</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">2</div><div className="text-color-secondary text-sm mt-1">Not Connected</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">2026-27</div><div className="text-color-secondary text-sm mt-1">Active Session</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-CF-02:</b> Workflow Configuration through UI — no code deployment needed. <b>FR-CF-03:</b> Granular permissions matrix per role, per module, per action. <b>FR-CF-05:</b> Integration health status for all external APIs.</span>
        </div>
      </div>
      <div className="col-12 xl:col-4">
        <div className="card mb-3">
          <div className="font-semibold mb-3">Session Configuration (FR-CF-01)</div>
          <div className="grid">
            <div className="col-6 flex flex-column gap-1"><label className="text-sm font-medium">Session Year</label><InputText value="2026-27" readOnly className="p-inputtext-sm" /></div>
            <div className="col-6 flex flex-column gap-1"><label className="text-sm font-medium">Session Type</label><Dropdown value="Annual" options={['Annual']} className="text-sm" /></div>
            <div className="col-6 flex flex-column gap-1"><label className="text-sm font-medium">SIF Window Opens</label><InputText value="2026-08-01" className="p-inputtext-sm" /></div>
            <div className="col-6 flex flex-column gap-1"><label className="text-sm font-medium">SIF Window Closes</label><InputText value="2026-10-31" className="p-inputtext-sm" /></div>
          </div>
          <div className="flex align-items-center gap-2 mt-3">
            <Button label="Save" icon="pi pi-check" className="p-button-sm" onClick={() => save('Session')} />
            <Tag value="Session Active" severity="success" />
          </div>
        </div>
        <div className="card">
          <div className="font-semibold mb-3">Workflow SLA Configuration (FR-CF-02)</div>
          <div className="flex flex-column gap-3">
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">Scrutiny SLA (hours)</label><InputText value={scrutinySLA} onChange={e => setScrutinySLA(e.target.value)} className="p-inputtext-sm" /></div>
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">Verification SLA (hours)</label><InputText value={verifSLA} onChange={e => setVerifSLA(e.target.value)} className="p-inputtext-sm" /></div>
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">Final Approval SLA (hours)</label><InputText value={finalSLA} onChange={e => setFinalSLA(e.target.value)} className="p-inputtext-sm" /></div>
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">Auto-escalate on SLA breach</label><Dropdown value="Yes — Email + Dashboard + Registrar" options={['Yes — Email + Dashboard + Registrar','No']} className="text-sm" /></div>
          </div>
          <Button label="Save Workflow Config" icon="pi pi-check" className="p-button-sm mt-3" onClick={() => save('Workflow')} />
        </div>
      </div>
      <div className="col-12 xl:col-4">
        <div className="card mb-3">
          <div className="font-semibold mb-3">System Settings (FR-CF-04)</div>
          <div className="flex flex-column gap-3">
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">Session Timeout (minutes)</label><InputText value={timeout} onChange={e => setTimeout_(e.target.value)} className="p-inputtext-sm" /></div>
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">Max Login Attempts</label><InputText value={maxAttempts} onChange={e => setMaxAttempts(e.target.value)} className="p-inputtext-sm" /></div>
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">Max File Upload Size (MB)</label><InputText defaultValue="10" className="p-inputtext-sm" /></div>
            <div className="flex flex-column gap-1"><label className="text-sm font-medium">MFA Required</label><Dropdown value="Yes — all admin roles" options={['Yes — all admin roles','No']} className="text-sm" /></div>
          </div>
          <Button label="Save Settings" icon="pi pi-check" className="p-button-sm mt-3" onClick={() => save('System')} />
        </div>
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Integration Settings (FR-CF-05)</div>
          {INTEGRATIONS.map((intg, i) => (
            <div key={i} className="flex align-items-center justify-content-between p-2 border-bottom-1 surface-border">
              <div className="flex align-items-center gap-2">
                <i className={`pi ${intg.icon} text-sm`} style={{ color: intg.color }} />
                <div><div className="text-sm font-medium">{intg.name}</div><div className="text-xs font-mono text-color-secondary">{intg.ref}</div></div>
              </div>
              <Tag value={intg.status} severity={intg.status==='Connected'?'success':intg.status==='Partial (22/29)'?'warning':'danger'} className="text-xs" style={{ whiteSpace:'nowrap' }} />
            </div>
          ))}
          <div className="p-2"><Button label="Save Integration Config" icon="pi pi-check" className="p-button-sm" onClick={() => save('Integration')} /></div>
        </div>
      </div>
      <div className="col-12 xl:col-4">
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Role Permissions Matrix (FR-CF-03)</div>
          <div style={{ overflowX:'auto' }}>
            <DataTable value={PERM_ROWS} className="p-datatable-sm" showGridlines>
              <Column field="module"      header="Module"      style={{ minWidth:'120px', fontWeight:600 }} />
              <Column field="registrar"   header="Registrar"   style={{ width:'90px' }} body={r => <Tag value={r.registrar}   severity={permSev(r.registrar)   as any} className="text-xs" style={{ whiteSpace:'nowrap' }} />} />
              <Column field="scrutinizer" header="Scrutinizer" style={{ width:'100px' }} body={r => <Tag value={r.scrutinizer} severity={permSev(r.scrutinizer) as any} className="text-xs" style={{ whiteSpace:'nowrap' }} />} />
              <Column field="verifier"    header="Verifier"    style={{ width:'80px' }}  body={r => <Tag value={r.verifier}    severity={permSev(r.verifier)    as any} className="text-xs" style={{ whiteSpace:'nowrap' }} />} />
              <Column field="accounts"    header="Accounts"    style={{ width:'100px' }} body={r => <Tag value={r.accounts}    severity={permSev(r.accounts)    as any} className="text-xs" style={{ whiteSpace:'nowrap' }} />} />
              <Column field="it"          header="IT Admin"    style={{ width:'80px' }}  body={r => <Tag value={r.it}          severity={permSev(r.it)          as any} className="text-xs" style={{ whiteSpace:'nowrap' }} />} />
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfigPage;