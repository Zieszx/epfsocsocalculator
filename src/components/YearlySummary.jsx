import { formatRM } from '../utils/calculations'

function YearlySummary({ result }) {
  const { grossSalary, epf, socso, eis, pcb, zakat, totalEmployeeDeductions, totalEmployerContributions, totalCommitments, netSalary } = result

  const annual = (val) => val * 12

  const rows = [
    { label: 'Gross Salary', employee: formatRM(annual(grossSalary)), employer: '-', type: 'header' },
    { label: 'EPF (KWSP)', employee: formatRM(annual(epf.employee)), employer: formatRM(annual(epf.employer)), type: 'blue' },
    { label: 'SOCSO (PERKESO)', employee: formatRM(annual(socso.employee)), employer: formatRM(annual(socso.employer)), type: 'green' },
    { label: 'EIS (SIP)', employee: formatRM(annual(eis.employee)), employer: formatRM(annual(eis.employer)), type: 'purple' },
    { label: 'PCB / MTD (Tax)', employee: formatRM(annual(pcb.monthly)), employer: '-', type: 'rose' },
    { label: 'Zakat', employee: formatRM(annual(zakat.monthly)), employer: '-', type: 'teal' },
    { label: 'Commitments', employee: formatRM(annual(totalCommitments)), employer: '-', type: 'orange' },
  ]

  return (
    <div className="space-y-5 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Annual Summary (12 Months)
          </h2>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-700">
          <div className="bg-white dark:bg-slate-800 p-4 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Annual Gross</p>
            <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{formatRM(annual(grossSalary))}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Deductions</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{formatRM(annual(totalEmployeeDeductions))}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">EPF Savings</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatRM(annual(epf.employee + epf.employer))}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Annual Net</p>
            <p className={`text-lg font-bold ${netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{formatRM(annual(netSalary))}</p>
          </div>
        </div>

        {/* Breakdown table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50">
                <th className="text-left px-4 py-3 font-medium text-slate-600 dark:text-slate-300">Item</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600 dark:text-slate-300">Employee / Year</th>
                <th className="text-right px-4 py-3 font-medium text-slate-600 dark:text-slate-300">Employer / Year</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-700">
                  <td className="px-4 py-2.5 text-slate-700 dark:text-slate-300">{row.label}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-slate-700 dark:text-slate-300">{row.employee}</td>
                  <td className="px-4 py-2.5 text-right font-medium text-slate-500 dark:text-slate-400">{row.employer}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/30">
                <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">Annual Net Take Home</td>
                <td className={`px-4 py-3 text-right text-lg font-bold ${netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{formatRM(annual(netSalary))}</td>
                <td className="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">{formatRM(annual(totalEmployerContributions))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Monthly vs Annual comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 transition-colors">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">Monthly Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Gross</span><span className="font-medium text-slate-700 dark:text-slate-200">{formatRM(grossSalary)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Deductions</span><span className="font-medium text-red-600 dark:text-red-400">-{formatRM(totalEmployeeDeductions)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Commitments</span><span className="font-medium text-orange-600 dark:text-orange-400">-{formatRM(totalCommitments)}</span></div>
            <hr className="border-slate-200 dark:border-slate-600"/>
            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-200">Net</span><span className={`font-bold ${netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{formatRM(netSalary)}</span></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl shadow-sm border border-blue-200 dark:border-blue-800/50 p-4 transition-colors">
          <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3">Your EPF Savings Growth</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Your EPF/month</span><span className="font-medium text-blue-700 dark:text-blue-400">{formatRM(epf.employee)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Employer EPF/month</span><span className="font-medium text-blue-700 dark:text-blue-400">{formatRM(epf.employer)}</span></div>
            <hr className="border-blue-200 dark:border-blue-700"/>
            <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Total EPF/month</span><span className="font-bold text-blue-700 dark:text-blue-400">{formatRM(epf.employee + epf.employer)}</span></div>
            <div className="flex justify-between"><span className="font-semibold text-slate-700 dark:text-slate-200">Total EPF/year</span><span className="font-bold text-blue-800 dark:text-blue-300">{formatRM(annual(epf.employee + epf.employer))}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YearlySummary
