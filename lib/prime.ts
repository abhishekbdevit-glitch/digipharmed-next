// Central PrimeReact barrel — import from here across all pages.
// Webpack sees one module → builds one shared chunk → all pages share it.
// Without this, each page triggers its own primereact traversal.

export { DataTable } from 'primereact/datatable';
export { Column }    from 'primereact/column';
export { Button }    from 'primereact/button';
export { Tag }       from 'primereact/tag';
export { Badge }     from 'primereact/badge';
export { InputText } from 'primereact/inputtext';
export { Dropdown }  from 'primereact/dropdown';
export { Dialog }    from 'primereact/dialog';
export { Toast }     from 'primereact/toast';
export { ProgressBar } from 'primereact/progressbar';
export { Panel }     from 'primereact/panel';
export { Message }   from 'primereact/message';
export { Divider }   from 'primereact/divider';
export { SelectButton } from 'primereact/selectbutton';
export { Toolbar }   from 'primereact/toolbar';
export { Checkbox }  from 'primereact/checkbox';
export { InputTextarea } from 'primereact/inputtextarea';
export { Chart }     from 'primereact/chart';
