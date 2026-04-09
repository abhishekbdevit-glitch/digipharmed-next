// ─── PCI Regulatory Constants ────────────────────────────────────────────────
// Source: B.Pharm Course Regulations 2014, Gazette No. 362, Dec 11 2014
//         D.Pharm ER-2020, Gazette No. 435, Oct 2020
//         MQT Regulations 2014, Gazette No. 325, Nov 12 2014

// ─── Courses ─────────────────────────────────────────────────────────────────
export const COURSES = [
  { id: 'bpharm',  label: 'B.Pharm',  fullLabel: 'Bachelor of Pharmacy',    duration: '4 years' },
  { id: 'dpharm',  label: 'D.Pharm',  fullLabel: 'Diploma in Pharmacy',     duration: '2 years' },
  { id: 'mpharm',  label: 'M.Pharm',  fullLabel: 'Master of Pharmacy',      duration: '2 years' },
  { id: 'pharmd',  label: 'Pharm.D',  fullLabel: 'Doctor of Pharmacy',      duration: '6 years' },
] as const;

export const INTAKE_OPTIONS = [60, 100] as const;

// ─── Departments ──────────────────────────────────────────────────────────────
export const DEPARTMENTS = {
  PHARMACEUTICS:     'pharmaceutics',
  PHARM_CHEMISTRY:   'pharm_chemistry',
  PHARMACOLOGY:      'pharmacology',
  PHARMACOGNOSY:     'pharmacognosy',
  PHARMACY_PRACTICE: 'pharmacy_practice',
} as const;

export const DESIGNATIONS = {
  HOI:        'hoi',
  PROFESSOR:  'professor',
  ASSOC_PROF: 'assoc_prof',
  ASST_PROF:  'asst_prof',
  LECTURER:   'lecturer',
} as const;

export const DEPT_LABELS: Record<string, string> = {
  pharmaceutics:     'Pharmaceutics',
  pharm_chemistry:   'Pharm. Chemistry (incl. Analysis)',
  pharmacology:      'Pharmacology',
  pharmacognosy:     'Pharmacognosy',
  pharmacy_practice: 'Pharmacy Practice & Related',
};

export const DESIG_LABELS: Record<string, string> = {
  hoi:        'Head of Institution / Director',
  professor:  'Professor',
  assoc_prof: 'Associate Professor',
  asst_prof:  'Assistant Professor',
  lecturer:   'Lecturer',
};

// ─── B.Pharm Faculty requirements (Appendix-A, Cl. 3(iii)) ──────────────────
export const BPHARM_REQUIREMENTS: Record<number, Record<string, number>> = {
  60: {
    'pharmaceutics_professor':      1,
    'pharmaceutics_asst_prof':      1,
    'pharmaceutics_lecturer':       2,
    'pharm_chemistry_professor':    1,
    'pharm_chemistry_asst_prof':    1,
    'pharm_chemistry_lecturer':     3,
    'pharmacology_professor':       1,
    'pharmacology_asst_prof':       1,
    'pharmacology_lecturer':        2,
    'pharmacognosy_professor':      1,
    'pharmacognosy_asst_prof':      1,
    'pharmacognosy_lecturer':       1,
    'pharmacy_practice_professor':  0, // Not required at intake 60
    'pharmacy_practice_asst_prof':  1,
    'pharmacy_practice_lecturer':   1,
  },
  100: {
    'pharmaceutics_professor':      1,
    'pharmaceutics_asst_prof':      2,
    'pharmaceutics_lecturer':       3,
    'pharm_chemistry_professor':    1,
    'pharm_chemistry_asst_prof':    2,
    'pharm_chemistry_lecturer':     3,
    'pharmacology_professor':       1,
    'pharmacology_asst_prof':       1,
    'pharmacology_lecturer':        3,
    'pharmacognosy_professor':      1,
    'pharmacognosy_asst_prof':      1,
    'pharmacognosy_lecturer':       1,
    'pharmacy_practice_professor':  1, // Required at intake 100
    'pharmacy_practice_asst_prof':  1,
    'pharmacy_practice_lecturer':   1,
  },
};

// ─── MQT Requirements (MQT Regulations 2014) ─────────────────────────────────
export interface MQTRequirement {
  label: string;
  ug: string;
  pg: string;
  phd: string;
  exp: string;
  ref: string;
}

export const MQT_REQUIREMENTS: Record<string, MQTRequirement> = {
  hoi: {
    label: 'Head of Institution / Director / Principal',
    ug:  'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg:  'M.Pharm (relevant specialization, PCI recognized)',
    phd: 'Ph.D in any Pharmacy subject (PCI recognized) — Mandatory',
    exp: '15 yrs teaching/research; 5 yrs as Professor/HOD in PCI-approved college',
    ref: 'MQT 2014 — Table, Section II',
  },
  professor: {
    label: 'Professor',
    ug:  'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg:  'M.Pharm (relevant specialization, PCI recognized)',
    phd: 'Ph.D in any Pharmacy subject (PCI recognized) — Mandatory',
    exp: '10 yrs teaching/research; 5 yrs as Associate Professor in PCI-approved college',
    ref: 'MQT 2014 — Table, Section II',
  },
  assoc_prof: {
    label: 'Associate Professor',
    ug:  'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg:  'M.Pharm (relevant spec.) OR Pharm.D (for Pathophysiology, Pharmacology, Pharmacy Practice)',
    phd: 'Must acquire PCI-recognized Ph.D within 7 years of appointment',
    exp: '3 yrs teaching/research at Assistant Professor level in PCI-approved college',
    ref: 'MQT 2014 — Table, Section II',
  },
  asst_prof: {
    label: 'Assistant Professor',
    ug:  'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg:  'M.Pharm (relevant specialization, PCI recognized)',
    phd: 'Desirable',
    exp: 'No minimum, fresh M.Pharm eligible',
    ref: 'MQT 2014 — Table, Section II',
  },
  lecturer: {
    label: 'Lecturer',
    ug:  'First Class B.Pharm (≥60%) from PCI-approved institution',
    pg:  'M.Pharm preferred; B.Pharm eligible with specified experience',
    phd: 'Not mandatory',
    exp: 'No minimum for M.Pharm holders',
    ref: 'MQT 2014 — Table, Section II',
  },
};

// ─── Non-Teaching Staff requirements (Appendix-A, Cl. 4) ─────────────────────
export const NON_TEACHING_REQUIREMENTS = [
  { id: 'lab_tech',    role: 'Laboratory Technician',    minCount: 5, qualification: 'D.Pharm — 1 per department', ref: 'Appendix-A, Cl. 4' },
  { id: 'lab_asst',   role: 'Lab Assistant / Attender', minCount: 8, qualification: 'SSLC — 1 per laboratory',    ref: 'Appendix-A, Cl. 4' },
  { id: 'off_sup',    role: 'Office Superintendent',     minCount: 1, qualification: 'Degree',                     ref: 'Appendix-A, Cl. 4' },
  { id: 'accountant', role: 'Accountant',                minCount: 1, qualification: 'Degree',                     ref: 'Appendix-A, Cl. 4' },
  { id: 'storekeeper',role: 'Store Keeper',              minCount: 1, qualification: 'D.Pharm or Degree',          ref: 'Appendix-A, Cl. 4' },
  { id: 'computer_op',role: 'Computer Data Operator',    minCount: 1, qualification: 'BCA / Grad. + CS',           ref: 'Appendix-A, Cl. 4' },
  { id: 'office_12',  role: 'Office Staff I & II',       minCount: 3, qualification: 'Degree — Min. 1+2',          ref: 'Appendix-A, Cl. 4' },
  { id: 'peon',       role: 'Peon',                      minCount: 2, qualification: 'SSLC',                       ref: 'Appendix-A, Cl. 4' },
  { id: 'cleaning',   role: 'Cleaning / Gardener',       minCount: 2, qualification: 'No qualification specified',  ref: 'Appendix-A, Cl. 4' },
] as const;

// ─── Infrastructure — B.Pharm Rooms ──────────────────────────────────────────
export interface RoomSpec {
  id: string;
  label: string;
  mandatory: boolean;
  minCount: number;
  minAreaPerUnit: number | null;
  areaUnit: string;
  note: string;
  ref: string;
}

export const BPHARM_ROOMS: RoomSpec[] = [
  { id: 'lecture_hall',    label: 'Lecture Hall',               mandatory: true,  minCount: 2, minAreaPerUnit: 900,  areaUnit: 'sq. ft.', note: 'Minimum 2 lecture halls required',                          ref: 'Appendix-A, Cl. 5' },
  { id: 'principal_room',  label: 'Principal / HOD Room',       mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Suitable accommodation with adequate ventilation',            ref: 'Appendix-A, Cl. 5' },
  { id: 'office',          label: 'Administrative Office',       mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Adequate ventilation and hygienic conditions required',       ref: 'Appendix-A, Cl. 5' },
  { id: 'library',         label: 'Library',                     mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Adequate seating and reference materials',                   ref: 'Appendix-A, Cl. 5' },
  { id: 'common_room',     label: 'Common Room (Boys & Girls)',  mandatory: true,  minCount: 2, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Separate common rooms for boys and girls',                   ref: 'Appendix-A, Cl. 5' },
  { id: 'balance_room',    label: 'Balance Room',                mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Mandatory additional provision',                             ref: 'Appendix-A, Cl. 5' },
  { id: 'machine_room',    label: 'Machine Room',                mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'For pharmaceutical machinery',                              ref: 'Appendix-A, Cl. 5' },
  { id: 'animal_house',    label: 'Animal House',                mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'CPCSEA compliance required',                                ref: 'Appendix-A, Cl. 5' },
  { id: 'store_room',      label: 'Store Room',                  mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'For chemicals and instruments storage',                      ref: 'Appendix-A, Cl. 5' },
  { id: 'museum',          label: 'Museum / Pharmacognosy Museum',mandatory: false, minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Recommended — specimens and models',                        ref: 'Appendix-A, Cl. 5' },
  { id: 'dispensary',      label: 'Dispensary',                  mandatory: true,  minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Clinical pharmacy dispensary for practice',                  ref: 'Appendix-A, Cl. 5' },
  { id: 'herbal_garden',   label: 'Herbal Garden',               mandatory: false, minCount: 1, minAreaPerUnit: null, areaUnit: 'sq. ft.', note: 'Conditional — living specimens of medicinal plants',         ref: 'Appendix-A, Cl. 5' },
];

// ─── Infrastructure — B.Pharm Labs ───────────────────────────────────────────
export interface LabSpec {
  id: string;
  label: string;
  minArea: number;
  areaUnit: string;
  note: string;
  ref: string;
}

export const BPHARM_LABS: LabSpec[] = [
  { id: 'pharma_pk_1',   label: 'Pharmaceutics & PK Lab 1',          minArea: 900, areaUnit: 'sq. ft.', note: 'Includes Preparation Room (900 sq. ft. total)', ref: 'Appendix-A, Cl. 5' },
  { id: 'pharma_pk_2',   label: 'Pharmaceutics & PK Lab 2',          minArea: 900, areaUnit: 'sq. ft.', note: 'Includes Preparation Room (900 sq. ft. total)', ref: 'Appendix-A, Cl. 5' },
  { id: 'life_sci_1',    label: 'Life Science Lab 1 (Pharmacology)',  minArea: 900, areaUnit: 'sq. ft.', note: 'Physiology, Pharmacology & Pathophysiology',    ref: 'Appendix-A, Cl. 5' },
  { id: 'life_sci_2',    label: 'Life Science Lab 2 (Pharmacology)',  minArea: 900, areaUnit: 'sq. ft.', note: 'Physiology, Pharmacology & Pathophysiology',    ref: 'Appendix-A, Cl. 5' },
  { id: 'pharm_chem_1',  label: 'Pharmaceutical Chemistry Lab 1',    minArea: 900, areaUnit: 'sq. ft.', note: 'Pharmaceutical Analysis included',              ref: 'Appendix-A, Cl. 5' },
  { id: 'pharm_chem_2',  label: 'Pharmaceutical Chemistry Lab 2',    minArea: 900, areaUnit: 'sq. ft.', note: 'Pharmaceutical Analysis included',              ref: 'Appendix-A, Cl. 5' },
  { id: 'pharmacognosy', label: 'Pharmacognosy Lab',                  minArea: 900, areaUnit: 'sq. ft.', note: 'Pharmacognosy & Phytochemistry',                ref: 'Appendix-A, Cl. 5' },
  { id: 'pharm_analysis',label: 'Pharmaceutical Analysis Lab',        minArea: 900, areaUnit: 'sq. ft.', note: 'Instrumental methods of analysis',             ref: 'Appendix-A, Cl. 5' },
];

// ─── Infrastructure — B.Pharm Lab Fittings ───────────────────────────────────
export const BPHARM_LAB_FITTINGS = [
  { id: 'gas_fittings',  label: 'Gas Fittings',               mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'water_supply',  label: 'Water Supply & Drainage',    mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'shelves',       label: 'Shelves & Storage Cupboards',mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'fume_cupboard', label: 'Fuming Cupboards',           mandatory: true,  ref: 'Appendix-A, Cl. 5' },
  { id: 'aseptic_room',  label: 'Aseptic Room / Cabinet',     mandatory: true,  ref: 'Appendix-A, Cl. 5' },
] as const;

// ─── Infrastructure — D.Pharm Labs (Appendix-3, ER-2020) ─────────────────────
export const DPHARM_LABS: LabSpec[] = [
  { id: 'pharma_lab',    label: 'Pharmaceutics Lab',                  minArea: 900,  areaUnit: 'sq. ft.', note: 'Pharmaceutics & Pharmacokinetics',         ref: 'Appendix-3, ER-2020' },
  { id: 'pharm_chem_d',  label: 'Pharmaceutical Chemistry Lab',       minArea: 900,  areaUnit: 'sq. ft.', note: 'Inorganic, Organic & Pharmaceutical Chem.', ref: 'Appendix-3, ER-2020' },
  { id: 'pharma_lab3',   label: 'Pharmacology & Toxicology Lab',      minArea: 900,  areaUnit: 'sq. ft.', note: 'Including Physiology & Health Education',   ref: 'Appendix-3, ER-2020' },
  { id: 'pharma_lab4',   label: 'Pharmacognosy & Biochemistry Lab',   minArea: 900,  areaUnit: 'sq. ft.', note: 'Biochemistry lab requirements included',    ref: 'Appendix-3, ER-2020' },
  { id: 'machine_room_d',label: 'Machine Room',                        minArea: 400,  areaUnit: 'sq. ft.', note: 'Pharmaceutical machinery',                  ref: 'Appendix-3, ER-2020' },
  { id: 'model_pharmacy',label: 'Model Pharmacy',                      minArea: 80,   areaUnit: 'sq. mt.', note: 'DIC (10 sq. mt.) + Patient Counselling (10 sq. mt.) included', ref: 'Appendix-3, ER-2020' },
];

// ─── Infrastructure — D.Pharm Equipment ──────────────────────────────────────
export interface EquipmentItem {
  id: string;
  label: string;
  minQty: number;
  qtyType: 'numeric' | 'boolean';
  ref: string;
}

export const DPHARM_EQUIPMENT: Record<string, EquipmentItem[]> = {
  pharma_lab: [
    { id: 'balance_sen',      label: 'Analytical Balance (0.1mg sensitivity)',  minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'ph_meter',         label: 'pH Meter (digital)',                      minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'dissolution_app',  label: 'Dissolution Apparatus',                   minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'disintegration',   label: 'Disintegration Apparatus',                minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'friability',       label: 'Friability Apparatus',                    minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'tablet_press',     label: 'Tablet Punching Machine (single punch)',  minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'capsule_fill',     label: 'Capsule Filling Machine',                 minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'autoclave',        label: 'Autoclave',                               minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'hot_air_oven',     label: 'Hot Air Oven',                            minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'tray_dryer',       label: 'Tray Dryer',                              minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
  ],
  pharm_chem_d: [
    { id: 'uv_vis',           label: 'UV-Visible Spectrophotometer',            minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'polarimeter',      label: 'Polarimeter',                             minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'refractometer',    label: 'Refractometer',                           minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'melting_point',    label: 'Melting Point Apparatus',                 minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'fume_hood_chem',   label: 'Fume Hood',                              minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'rotary_evap',      label: 'Rotary Evaporator',                       minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
  ],
  pharma_lab3: [
    { id: 'microscopes_d',    label: 'Microscopes',                             minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'haemocytometer',   label: 'Haemocytometer with Micropipettes',       minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'haemoglobinometer',label: "Sahli's Haemoglobinometer",               minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'sphygmomanometer', label: 'Sphygmomanometers',                       minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'stethoscope',      label: 'Stethoscopes',                            minQty: 10, qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'glucometer',       label: 'Glucometer',                              minQty: 10, qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'stopwatch',        label: 'Stop Watch',                              minQty: 20, qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'computer_lab3',    label: 'Computer with LCD',                       minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'pharm_software',   label: 'Licensed Pharmacological Software',       minQty: 1,  qtyType: 'boolean', ref: 'Appendix-3, ER-2020' },
  ],
  pharma_lab4: [
    { id: 'microscopes_pg',   label: 'Microscopes (with camera)',                minQty: 5,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'colorimeter',      label: 'Colorimeter / Spectrophotometer',         minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'centrifuge',       label: 'Centrifuge',                              minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'water_bath',       label: 'Water Bath',                              minQty: 4,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'magnetic_stirrer', label: 'Magnetic Stirrer with Hot Plate',         minQty: 4,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'tlc_equipment',    label: 'TLC Equipment Set',                       minQty: 2,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
  ],
  machine_room_d: [
    { id: 'fluid_bed',        label: 'Fluid Bed Dryer',                         minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'planetary_mixer',  label: 'Planetary Mixer',                         minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'multi_mill',       label: 'Multi Mill',                              minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'rotary_tablet',    label: 'Rotary Tablet Machine',                   minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
    { id: 'coating_pan',      label: 'Coating Pan',                             minQty: 1,  qtyType: 'numeric', ref: 'Appendix-3, ER-2020' },
  ],
};

// ─── Compliance checklists ────────────────────────────────────────────────────
export const BPHARM_INFRA_CHECKLIST = [
  { id: 'cl_01', text: 'Minimum 2 lecture halls with adequate seating and AV equipment', ref: 'Appendix-A, Cl. 5' },
  { id: 'cl_02', text: '8 laboratories present in mandated composition', ref: 'Appendix-A, Cl. 5' },
  { id: 'cl_03', text: 'Animal house with CPCSEA compliance certificate', ref: 'Appendix-A, Cl. 5' },
  { id: 'cl_04', text: 'All lab fittings (gas, water, shelves, fuming cupboard, aseptic room) present', ref: 'Appendix-A, Cl. 5' },
  { id: 'cl_05', text: 'Each lab area ≥ 900 sq. ft. including preparation room', ref: 'Appendix-A, Cl. 5' },
  { id: 'cl_06', text: 'Library with adequate seating, reference books, and journals', ref: 'Appendix-A, Cl. 5' },
  { id: 'cl_07', text: 'Balance room, machine room, store room, and dispensary present', ref: 'Appendix-A, Cl. 5' },
  { id: 'cl_08', text: 'Principal/HOD room, administrative office, common rooms present', ref: 'Appendix-A, Cl. 5' },
] as const;

export const DPHARM_INFRA_CHECKLIST = [
  { id: 'dcl_01', text: '4 laboratories present in mandated composition', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_02', text: 'Machine room with prescribed pharmaceutical machinery', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_03', text: 'Model pharmacy (min. 80 sq. mt.) with DIC and patient counselling area', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_04', text: 'All lab equipment present as per equipment schedule', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_05', text: 'Library with minimum prescribed pharmacy textbooks and journals', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_06', text: 'Computer facility with internet connectivity', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_07', text: 'Administrative office and staff rooms adequate', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_08', text: 'Drinking water and sanitation facilities adequate', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_09', text: 'First aid kit and fire extinguisher in all labs', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_10', text: 'Waste disposal system compliant with regulatory norms', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_11', text: 'CCTV surveillance in labs and corridors', ref: 'Appendix-3, ER-2020' },
  { id: 'dcl_12', text: 'Emergency exit and evacuation plan displayed', ref: 'Appendix-3, ER-2020' },
] as const;

// ─── Status tokens ────────────────────────────────────────────────────────────
export const COMPLIANCE_STATUS = {
  COMPLIANT:     'compliant',
  NON_COMPLIANT: 'non_compliant',
  PARTIAL:       'partial',
  NOT_ENTERED:   'not_entered',
} as const;

// ─── Seed faculty data (from SIF 2026-27) ────────────────────────────────────
export const SEED_FACULTY = [
  { id: 'f001', name: 'Dr. Mudduluru Niranjan Babu', councilNo: 'BH-P-23-18028',        department: 'pharmacognosy',     designation: 'hoi',        qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: 'Ph.D' },  experienceYears: 27,   employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm', 'mpharm'] },
  { id: 'f002', name: 'Dr. Jyothi Basini',           councilNo: 'BH-P-25-59225',        department: 'pharmacology',       designation: 'professor',  qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: 'Ph.D' },  experienceYears: 31.8, employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
  { id: 'f003', name: 'Dr. Satheesh Kumar G',        councilNo: 'BH-P-24-1847319343',   department: 'pharm_chemistry',    designation: 'assoc_prof', qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: 'Ph.D' },  experienceYears: 16,   employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
  { id: 'f004', name: 'Pavan Kumar V',               councilNo: 'BH-P-24-0918356760',   department: 'pharmaceutics',      designation: 'assoc_prof', qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 11.6, employmentType: 'full-time', spcRegistration: 'valid',   status: 'qual_review', courses: ['bpharm'] },
  { id: 'f005', name: 'DIVYA LAKSHMIPATHI',          councilNo: 'BH-P-24-2112744734',   department: 'pharmaceutics',      designation: 'assoc_prof', qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 10,   employmentType: 'full-time', spcRegistration: 'valid',   status: 'qual_review', courses: ['bpharm'] },
  { id: 'f006', name: 'HARIKRISHNA M',               councilNo: 'BH-P-24-1147133573',   department: 'pharmaceutics',      designation: 'assoc_prof', qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 7,    employmentType: 'full-time', spcRegistration: 'pending', status: 'qual_review', courses: ['bpharm'] },
  { id: 'f007', name: 'PUSHPA KUMARI B',             councilNo: 'BH-P-23-1149047267',   department: 'pharmacology',       designation: 'professor',  qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: 'Ph.D' },  experienceYears: 22,   employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
  { id: 'f008', name: 'G MALLIKARJUNA',              councilNo: 'BH-P-24-1946474082',   department: 'pharmacognosy',      designation: 'assoc_prof', qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 14,   employmentType: 'full-time', spcRegistration: 'valid',   status: 'qual_review', courses: ['bpharm'] },
  { id: 'f009', name: 'A. REKHA DEVI',               councilNo: 'BH-P-24-1046578907',   department: 'pharmacy_practice',  designation: 'asst_prof',  qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 8,    employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
  { id: 'f010', name: 'Saravanakumar Kasimedu',      councilNo: 'BH-P-24-0116874592',   department: 'pharm_chemistry',    designation: 'asst_prof',  qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 6,    employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
  { id: 'f011', name: 'Dr. Saidulu Ediga',           councilNo: 'BH-P-23-0989123412',   department: 'pharmacognosy',      designation: 'professor',  qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: 'Ph.D' },  experienceYears: 18,   employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm', 'mpharm'] },
  { id: 'f012', name: 'T. RAMAIAH',                  councilNo: 'BH-P-24-2241176509',   department: 'pharmaceutics',      designation: 'lecturer',   qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 4,    employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
  { id: 'f013', name: 'V. LAKSHMI',                  councilNo: 'BH-P-24-2341189021',   department: 'pharm_chemistry',    designation: 'lecturer',   qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 3,    employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
  { id: 'f014', name: 'K. BHAVANI',                  councilNo: 'BH-P-24-2098341902',   department: 'pharmacology',       designation: 'lecturer',   qualification: { ug: 'B.Pharm', pg: 'M.Pharm', phd: null },     experienceYears: 5,    employmentType: 'full-time', spcRegistration: 'valid',   status: 'verified',    courses: ['bpharm'] },
] as const;

export const SEED_NON_TEACHING_COUNTS: Record<string, number> = {
  lab_tech: 5, lab_asst: 8, off_sup: 1, accountant: 1, storekeeper: 1,
  computer_op: 1, office_12: 3, peon: 1, cleaning: 4,
};

// ─── Derived compliance helpers ───────────────────────────────────────────────
export function computeFacultyCompliance(
  faculty: typeof SEED_FACULTY[number][],
  ntCounts: Record<string, number>,
  intake: 60 | 100,
  course: string
) {
  const reqs = BPHARM_REQUIREMENTS[intake] || BPHARM_REQUIREMENTS[60];
  const courseFaculty = faculty.filter(f => f.courses.includes(course as any));

  const slotCounts: Record<string, number> = {};
  courseFaculty.forEach(f => {
    const desigKey = f.designation === 'assoc_prof' ? 'professor' : f.designation;
    const key = `${f.department}_${desigKey}`;
    slotCounts[key] = (slotCounts[key] || 0) + 1;
  });

  let totalRequired = 1; // HOI
  const hoi = courseFaculty.find(f => f.designation === 'hoi');
  let totalFilled = hoi ? 1 : 0;
  let totalVacant = hoi ? 0 : 1;
  let qualPending = courseFaculty.filter(f => f.status === 'qual_review').length;

  Object.entries(reqs).forEach(([key, req]) => {
    if (req === 0) return;
    const filled = Math.min(slotCounts[key] || 0, req);
    totalRequired += req;
    totalFilled   += filled;
    totalVacant   += Math.max(0, req - (slotCounts[key] || 0));
  });

  let ntVacant = 0;
  NON_TEACHING_REQUIREMENTS.forEach(({ id, minCount }) => {
    const actual = ntCounts[id] || 0;
    if (actual < minCount) ntVacant += (minCount - actual);
  });

  const pct = totalRequired > 0 ? Math.round((totalFilled / totalRequired) * 100) : 0;
  return { totalRequired, totalFilled, totalVacant, qualPending, ntVacant, pct, slotCounts };
}
