import { formatRM } from '../utils/calculations'

function NetSalaryCard({ result }) {
  const { grossSalary, totalEmployeeDeductions, totalCommitments, netSalary } = result
  const deductionPercent = grossSalary > 0 ? ((totalEmployeeDeductions + totalCommitments) / grossSalary * 100).toFixed(1) : 0

  return (
    <section>
      <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-green-500 rounded-full"></span>
        Net Salary Summary
      </h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-colors">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">Gross Salary</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{formatRM(grossSalary)}</span>
          </div>
          <div className="flex justify-between items-center text-red-600 dark:text-red-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500"></span>
              EPF + SOCSO + EIS
            </span>
            <span className="font-semibold">- {formatRM(totalEmployeeDeductions)}</span>
          </div>
          {totalCommitments > 0 && (
            <div className="flex justify-between items-center text-orange-600 dark:text-orange-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400 dark:bg-orange-500"></span>
                Total Commitments
              </span>
              <span className="font-semibold">- {formatRM(totalCommitments)}</span>
            </div>
          )}

          {/* Visual bar */}
          {grossSalary > 0 && (
            <div className="pt-1">
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${netSalary >= 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`}
                  style={{ width: `${Math.max(0, Math.min(100, (netSalary / grossSalary) * 100))}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 text-right">
                {deductionPercent}% deducted from gross
              </p>
            </div>
          )}

          <hr className="border-slate-200 dark:border-slate-600" />
          <div className="flex justify-between items-center pt-1">
            <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200">Take Home Pay</span>
            <span className={`text-2xl sm:text-3xl font-bold ${netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatRM(netSalary)}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NetSalaryCard
