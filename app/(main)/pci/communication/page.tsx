'use client';
import { DataTable, Column, Button, Tag, Dropdown, InputTextarea, Toast, Checkbox } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const LOGS = [
  { id:'MSG-001', template:'SIF Deadline Reminder',  recipients:'1,240 institutions', channels:'Email + SMS',            sentAt:'Apr 8, 14:00', status:'Delivered', deliveryRate:'98.4%' },
  { id:'MSG-002', template:'Inspection Scheduled',   recipients:'Raj Kumar + 1 inst.', channels:'Email',                 sentAt:'Apr 8, 13:22', status:'Delivered', deliveryRate:'100%'  },
  { id:'MSG-003', template:'Fee Due Notice',         recipients:'834 pharmacists',    channels:'SMS',                    sentAt:'Apr 7, 10:00', status:'Delivered', deliveryRate:'97.2%' },
  { id:'MSG-004', template:'Deficiency Notice',      recipients:'KLE Belagavi',       channels:'Email',                  sentAt:'Apr 6, 16:30', status:'Failed',    deliveryRate:'0%'    },
  { id:'MSG-005', template:'Approval Notification',  recipients:'Seven Hills College', channels:'Email + WhatsApp',       sentAt:'Apr 6, 11:00', status:'Delivered', deliveryRate:'100%'  },
  { id:'MSG-006', template:'Query Raised',           recipients:'MAHE Manipal',       channels:'Email + In-App',         sentAt:'Apr 5, 09:15', status:'Delivered', deliveryRate:'100%'  },
];

const ALERT_CONFIGS = [
  { event:'SIF Submission Deadline',  timing:'15 days before + 7 days before + day of', channels:'Email + SMS',        active:true  },
  { event:'SLA Breach — Workflow',    timing:'On breach: immediate escalation',         channels:'Email + In-App',    active:true  },
  { event:'Inspection Scheduled',     timing:'3 days before inspection date',           channels:'Email + SMS',        active:true  },
  { event:'Fee Payment Due',          timing:'30 days before + 7 days before',          channels:'Email + SMS',        active:true  },
  { event:'Pharmacist Renewal Due',   timing:'60 days before expiry',                  channels:'Email + SMS + WA',   active:true  },
  { event:'Inspector Pool Low',       timing:'When available < 5 per zone',             channels:'Email + In-App',    active:false },
];

const TEMPLATES = ['SIF Submission Reminder','Deficiency Notice','Inspection Scheduled','Fee Due Reminder','Approval Notification','Query Raised','Custom Message'];
const RECIPIENT_GROUPS = ['All Institutions — B.Pharm (1,240)','Pending SIF Institutions','Deficient Institutions','All Inspectors (284)','All Pharmacists — NHA Listed','Specific Institution'];

const CommunicationPage = () => {
  const toast = useRef<any>(null);
  const [template,      setTemplate]      = useState(TEMPLATES[0]);
  const [recipientGrp,  setRecipientGrp]  = useState(RECIPIENT_GROUPS[0]);
  const [msgBody,       setMsgBody]        = useState('Dear {institution_name}, your SIF submission for {session_year} is due on {deadline_date}. Login at {portal_url} to complete. — PCI');
  const [emailCh,       setEmailCh]        = useState(true);
  const [smsCh,         setSmsCh]          = useState(true);
  const [waCh,          setWaCh]           = useState(false);
  const [inAppCh,       setInAppCh]        = useState(false);

  return (
    <div className="grid">
      <Toast ref={toast} />
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">24,800</div><div className="text-color-secondary text-sm mt-1">Messages Sent (30 days)</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-green-500">94.2%</div><div className="text-color-secondary text-sm mt-1">Delivery Rate</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">8</div><div className="text-color-secondary text-sm mt-1">Scheduled Messages</div></div></div>
      <div className="col-12 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">3</div><div className="text-color-secondary text-sm mt-1">Failed / Retry Queued</div></div></div>
      <div className="col-12">
        <div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary">
          <i className="pi pi-info-circle text-blue-400 flex-shrink-0" />
          <span><b>FR-CM-01:</b> Notification Engine subscribing to events from all modules. <b>FR-CM-04:</b> Admin-configurable templates with dynamic placeholders. <b>FR-CM-05:</b> Retry with exponential backoff for failed deliveries.</span>
        </div>
      </div>
      <div className="col-12 xl:col-5">
        <div className="card">
          <div className="font-semibold mb-3">Compose Notification (FR-CM-04)</div>
          <div className="mb-3">
            <label className="font-medium text-sm block mb-2">Channel (FR-CM-01)</label>
            <div className="flex gap-3 flex-wrap">
              {[{label:'Email',state:emailCh,set:setEmailCh},{label:'SMS',state:smsCh,set:setSmsCh},{label:'WhatsApp',state:waCh,set:setWaCh},{label:'In-App',state:inAppCh,set:setInAppCh}].map(ch => (
                <div key={ch.label} className="flex align-items-center gap-2 cursor-pointer" onClick={() => ch.set(!ch.state)}>
                  <Checkbox checked={ch.state} onChange={() => ch.set(!ch.state)} />
                  <label className="text-sm cursor-pointer">{ch.label}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="font-medium text-sm block mb-2">Recipient Group</label>
            <Dropdown value={recipientGrp} options={RECIPIENT_GROUPS} onChange={e => setRecipientGrp(e.value)} className="w-full text-sm" />
          </div>
          <div className="mb-3">
            <label className="font-medium text-sm block mb-2">Template</label>
            <Dropdown value={template} options={TEMPLATES} onChange={e => setTemplate(e.value)} className="w-full text-sm" />
          </div>
          <div className="mb-3">
            <label className="font-medium text-sm block mb-2">Message Preview (with dynamic placeholders)</label>
            <InputTextarea value={msgBody} onChange={e => setMsgBody(e.target.value)} rows={4} className="w-full text-sm" autoResize />
          </div>
          <div className="flex gap-2">
            <Button label="Send Now" icon="pi pi-send" className="p-button-sm" onClick={() => toast.current?.show({ severity:'success', summary:'Sent', detail:`Notification queued for ${recipientGrp}`, life:3000 })} />
            <Button label="Schedule" icon="pi pi-clock" className="p-button-outlined p-button-sm" />
          </div>
        </div>
      </div>
      <div className="col-12 xl:col-7">
        <div className="card p-0 mb-3">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Notification Logs — Email & SMS (FR-CM-02)</div>
          <DataTable value={LOGS} className="p-datatable-sm" showGridlines rows={6} paginator>
            <Column field="template"     header="Template" style={{ minWidth:'160px' }} />
            <Column field="recipients"   header="Recipients" className="text-sm" style={{ width:'150px' }} />
            <Column field="channels"     header="Channels" className="text-xs" style={{ width:'140px' }} />
            <Column field="sentAt"       header="Sent At" className="text-sm" style={{ width:'120px' }} />
            <Column field="deliveryRate" header="Rate" className="font-mono text-center" style={{ width:'70px' }} />
            <Column header="Status" style={{ width:'90px' }} body={r => <Tag value={r.status} severity={r.status==='Delivered'?'success':'danger'} className="text-xs" />} />
          </DataTable>
        </div>
        <div className="card p-0">
          <div className="px-3 py-2 border-bottom-1 surface-border font-semibold">Alerts & Reminders Config (FR-CM-03)</div>
          {ALERT_CONFIGS.map((a, i) => (
            <div key={i} className="flex align-items-center justify-content-between p-3 border-bottom-1 surface-border">
              <div>
                <div className="font-medium text-sm">{a.event}</div>
                <div className="text-xs text-color-secondary mt-1">{a.timing} · {a.channels}</div>
              </div>
              <div className="flex align-items-center gap-2">
                <Tag value={a.active?'Active':'Inactive'} severity={a.active?'success':'secondary'} className="text-xs" />
                <Button icon="pi pi-cog" className="p-button-sm p-button-text" tooltip="Configure" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CommunicationPage;