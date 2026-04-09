import { MenuModal } from '../types/layout';
import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model: MenuModal[] = [
        {
            label: 'Governance',
            icon: 'pi pi-fw pi-shield',
            items: [
                { label: 'Dashboard & Analytics', icon: 'pi pi-fw pi-chart-bar',    to: '/pci/dashboard' },
                { label: 'Reports & MIS',          icon: 'pi pi-fw pi-file-export',  to: '/pci/reports' },
                { label: 'Audit Logs',             icon: 'pi pi-fw pi-lock',         to: '/pci/audit' },
            ]
        },
        { separator: true },
        {
            label: 'Institutions',
            icon: 'pi pi-fw pi-building',
            items: [
                { label: 'Institution Mgmt',       icon: 'pi pi-fw pi-home',         to: '/pci/institutions' },
                { label: 'Faculty Management',      icon: 'pi pi-fw pi-users',        to: '/pci/faculty' },
    { label: 'Infrastructure',         icon: 'pi pi-fw pi-sitemap',      to: '/pci/infrastructure' },
                { label: 'Equipment',              icon: 'pi pi-fw pi-cog',          to: '/pci/equipment' },
                { label: 'Library',                icon: 'pi pi-fw pi-book',         to: '/pci/library' },
                { label: 'Hospital Affiliations',  icon: 'pi pi-fw pi-plus-circle',  to: '/pci/hospital' },
            ]
        },
        { separator: true },
        {
            label: 'People',
            icon: 'pi pi-fw pi-users',
            items: [
                { label: 'Student Mgmt',           icon: 'pi pi-fw pi-graduation-cap', to: '/pci/student' },
                { label: 'Pharmacist Mgmt',        icon: 'pi pi-fw pi-id-card',       to: '/pci/pharmacist' },
                { label: 'Inspector Mgmt',         icon: 'pi pi-fw pi-search',        to: '/pci/inspector-mgmt' },
                { label: 'Organisation / Employer',icon: 'pi pi-fw pi-briefcase',     to: '/pci/employer' },
            ]
        },
        { separator: true },
        {
            label: 'Operations',
            icon: 'pi pi-fw pi-cog',
            items: [
                { label: 'Inspection Mgmt',        icon: 'pi pi-fw pi-clipboard',     to: '/pci/inspection' },
                { label: 'Workflow Engine',         icon: 'pi pi-fw pi-arrow-right-arrow-left', to: '/pci/workflow' },
                { label: 'Examining Authority',    icon: 'pi pi-fw pi-verified',      to: '/pci/ea' },
                { label: 'Grievance Mgmt',         icon: 'pi pi-fw pi-ticket',        to: '/pci/grievance' },
                { label: 'Scrutiny Report',        icon: 'pi pi-fw pi-eye',           to: '/pci/scrutiny' },
            ]
        },
        { separator: true },
        {
            label: 'Finance',
            icon: 'pi pi-fw pi-indian-rupee',
            items: [
                { label: 'Finance & Payments',     icon: 'pi pi-fw pi-credit-card',   to: '/pci/finance' },
                { label: 'Reconciliation',         icon: 'pi pi-fw pi-calculator',    to: '/pci/reconciliation' },
            ]
        },
        { separator: true },
        {
            label: 'Config',
            icon: 'pi pi-fw pi-wrench',
            items: [
                { label: 'Master Data',            icon: 'pi pi-fw pi-database',      to: '/pci/master-data' },
                { label: 'General Info',           icon: 'pi pi-fw pi-info-circle',   to: '/pci/general-info' },
                { label: 'User & Roles',           icon: 'pi pi-fw pi-user-edit',     to: '/pci/user-roles' },
                { label: 'Communication',          icon: 'pi pi-fw pi-send',          to: '/pci/communication' },
                { label: 'Config & Settings',      icon: 'pi pi-fw pi-sliders-h',     to: '/pci/config' },
            ]
        },
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
