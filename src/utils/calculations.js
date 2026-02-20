/**
 * Malaysian EPF, SOCSO, EIS, PCB, Zakat Calculator
 * Based on rates effective 2024/2025
 *
 * References:
 * - EPF: https://www.kwsp.gov.my
 * - SOCSO: https://www.perkeso.gov.my
 * - EIS/SIP: https://www.perkeso.gov.my/sip
 * - PCB/MTD: https://www.hasil.gov.my
 * - PayrollPanda: https://www.payrollpanda.my
 */

// ─── EPF (KWSP) ────────────────────────────────────────────

export function calculateEPF(monthlySalary, age = 30) {
  if (monthlySalary <= 0) return { employee: 0, employer: 0, employeeRate: 0, employerRate: 0 };

  let employeeRate, employerRate;

  if (age < 60) {
    employeeRate = 0.11;
    employerRate = monthlySalary <= 5000 ? 0.13 : 0.12;
  } else {
    employeeRate = 0.055;
    employerRate = monthlySalary <= 5000 ? 0.065 : 0.06;
  }

  return {
    employee: Math.round(monthlySalary * employeeRate * 100) / 100,
    employer: Math.round(monthlySalary * employerRate * 100) / 100,
    employeeRate: employeeRate * 100,
    employerRate: employerRate * 100,
  };
}

// ─── SOCSO (PERKESO) ───────────────────────────────────────
// Uses official wage bracket table (Social Security Act 1969)
// Ceiling: RM6,000 (effective Oct 1, 2024)

const SOCSO_TABLE = [
  { max: 30, employer: 0.40, employee: 0.10 },
  { max: 50, employer: 0.70, employee: 0.20 },
  { max: 70, employer: 1.10, employee: 0.30 },
  { max: 100, employer: 1.50, employee: 0.40 },
  { max: 140, employer: 2.10, employee: 0.60 },
  { max: 200, employer: 2.95, employee: 0.85 },
  { max: 300, employer: 4.35, employee: 1.25 },
  { max: 400, employer: 6.15, employee: 1.75 },
  { max: 500, employer: 7.85, employee: 2.25 },
  { max: 600, employer: 9.65, employee: 2.75 },
  { max: 700, employer: 11.35, employee: 3.25 },
  { max: 800, employer: 13.15, employee: 3.75 },
  { max: 900, employer: 14.85, employee: 4.25 },
  { max: 1000, employer: 16.65, employee: 4.75 },
  { max: 1100, employer: 18.35, employee: 5.25 },
  { max: 1200, employer: 20.15, employee: 5.75 },
  { max: 1300, employer: 21.85, employee: 6.25 },
  { max: 1400, employer: 23.65, employee: 6.75 },
  { max: 1500, employer: 25.35, employee: 7.25 },
  { max: 1600, employer: 27.15, employee: 7.75 },
  { max: 1700, employer: 28.85, employee: 8.25 },
  { max: 1800, employer: 30.65, employee: 8.75 },
  { max: 1900, employer: 32.35, employee: 9.25 },
  { max: 2000, employer: 34.15, employee: 9.75 },
  { max: 2100, employer: 35.85, employee: 10.25 },
  { max: 2200, employer: 37.65, employee: 10.75 },
  { max: 2300, employer: 39.35, employee: 11.25 },
  { max: 2400, employer: 41.15, employee: 11.75 },
  { max: 2500, employer: 42.85, employee: 12.25 },
  { max: 2600, employer: 44.65, employee: 12.75 },
  { max: 2700, employer: 46.35, employee: 13.25 },
  { max: 2800, employer: 48.15, employee: 13.75 },
  { max: 2900, employer: 49.85, employee: 14.25 },
  { max: 3000, employer: 51.65, employee: 14.75 },
  { max: 3100, employer: 53.35, employee: 15.25 },
  { max: 3200, employer: 55.15, employee: 15.75 },
  { max: 3300, employer: 56.85, employee: 16.25 },
  { max: 3400, employer: 58.65, employee: 16.75 },
  { max: 3500, employer: 60.35, employee: 17.25 },
  { max: 3600, employer: 62.15, employee: 17.75 },
  { max: 3700, employer: 63.85, employee: 18.25 },
  { max: 3800, employer: 65.65, employee: 18.75 },
  { max: 3900, employer: 67.35, employee: 19.25 },
  { max: 4000, employer: 69.15, employee: 19.75 },
  { max: 4100, employer: 70.85, employee: 20.25 },
  { max: 4200, employer: 72.65, employee: 20.75 },
  { max: 4300, employer: 74.35, employee: 21.25 },
  { max: 4400, employer: 76.15, employee: 21.75 },
  { max: 4500, employer: 77.85, employee: 22.25 },
  { max: 4600, employer: 79.65, employee: 22.75 },
  { max: 4700, employer: 81.35, employee: 23.25 },
  { max: 4800, employer: 83.15, employee: 23.75 },
  { max: 4900, employer: 84.85, employee: 24.25 },
  { max: 5000, employer: 86.65, employee: 24.75 },
  { max: 5100, employer: 88.35, employee: 25.25 },
  { max: 5200, employer: 90.15, employee: 25.75 },
  { max: 5300, employer: 91.85, employee: 26.25 },
  { max: 5400, employer: 93.65, employee: 26.75 },
  { max: 5500, employer: 95.35, employee: 27.25 },
  { max: 5600, employer: 97.15, employee: 27.75 },
  { max: 5700, employer: 98.85, employee: 28.25 },
  { max: 5800, employer: 100.65, employee: 28.75 },
  { max: 5900, employer: 102.35, employee: 29.25 },
  { max: 6000, employer: 104.15, employee: 29.75 },
];

const SOCSO_CEILING = 6000;

// Category 2 rates (employer only, for 60+)
const SOCSO_CAT2_TABLE = SOCSO_TABLE.map(row => ({
  max: row.max,
  employer: Math.round((row.employer / 1.75) * 1.25 * 100) / 100,
  employee: 0,
}));

export function calculateSOCSO(monthlySalary, age = 30) {
  if (monthlySalary <= 0) return { employee: 0, employer: 0, employeeRate: 0.5, employerRate: 1.75, category: 1, ceiling: SOCSO_CEILING };

  const table = age < 60 ? SOCSO_TABLE : SOCSO_CAT2_TABLE;
  const category = age < 60 ? 1 : 2;

  // Find the bracket
  let bracket;
  if (monthlySalary > SOCSO_CEILING) {
    bracket = table[table.length - 1]; // Use max ceiling amounts
  } else {
    bracket = table.find(row => monthlySalary <= row.max);
    if (!bracket) bracket = table[table.length - 1];
  }

  return {
    employee: bracket.employee,
    employer: bracket.employer,
    employeeRate: category === 1 ? 0.5 : 0,
    employerRate: category === 1 ? 1.75 : 1.25,
    category,
    ceiling: SOCSO_CEILING,
  };
}

// ─── EIS (SIP) ─────────────────────────────────────────────
// Uses wage bracket table similar to SOCSO
// Ceiling: RM6,000 (effective Oct 1, 2024)
// Rate: 0.2% each for employer and employee

const EIS_TABLE = [
  { max: 30, employer: 0.05, employee: 0.05 },
  { max: 50, employer: 0.10, employee: 0.10 },
  { max: 70, employer: 0.10, employee: 0.10 },
  { max: 100, employer: 0.20, employee: 0.20 },
  { max: 140, employer: 0.20, employee: 0.20 },
  { max: 200, employer: 0.30, employee: 0.30 },
  { max: 300, employer: 0.50, employee: 0.50 },
  { max: 400, employer: 0.70, employee: 0.70 },
  { max: 500, employer: 0.90, employee: 0.90 },
  { max: 600, employer: 1.10, employee: 1.10 },
  { max: 700, employer: 1.30, employee: 1.30 },
  { max: 800, employer: 1.50, employee: 1.50 },
  { max: 900, employer: 1.70, employee: 1.70 },
  { max: 1000, employer: 1.90, employee: 1.90 },
  { max: 1100, employer: 2.10, employee: 2.10 },
  { max: 1200, employer: 2.30, employee: 2.30 },
  { max: 1300, employer: 2.50, employee: 2.50 },
  { max: 1400, employer: 2.70, employee: 2.70 },
  { max: 1500, employer: 2.90, employee: 2.90 },
  { max: 1600, employer: 3.10, employee: 3.10 },
  { max: 1700, employer: 3.30, employee: 3.30 },
  { max: 1800, employer: 3.50, employee: 3.50 },
  { max: 1900, employer: 3.70, employee: 3.70 },
  { max: 2000, employer: 3.90, employee: 3.90 },
  { max: 2100, employer: 4.10, employee: 4.10 },
  { max: 2200, employer: 4.30, employee: 4.30 },
  { max: 2300, employer: 4.50, employee: 4.50 },
  { max: 2400, employer: 4.70, employee: 4.70 },
  { max: 2500, employer: 4.90, employee: 4.90 },
  { max: 2600, employer: 5.10, employee: 5.10 },
  { max: 2700, employer: 5.30, employee: 5.30 },
  { max: 2800, employer: 5.50, employee: 5.50 },
  { max: 2900, employer: 5.70, employee: 5.70 },
  { max: 3000, employer: 5.90, employee: 5.90 },
  { max: 3100, employer: 6.10, employee: 6.10 },
  { max: 3200, employer: 6.30, employee: 6.30 },
  { max: 3300, employer: 6.50, employee: 6.50 },
  { max: 3400, employer: 6.70, employee: 6.70 },
  { max: 3500, employer: 6.90, employee: 6.90 },
  { max: 3600, employer: 7.10, employee: 7.10 },
  { max: 3700, employer: 7.30, employee: 7.30 },
  { max: 3800, employer: 7.50, employee: 7.50 },
  { max: 3900, employer: 7.70, employee: 7.70 },
  { max: 4000, employer: 7.90, employee: 7.90 },
  { max: 4100, employer: 8.10, employee: 8.10 },
  { max: 4200, employer: 8.30, employee: 8.30 },
  { max: 4300, employer: 8.50, employee: 8.50 },
  { max: 4400, employer: 8.70, employee: 8.70 },
  { max: 4500, employer: 8.90, employee: 8.90 },
  { max: 4600, employer: 9.10, employee: 9.10 },
  { max: 4700, employer: 9.30, employee: 9.30 },
  { max: 4800, employer: 9.50, employee: 9.50 },
  { max: 4900, employer: 9.70, employee: 9.70 },
  { max: 5000, employer: 9.90, employee: 9.90 },
  { max: 5100, employer: 10.10, employee: 10.10 },
  { max: 5200, employer: 10.30, employee: 10.30 },
  { max: 5300, employer: 10.50, employee: 10.50 },
  { max: 5400, employer: 10.70, employee: 10.70 },
  { max: 5500, employer: 10.90, employee: 10.90 },
  { max: 5600, employer: 11.10, employee: 11.10 },
  { max: 5700, employer: 11.30, employee: 11.30 },
  { max: 5800, employer: 11.50, employee: 11.50 },
  { max: 5900, employer: 11.70, employee: 11.70 },
  { max: 6000, employer: 11.90, employee: 11.90 },
];

const EIS_CEILING = 6000;

export function calculateEIS(monthlySalary, age = 30) {
  if (monthlySalary <= 0 || age >= 60) return { employee: 0, employer: 0, employeeRate: 0, employerRate: 0, ceiling: EIS_CEILING };

  let bracket;
  if (monthlySalary > EIS_CEILING) {
    bracket = EIS_TABLE[EIS_TABLE.length - 1];
  } else {
    bracket = EIS_TABLE.find(row => monthlySalary <= row.max);
    if (!bracket) bracket = EIS_TABLE[EIS_TABLE.length - 1];
  }

  return {
    employee: bracket.employee,
    employer: bracket.employer,
    employeeRate: 0.2,
    employerRate: 0.2,
    ceiling: EIS_CEILING,
  };
}

// ─── PCB / MTD (Monthly Tax Deduction) ─────────────────────

const TAX_BRACKETS = [
  { min: 0, max: 5000, rate: 0, cumTax: 0 },
  { min: 5001, max: 20000, rate: 0.01, cumTax: 0 },
  { min: 20001, max: 35000, rate: 0.03, cumTax: 150 },
  { min: 35001, max: 50000, rate: 0.06, cumTax: 600 },
  { min: 50001, max: 70000, rate: 0.11, cumTax: 1500 },
  { min: 70001, max: 100000, rate: 0.19, cumTax: 3700 },
  { min: 100001, max: 400000, rate: 0.25, cumTax: 9400 },
  { min: 400001, max: 600000, rate: 0.26, cumTax: 84400 },
  { min: 600001, max: 2000000, rate: 0.28, cumTax: 136400 },
  { min: 2000001, max: Infinity, rate: 0.30, cumTax: 528400 },
];

function calculateAnnualTax(chargeableIncome) {
  if (chargeableIncome <= 0) return 0;

  for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
    const bracket = TAX_BRACKETS[i];
    if (chargeableIncome >= bracket.min) {
      return bracket.cumTax + (chargeableIncome - bracket.min + 1) * bracket.rate;
    }
  }
  return 0;
}

export function calculatePCB(monthlySalary, { maritalStatus = 'single', children = 0, age = 30 } = {}) {
  if (monthlySalary <= 0) return { monthly: 0, annual: 0, chargeableIncome: 0, reliefs: 0 };

  const annualGross = monthlySalary * 12;

  const epf = calculateEPF(monthlySalary, age);
  const annualEPF = epf.employee * 12;
  const epfRelief = Math.min(annualEPF, 4000);

  const personalRelief = 9000;
  const spouseRelief = maritalStatus === 'married' ? 4000 : 0;
  const childRelief = children * 2000;
  const socsoEisRelief = 350;

  const totalReliefs = personalRelief + spouseRelief + childRelief + socsoEisRelief + epfRelief;
  const chargeableIncome = Math.max(0, annualGross - totalReliefs);

  let annualTax = calculateAnnualTax(chargeableIncome);

  if (chargeableIncome <= 35000) {
    annualTax = Math.max(0, annualTax - 400);
  }

  let monthlyPCB = annualTax / 12;
  if (monthlyPCB < 10) monthlyPCB = 0;

  return {
    monthly: Math.round(monthlyPCB * 100) / 100,
    annual: Math.round(annualTax * 100) / 100,
    chargeableIncome: Math.round(chargeableIncome * 100) / 100,
    reliefs: totalReliefs,
  };
}

// ─── Zakat ─────────────────────────────────────────────────

export function calculateZakat(monthlySalary, { epfEmployee = 0, enabled = false } = {}) {
  if (!enabled || monthlySalary <= 0) return { monthly: 0, annual: 0, rate: 2.5 };

  const monthlyNet = monthlySalary - epfEmployee;
  const monthlyZakat = Math.round(monthlyNet * 0.025 * 100) / 100;

  return {
    monthly: monthlyZakat,
    annual: Math.round(monthlyZakat * 12 * 100) / 100,
    rate: 2.5,
  };
}

// ─── Bonus / OT ────────────────────────────────────────────

export function calculateBonusDeductions(bonusAmount, age = 30) {
  if (bonusAmount <= 0) return { epf: 0, socso: 0, eis: 0, total: 0, net: bonusAmount, gross: 0, epfEmployer: 0, socsoEmployer: 0, eisEmployer: 0 };

  const epf = calculateEPF(bonusAmount, age);
  const socso = calculateSOCSO(bonusAmount, age);
  const eis = calculateEIS(bonusAmount, age);

  const totalDeductions = epf.employee + socso.employee + eis.employee;

  return {
    gross: bonusAmount,
    epf: epf.employee,
    socso: socso.employee,
    eis: eis.employee,
    epfEmployer: epf.employer,
    socsoEmployer: socso.employer,
    eisEmployer: eis.employer,
    total: totalDeductions,
    net: bonusAmount - totalDeductions,
  };
}

// ─── Full Summary ──────────────────────────────────────────

export function calculateAll(monthlySalary, age = 30, commitments = [], options = {}) {
  const { maritalStatus = 'single', children = 0, zakatEnabled = false, pcbEnabled = true } = options;

  const epf = calculateEPF(monthlySalary, age);
  const socso = calculateSOCSO(monthlySalary, age);
  const eis = calculateEIS(monthlySalary, age);
  const pcbRaw = calculatePCB(monthlySalary, { maritalStatus, children, age });
  const pcb = pcbEnabled ? pcbRaw : { ...pcbRaw, monthly: 0 };
  const zakat = calculateZakat(monthlySalary, { epfEmployee: epf.employee, enabled: zakatEnabled });

  const totalEmployeeDeductions = epf.employee + socso.employee + eis.employee + pcb.monthly + zakat.monthly;
  const totalEmployerContributions = epf.employer + socso.employer + eis.employer;
  const totalCommitments = commitments.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
  const netSalary = monthlySalary - totalEmployeeDeductions - totalCommitments;

  return {
    grossSalary: monthlySalary,
    epf,
    socso,
    eis,
    pcb,
    zakat,
    totalEmployeeDeductions,
    totalEmployerContributions,
    totalCommitments,
    netSalary,
  };
}

export function formatRM(amount) {
  return `RM ${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
