import { formatRM } from '../utils/calculations';

function NetSalaryCard({ result, showBonus = false, baseResult, bonusResult, bonuses }) {
  const { grossSalary, totalEmployeeDeductions, totalCommitments, netSalary } = result;
  const deductionPercent = grossSalary > 0 ? (((totalEmployeeDeductions + totalCommitments) / grossSalary) * 100).toFixed(1) : 0;

  // Calculate breakdown
  const baseDeductions = baseResult ? baseResult.totalEmployeeDeductions : 0;
  const bonusDeductions = bonusResult && baseResult ? bonusResult.totalEmployeeDeductions - baseResult.totalEmployeeDeductions : 0;

  return (
    <section>
      <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-green-500 rounded-full"></span>
        Net Salary Summary
      </h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-colors">
        <div className="space-y-3">
          {showBonus && baseResult && bonusResult && bonuses && bonuses.length > 0 && (
            <>
              {/* Quick Summary Cards at Top */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Base Salary Card */}
                <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Base Salary</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{formatRM(baseResult.grossSalary)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Net: {formatRM(baseResult.netSalary)}</p>
                </div>

                {/* Bonus Card */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800/50">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Bonus/OT</p>
                  <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">{formatRM(bonusResult.grossSalary - baseResult.grossSalary)}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Net: {formatRM(bonusResult.netSalary - baseResult.netSalary)}</p>
                </div>
              </div>
            </>
          )}

          {/* Gross Salary */}
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">{showBonus ? 'Total Gross (with Bonus)' : 'Gross Salary'}</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{formatRM(grossSalary)}</span>
          </div>

          {/* Deductions */}
          {showBonus && baseResult && bonusResult ? (
            <>
              {/* Base Salary Deductions */}
              <div className="flex justify-between items-center text-red-600 dark:text-red-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500"></span>
                  EPF + SOCSO + EIS (Base)
                </span>
                <span className="font-semibold">- {formatRM(baseDeductions)}</span>
              </div>

              {/* Bonus Deductions */}
              {bonusDeductions > 0 && (
                <div className="flex justify-between items-center text-red-500 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 -mx-2 px-2 py-1 rounded">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500"></span>
                    Deductions from Bonus/OT
                  </span>
                  <span className="font-semibold">- {formatRM(bonusDeductions)}</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-between items-center text-red-600 dark:text-red-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400 dark:bg-red-500"></span>
                EPF + SOCSO + EIS
              </span>
              <span className="font-semibold">- {formatRM(totalEmployeeDeductions)}</span>
            </div>
          )}

          {/* Total Commitments - Always show if exists */}
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
                <div className={`h-full rounded-full transition-all duration-500 ${netSalary >= 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`} style={{ width: `${Math.max(0, Math.min(100, (netSalary / grossSalary) * 100))}%` }}></div>
              </div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 text-right">{deductionPercent}% deducted from gross</p>
            </div>
          )}

          <hr className="border-slate-200 dark:border-slate-600" />

          {/* Take Home Pay */}
          <div className="flex justify-between items-center pt-1">
            <span className="text-base sm:text-lg font-bold text-slate-700 dark:text-slate-200">Take Home Pay</span>
            <span className={`text-2xl sm:text-3xl font-bold ${netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{formatRM(netSalary)}</span>
          </div>

          {/* Bonus Breakdown Detail ( collapsible section at bottom ) */}
          {showBonus && baseResult && bonusResult && bonuses && bonuses.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                  <span>View Bonus Breakdown</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <div className="mt-3 space-y-2">
                  {bonuses.map((bonus) => (
                    <div key={bonus.id} className="flex items-center justify-between text-sm bg-yellow-50 dark:bg-yellow-950/20 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 dark:bg-yellow-500"></span>
                        <span className="text-slate-700 dark:text-slate-300">{bonus.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-600 dark:text-slate-400">Gross: {formatRM(bonus.amount)}</span>
                        <span className="text-red-500 dark:text-red-400 text-sm">-{formatRM(bonus.amount * (baseResult.totalEmployeeDeductions / baseResult.grossSalary))}</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">{formatRM(bonus.amount - bonus.amount * (baseResult.totalEmployeeDeductions / baseResult.grossSalary))}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default NetSalaryCard;
