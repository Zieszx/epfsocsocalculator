import { useState } from 'react'

// ─── EPF Rate Table ─────────────────────────────────────────

const EPF_RATES = {
  under60: {
    label: 'Under 60 years old',
    rows: [
      { range: 'RM 1 - RM 5,000', employeeRate: '11%', employerRate: '13%' },
      { range: 'RM 5,001 and above', employeeRate: '11%', employerRate: '12%' },
    ],
  },
  above60: {
    label: '60 years old and above',
    rows: [
      { range: 'RM 1 - RM 5,000', employeeRate: '5.5%', employerRate: '6.5%' },
      { range: 'RM 5,001 and above', employeeRate: '5.5%', employerRate: '6%' },
    ],
  },
}

// ─── SOCSO Contribution Table ───────────────────────────────

const SOCSO_ROWS = [
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
]

// ─── EIS Contribution Table ─────────────────────────────────

const EIS_ROWS = [
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
]

// ─── PCB Tax Brackets ───────────────────────────────────────

const PCB_BRACKETS = [
  { range: '0 - 5,000', rate: '0%', cumTax: '0' },
  { range: '5,001 - 20,000', rate: '1%', cumTax: '150' },
  { range: '20,001 - 35,000', rate: '3%', cumTax: '600' },
  { range: '35,001 - 50,000', rate: '6%', cumTax: '1,500' },
  { range: '50,001 - 70,000', rate: '11%', cumTax: '3,700' },
  { range: '70,001 - 100,000', rate: '19%', cumTax: '9,400' },
  { range: '100,001 - 400,000', rate: '25%', cumTax: '84,400' },
  { range: '400,001 - 600,000', rate: '26%', cumTax: '136,400' },
  { range: '600,001 - 2,000,000', rate: '28%', cumTax: '528,400' },
  { range: 'Above 2,000,000', rate: '30%', cumTax: '-' },
]

function formatWageRange(index, rows) {
  const prev = index === 0 ? 0 : rows[index - 1].max
  const curr = rows[index].max
  return `RM ${prev.toLocaleString()} - RM ${curr.toLocaleString()}`
}

function RateTable({ salary }) {
  const [activeSection, setActiveSection] = useState('socso')

  const sections = [
    { id: 'epf', label: 'EPF', color: 'blue' },
    { id: 'socso', label: 'SOCSO', color: 'emerald' },
    { id: 'eis', label: 'EIS', color: 'purple' },
    { id: 'pcb', label: 'PCB Tax', color: 'rose' },
  ]

  // Find which row the salary falls into
  const salaryNum = parseFloat(salary) || 0
  const highlightSocso = SOCSO_ROWS.findIndex(r => salaryNum <= r.max)
  const highlightEis = EIS_ROWS.findIndex(r => salaryNum <= r.max)

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Section Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-1 transition-colors">
        <div className="grid grid-cols-4 gap-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeSection === s.id
                  ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── EPF Section ── */}
      {activeSection === 'epf' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
              EPF (KWSP) Contribution Rates
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Percentage-based calculation. No wage ceiling.</p>
          </div>

          {Object.entries(EPF_RATES).map(([key, group]) => (
            <div key={key} className="border-b border-slate-100 dark:border-slate-700 last:border-b-0">
              <div className="px-4 sm:px-6 py-3 bg-blue-50/50 dark:bg-blue-950/20">
                <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400">{group.label}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700/30">
                      <th className="text-left px-4 sm:px-6 py-2.5 font-medium text-slate-600 dark:text-slate-300">Salary Range</th>
                      <th className="text-center px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300">Employee</th>
                      <th className="text-center px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300">Employer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row, i) => (
                      <tr key={i} className="border-t border-slate-100 dark:border-slate-700">
                        <td className="px-4 sm:px-6 py-2.5 text-slate-700 dark:text-slate-300">{row.range}</td>
                        <td className="px-4 py-2.5 text-center font-semibold text-blue-700 dark:text-blue-400">{row.employeeRate}</td>
                        <td className="px-4 py-2.5 text-center font-semibold text-amber-700 dark:text-amber-400">{row.employerRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-700/20 text-[11px] text-slate-500 dark:text-slate-400">
            Source: KWSP (kwsp.gov.my) | No wage ceiling for EPF contributions
          </div>
        </div>
      )}

      {/* ── SOCSO Section ── */}
      {activeSection === 'socso' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
              SOCSO (PERKESO) Contribution Table
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Category 1 (under 60) - Employment Injury + Invalidity Scheme. Wage ceiling: RM6,000.
            </p>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-50 dark:bg-slate-700">
                  <th className="text-left px-4 sm:px-6 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">#</th>
                  <th className="text-left px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Wage Range (RM)</th>
                  <th className="text-right px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Employer (RM)</th>
                  <th className="text-right px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Employee (RM)</th>
                  <th className="text-right px-4 sm:px-6 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Total (RM)</th>
                </tr>
              </thead>
              <tbody>
                {SOCSO_ROWS.map((row, i) => {
                  const isHighlighted = i === highlightSocso && salaryNum > 0
                  return (
                    <tr
                      key={i}
                      className={`border-t border-slate-100 dark:border-slate-700 ${
                        isHighlighted
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-inset ring-emerald-300 dark:ring-emerald-700'
                          : i % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-750'
                      }`}
                    >
                      <td className="px-4 sm:px-6 py-2 text-slate-400 dark:text-slate-500 text-xs">{i + 1}</td>
                      <td className={`px-4 py-2 ${isHighlighted ? 'font-semibold text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {formatWageRange(i, SOCSO_ROWS)}
                        {isHighlighted && <span className="ml-2 text-[10px] bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded-full font-semibold">YOUR SALARY</span>}
                      </td>
                      <td className={`px-4 py-2 text-right font-medium ${isHighlighted ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-amber-600 dark:text-amber-400'}`}>{row.employer.toFixed(2)}</td>
                      <td className={`px-4 py-2 text-right font-medium ${isHighlighted ? 'text-blue-700 dark:text-blue-400 font-bold' : 'text-blue-600 dark:text-blue-400'}`}>{row.employee.toFixed(2)}</td>
                      <td className={`px-4 sm:px-6 py-2 text-right font-medium ${isHighlighted ? 'text-slate-800 dark:text-slate-100 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>{(row.employer + row.employee).toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-700/20 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
            <p>Source: PERKESO (perkeso.gov.my) | Official wage bracket table</p>
            <p>Category 2 (60+): Employer only (~1.25%), Employee: RM0.00</p>
            <p>Salaries above RM6,000 use the maximum ceiling amounts (Employer: RM104.15, Employee: RM29.75)</p>
          </div>
        </div>
      )}

      {/* ── EIS Section ── */}
      {activeSection === 'eis' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-purple-500 rounded-full"></span>
              EIS (SIP) Contribution Table
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Employment Insurance System. Rate: 0.2% each. Wage ceiling: RM6,000. Applies to age 18-59 only.
            </p>
          </div>

          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-slate-50 dark:bg-slate-700">
                  <th className="text-left px-4 sm:px-6 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">#</th>
                  <th className="text-left px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Wage Range (RM)</th>
                  <th className="text-right px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Employer (RM)</th>
                  <th className="text-right px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Employee (RM)</th>
                  <th className="text-right px-4 sm:px-6 py-2.5 font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700">Total (RM)</th>
                </tr>
              </thead>
              <tbody>
                {EIS_ROWS.map((row, i) => {
                  const isHighlighted = i === highlightEis && salaryNum > 0
                  return (
                    <tr
                      key={i}
                      className={`border-t border-slate-100 dark:border-slate-700 ${
                        isHighlighted
                          ? 'bg-purple-50 dark:bg-purple-950/30 ring-1 ring-inset ring-purple-300 dark:ring-purple-700'
                          : i % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-750'
                      }`}
                    >
                      <td className="px-4 sm:px-6 py-2 text-slate-400 dark:text-slate-500 text-xs">{i + 1}</td>
                      <td className={`px-4 py-2 ${isHighlighted ? 'font-semibold text-purple-700 dark:text-purple-400' : 'text-slate-700 dark:text-slate-300'}`}>
                        {formatWageRange(i, EIS_ROWS)}
                        {isHighlighted && <span className="ml-2 text-[10px] bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 px-1.5 py-0.5 rounded-full font-semibold">YOUR SALARY</span>}
                      </td>
                      <td className={`px-4 py-2 text-right font-medium ${isHighlighted ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-amber-600 dark:text-amber-400'}`}>{row.employer.toFixed(2)}</td>
                      <td className={`px-4 py-2 text-right font-medium ${isHighlighted ? 'text-purple-700 dark:text-purple-400 font-bold' : 'text-purple-600 dark:text-purple-400'}`}>{row.employee.toFixed(2)}</td>
                      <td className={`px-4 sm:px-6 py-2 text-right font-medium ${isHighlighted ? 'text-slate-800 dark:text-slate-100 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>{(row.employer + row.employee).toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-700/20 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
            <p>Source: PERKESO (perkeso.gov.my) | EIS / SIP contribution schedule</p>
            <p>Employees aged 60+ are exempt from EIS contributions</p>
            <p>Salaries above RM6,000 use the maximum ceiling amounts (RM11.90 each)</p>
          </div>
        </div>
      )}

      {/* ── PCB Tax Brackets Section ── */}
      {activeSection === 'pcb' && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
          <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <span className="w-1 h-5 bg-rose-500 rounded-full"></span>
              PCB / MTD Income Tax Brackets (2024/2025)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Progressive tax rates for Malaysian tax residents. Applied to annual chargeable income after reliefs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/30">
                  <th className="text-left px-4 sm:px-6 py-2.5 font-medium text-slate-600 dark:text-slate-300">Chargeable Income (RM)</th>
                  <th className="text-center px-4 py-2.5 font-medium text-slate-600 dark:text-slate-300">Tax Rate</th>
                  <th className="text-right px-4 sm:px-6 py-2.5 font-medium text-slate-600 dark:text-slate-300">Cumulative Tax (RM)</th>
                </tr>
              </thead>
              <tbody>
                {PCB_BRACKETS.map((row, i) => (
                  <tr key={i} className={`border-t border-slate-100 dark:border-slate-700 ${i % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-slate-50/50 dark:bg-slate-750'}`}>
                    <td className="px-4 sm:px-6 py-2.5 text-slate-700 dark:text-slate-300">{row.range}</td>
                    <td className="px-4 py-2.5 text-center font-semibold text-rose-600 dark:text-rose-400">{row.rate}</td>
                    <td className="px-4 sm:px-6 py-2.5 text-right font-medium text-slate-600 dark:text-slate-300">{row.cumTax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Reliefs Summary */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-4 sm:p-6">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Common Tax Reliefs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {[
                { label: 'Personal relief', amount: 'RM 9,000' },
                { label: 'Spouse relief (no/low income)', amount: 'RM 4,000' },
                { label: 'Child (under 18)', amount: 'RM 2,000 each' },
                { label: 'Child (higher education)', amount: 'RM 8,000 each' },
                { label: 'EPF contributions', amount: 'Up to RM 4,000' },
                { label: 'SOCSO + EIS contributions', amount: 'RM 350' },
                { label: 'Medical expenses', amount: 'Up to RM 10,000' },
                { label: 'Education fees (self)', amount: 'Up to RM 7,000' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-slate-700/30 rounded-lg px-3 py-2">
                  <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{item.amount}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3">
              Rebate: RM400 if chargeable income ≤ RM35,000 | Zakat payments are dollar-for-dollar rebate
            </p>
          </div>

          <div className="px-4 sm:px-6 py-3 bg-slate-50 dark:bg-slate-700/20 text-[11px] text-slate-500 dark:text-slate-400">
            Source: LHDN (hasil.gov.my) | Assessment Year 2024/2025
          </div>
        </div>
      )}
    </div>
  )
}

export default RateTable
