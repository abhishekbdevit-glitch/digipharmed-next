# DIGI-PHARMed Admin Portal — Atlantis Prime React Theme

## Stack
- **Framework**: Next.js 13 (App Router) + TypeScript
- **UI Library**: PrimeReact 10.2.1 + PrimeIcons + PrimeFlex
- **Theme**: Atlantis Prime React v10.1.0 (dark/dim/light, 7 menu modes)
- **Regulatory Constants**: `lib/pci-constants.ts` — all PCI rules from Gazette

## Setup

```bash
cd digipharmed-admin
npm install
npm run dev
# → http://localhost:3000  (auto-redirects to /pci/dashboard)
```

## Project Structure

```
digipharmed-admin/
├── lib/
│   └── pci-constants.ts          ← ALL PCI regulatory constants (TypeScript)
│                                    BPHARM_REQUIREMENTS, MQT_REQUIREMENTS,
│                                    NON_TEACHING_REQUIREMENTS, BPHARM_ROOMS,
│                                    BPHARM_LABS, DPHARM_LABS, DPHARM_EQUIPMENT,
│                                    SEED_FACULTY (14 real faculty from SIF),
│                                    computeFacultyCompliance()
├── components/
│   └── ModulePage.tsx             ← Reusable module page shell
├── layout/
│   └── AppMenu.tsx                ← PCI 6-group accordion nav (REPLACED)
└── app/(main)/pci/
    ├── dashboard/                 ← 4-zone KPI dashboard (FR-DA-01 to FR-DA-07)
    ├── institutions/              ← Institution registry + compliance (FR-IM-*)
    ├── scrutiny/                  ← Live regulatory validation from constants
    ├── infrastructure/            ← Infra compliance, photo review (FR-IF-*)
    ├── equipment/                 ← Equipment gap analysis (FR-EQ-*)
    ├── library/                   ← Library compliance, mobile sync (FR-LM-*)
    ├── hospital/                  ← Pharm.D hospital affiliations (FR-HM-*)
    ├── student/                   ← Student registry, eKYC (FR-SM-*)
    ├── pharmacist/                ← PRTS, NHA list (FR-PM-*)
    ├── inspector-mgmt/            ← Inspector pool + performance (FR-IN-*)
    ├── employer/                  ← Job portal employer mgmt (FR-OE-*)
    ├── inspection/                ← Inspection lifecycle (FR-IS-*)
    ├── workflow/                  ← Workflow engine + inline actions (FR-WE-*)
    ├── ea/                        ← Examining Authority mgmt (FR-EA-*)
    ├── grievance/                 ← Grievance + SLA tracking (FR-GV-*)
    ├── finance/                   ← Fee collection + I&E (FR-FP-*)
    ├── reconciliation/            ← Gateway vs ledger match
    ├── reports/                   ← MIS + custom builder (FR-RP-*)
    ├── communication/             ← Notification engine (FR-CM-*)
    ├── audit/                     ← Immutable audit trail (FR-AU-*)
    ├── master-data/               ← Versioned master data (FR-MD-*)
    ├── general-info/              ← Programme + EA master (FR-GI-*)
    ├── user-roles/                ← RBAC + permissions matrix (FR-UR-*)
    └── config/                    ← Session, workflow, integrations (FR-CF-*)
```

## Regulatory Constants (lib/pci-constants.ts)

All PCI rules from Gazette are coded here:

| Constant | Source | Description |
|---|---|---|
| `BPHARM_REQUIREMENTS[60|100]` | Gazette 362, Appendix-A, Cl. 3(iii) | Faculty slots per dept × designation |
| `MQT_REQUIREMENTS` | MQT Regulations 2014 | Qualification requirements per designation |
| `NON_TEACHING_REQUIREMENTS` | Appendix-A, Cl. 4 | 9 non-teaching staff roles with min counts |
| `BPHARM_ROOMS` | Appendix-A, Cl. 5 | 12 rooms (mandatory/conditional, areas) |
| `BPHARM_LABS` | Appendix-A, Cl. 5 | 8 labs, each ≥900 sq.ft. |
| `DPHARM_LABS` | Appendix-3, ER-2020 | 6 D.Pharm labs including model pharmacy |
| `DPHARM_EQUIPMENT` | Appendix-3, ER-2020 | Per-lab equipment lists with min quantities |
| `SEED_FACULTY` | SIF_2026-27.pdf | 14 real faculty with qualifications |
| `computeFacultyCompliance()` | Derived | Computes compliance scores from faculty data |

## Scrutiny Module

`/pci/scrutiny` is the most regulatory-intensive module:
- Auto-computes HOI check, all 15 dept×desig slots, Ph.D gate violations, full-time checks, NT staff counts from SEED_FACULTY + BPHARM_REQUIREMENTS
- Infrastructure items start as `not_entered` and accept manual override (Compliant / Non-Compliant / Not Entered)
- Summary score computed as `(compliant + partial×0.5) / total × 100`
- Grouped by section with collapsible panels and deficiency badges

## Theme Configuration

Switch theme in the bottom-right config panel:
- **Color Scheme**: Dark (default) / Dim / Light
- **Menu Mode**: Static / Overlay / Slim / Horizontal / Reveal / Drawer
- **Theme**: Magenta (default) + 20 other colors

All theme files are in `styles/layout/` — do not modify.
