'use client';
import { DataTable, Column, Button, Tag, InputText, Dropdown, Toast } from '../../../../lib/prime';
import React, { useState, useRef } from 'react';

const USERS = [
  { name:'Dr. Ramesh Kumar', role:'Registrar',          dept:'HQ — New Delhi',    modules:'All workflows — full access', lastLogin:'2 min ago', status:'Active'            },
  { name:'Dr. Kavitha Nair', role:'Scrutinizer',        dept:'South Zone',        modules:'Institution, SIF, Infra, Equip.', lastLogin:'1 hr ago', status:'Active'        },
  { name:'Mohan Rao',        role:'Sub-Scrutinizer',    dept:'South Zone',        modules:'Initial scrutiny — B.Pharm, D.Pharm', lastLogin:'3 hrs ago', status:'Active'  },
  { name:'Suresh Menon',     role:'Accounts — Maker',   dept:'HQ Finance',        modules:'Finance entry, invoices', lastLogin:'3 hrs ago', status:'Active'             },
  { name:'Anita Verma',      role:'Accounts — Verifier',dept:'HQ Finance',        modules:'Finance verification', lastLogin:'Yesterday', status:'Active'               },
  { name:'Priya Sharma',     role:'Inspector Approver', dept:'HQ',               modules:'Inspector assignments, approvals', lastLogin:'2 hrs ago', status:'Active'     },
  { name:'Anand Kumar',      role:'IT Admin',            dept:'HQ — IT',           modules:'Config, users, integrations', lastLogin:'2 days ago', status:'Active'       },
  { name:'Rekha Pillai',     role:'Verifier',            dept:'Kerala SPC',        modules:'Doc verification, workflow review', lastLogin:'Pending', status:'Pending Activation'},
];

const PERMS = [
  { module:'Dashboard',     registrar:'Full', scrutinizer:'View', verifier:'View', accounts:'Finance only', it:'Full' },
  { module:'Institutions',  registrar:'Full', scrutinizer:'Scrutinize', verifier:'Verify', accounts:'None', it:'View' },
  { module:'Workflow Engine',registrar:'Full', scrutinizer:'Scrutinize', verifier:'Verify', accounts:'None', it:'View' },
  { module:'Finance',       registrar:'View', scrutinizer:'None', verifier:'None', accounts:'Full', it:'View' },
  { module:'Master Data',   registrar:'Approve', scrutinizer:'None', verifier:'None', accounts:'Fee only', it:'Full' },
  { module:'Config & Settings',registrar:'None', scrutinizer:'None', verifier:'None', accounts:'None', it:'Full' },
  { module:'Audit Logs',    registrar:'Full', scrutinizer:'View own', verifier:'View own', accounts:'View own', it:'Full' },
];

const permSev = (p: string) => p==='Full'?'success':p==='None'?'secondary':'info';
const statusSev = (s: string) => s==='Active'?'success':'warning';

const UserRolesPage = () => {
  const toast = useRef<any>(null);
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [globalFilter, setGlobalFilter] = useState('');
  const [activeTab, setActiveTab] = useState<'users'|'perms'>('users');

  const filtered = USERS.filter(r => {
    const mr = roleFilter==='All Roles' || r.role===roleFilter;
    const mg = !globalFilter || r.name.toLowerCase().includes(globalFilter.toLowerCase());
    return mr && mg;
  });

  return (
    <div className="grid">
      <Toast ref={toast}/>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold">148</div><div className="text-color-secondary text-sm mt-1">Total Admin Users</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-orange-500">12</div><div className="text-color-secondary text-sm mt-1">Pending Activation</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-blue-400">6</div><div className="text-color-secondary text-sm mt-1">Active Departments</div></div></div>
      <div className="col-6 md:col-3"><div className="card text-center"><div className="text-3xl font-bold text-red-500">3</div><div className="text-color-secondary text-sm mt-1">Security Events (24h)</div></div></div>
      <div className="col-12"><div className="card p-2 flex align-items-center gap-2 text-sm text-color-secondary"><i className="pi pi-info-circle text-blue-400"/><span><b>FR-UR-03:</b> Centralised RBAC — permissions per role, per module, per action. <b>FR-UR-06:</b> Approval hierarchy configurable without code changes.</span></div></div>
      <div className="col-12">
        <div className="card p-0">
          <div className="flex gap-2 p-3 border-bottom-1 surface-border align-items-center">
            <Button label="Employee Management" className={activeTab==='users'?'p-button-sm':'p-button-outlined p-button-sm'} onClick={()=>setActiveTab('users')}/>
            <Button label="Permissions Matrix (FR-UR-03)" className={activeTab==='perms'?'p-button-sm':'p-button-outlined p-button-sm'} onClick={()=>setActiveTab('perms')}/>
            {activeTab==='users'&&<><div className="ml-auto flex gap-2"><Dropdown value={roleFilter} options={['All Roles','Registrar','Scrutinizer','Sub-Scrutinizer','Verifier','Accounts — Maker','Inspector Approver','IT Admin']} onChange={e=>setRoleFilter(e.value)} className="text-sm" style={{width:'190px'}}/><span className="p-input-icon-left"><i className="pi pi-search"/><InputText value={globalFilter} onChange={e=>setGlobalFilter(e.target.value)} placeholder="Search…" className="p-inputtext-sm" style={{width:'160px'}}/></span><Button label="Add Employee" icon="pi pi-plus" className="p-button-sm"/></div></>}
          </div>
          {activeTab==='users'
            ? <DataTable value={filtered} className="p-datatable-sm" showGridlines paginator rows={10} rowClassName={row=>row.status==='Pending Activation'?'bg-orange-50':''}>
                <Column field="name" header="Employee" body={row=><div className="font-medium">{row.name}</div>} style={{minWidth:'160px'}}/>
                <Column field="role" header="Role" body={row=><Tag value={row.role} severity="info" className="text-xs"/>} style={{width:'150px'}}/>
                <Column field="dept" header="Dept / Zone" className="text-sm" style={{minWidth:'130px'}}/>
                <Column field="modules" header="Assigned Workflows" className="text-xs text-color-secondary" style={{minWidth:'200px'}}/>
                <Column field="lastLogin" header="Last Login" className="text-sm" style={{width:'110px'}}/>
                <Column field="status" header="Status" body={row=><Tag value={row.status} severity={statusSev(row.status) as any} className="text-xs"/>} style={{width:'140px'}}/>
                <Column header="Actions" body={row=><div className="flex gap-1"><Button icon="pi pi-pencil" className="p-button-text p-button-sm"/>{row.status==='Pending Activation'&&<Button icon="pi pi-check" className="p-button-success p-button-text p-button-sm" onClick={()=>toast.current?.show({severity:'success',summary:'User Activated',detail:row.name,life:2000})}/>}</div>} style={{width:'90px'}}/>
              </DataTable>
            : <DataTable value={PERMS} className="p-datatable-sm" showGridlines>
                <Column field="module" header="Module" body={row=><div className="font-medium text-sm">{row.module}</div>} style={{minWidth:'150px'}}/>
                <Column field="registrar"   header="Registrar"   body={row=><Tag value={row.registrar}   severity={permSev(row.registrar) as any}   className="text-xs"/>} style={{width:'110px'}}/>
                <Column field="scrutinizer" header="Scrutinizer" body={row=><Tag value={row.scrutinizer} severity={permSev(row.scrutinizer) as any} className="text-xs"/>} style={{width:'110px'}}/>
                <Column field="verifier"    header="Verifier"    body={row=><Tag value={row.verifier}    severity={permSev(row.verifier) as any}    className="text-xs"/>} style={{width:'110px'}}/>
                <Column field="accounts"    header="Accounts"    body={row=><Tag value={row.accounts}    severity={permSev(row.accounts) as any}    className="text-xs"/>} style={{width:'110px'}}/>
                <Column field="it"          header="IT Admin"    body={row=><Tag value={row.it}          severity={permSev(row.it) as any}          className="text-xs"/>} style={{width:'110px'}}/>
              </DataTable>}
        </div>
      </div>
    </div>
  );
};
export default UserRolesPage;
