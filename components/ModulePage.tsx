'use client';
import React from 'react';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface Stat { label: string; value: string; sub?: string; color?: string }
interface RegNote { text: string; refs: string[] }
interface TableCol { field: string; header: string; width?: string; body?: (row: any) => React.ReactNode }

interface ModulePageProps {
  title: string;
  regNote: RegNote;
  stats: Stat[];
  tableTitle?: string;
  tableData?: any[];
  tableCols?: TableCol[];
  children?: React.ReactNode;
  actions?: { label: string; icon: string; severity?: string }[];
}

export function ModulePage({ title, regNote, stats, tableTitle, tableData, tableCols, children, actions }: ModulePageProps) {
  return (
    <div className="grid">
      {/* Stat cards */}
      {stats.map((s, i) => (
        <div key={i} className={`col-12 ${stats.length === 4 ? 'md:col-3' : stats.length === 3 ? 'md:col-4' : 'md:col-6'}`}>
          <div className="card text-center">
            <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-color-secondary text-sm mt-1">{s.label}</div>
            {s.sub && <div className="text-xs text-color-secondary mt-1">{s.sub}</div>}
          </div>
        </div>
      ))}

      {/* Regulation strip */}
      <div className="col-12">
        <div className="card p-2">
          <div className="flex align-items-start gap-2 text-sm text-color-secondary">
            <i className="pi pi-info-circle text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <span>{regNote.text}</span>
              <span className="ml-2">{regNote.refs.map(r => <span key={r} className="font-mono text-xs bg-blue-900 text-blue-200 border-round px-1 mr-1">{r}</span>)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions toolbar */}
      {actions && actions.length > 0 && (
        <div className="col-12">
          <div className="card py-2">
            <div className="flex flex-wrap gap-2">
              {actions.map(a => (
                <Button key={a.label} label={a.label} icon={`pi ${a.icon}`}
                  className={`p-button-sm ${a.severity ? `p-button-${a.severity}` : 'p-button-outlined'}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Custom children */}
      {children}

      {/* Data table */}
      {tableData && tableCols && (
        <div className="col-12">
          <div className="card p-0">
            {tableTitle && (
              <div className="flex align-items-center justify-content-between px-3 py-2 border-bottom-1 surface-border">
                <span className="font-semibold">{tableTitle}</span>
                <Button label="Export" icon="pi pi-file-export" className="p-button-outlined p-button-sm" />
              </div>
            )}
            <DataTable value={tableData} paginator rows={10} className="p-datatable-sm" showGridlines>
              {tableCols.map(col => (
                <Column
                  key={col.field}
                  field={col.field}
                  header={col.header}
                  body={col.body}
                  style={col.width ? { width: col.width } : undefined}
                />
              ))}
            </DataTable>
          </div>
        </div>
      )}
    </div>
  );
}
