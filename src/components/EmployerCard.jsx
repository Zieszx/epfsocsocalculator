import { formatRM } from '../utils/calculations'

function EmployerCard({ result, salary }) {
  const { epf, socso, eis, totalEmployerContributions } = result

  return (
    <section>
      <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-amber-500 rounded-full"></span>
        Employer Contributions
      </h2>
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800/50 p-4 sm:p-6 transition-colors">
        <div className="flex items-start gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m5-12h4m-4 4h4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            Your company pays this on top of your salary
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div className="bg-white/60 dark:bg-slate-800/40 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">EPF (KWSP)</p>
            <p className="text-lg font-bold text-blue-700 dark:text-blue-400">{formatRM(epf.employer)}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">{epf.employerRate}% of salary</p>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/40 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">SOCSO (PERKESO)</p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{formatRM(socso.employer)}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">{socso.employerRate}% (cap RM6,000)</p>
          </div>
          <div className="bg-white/60 dark:bg-slate-800/40 rounded-lg p-3 backdrop-blur-sm">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">EIS (SIP)</p>
            <p className="text-lg font-bold text-purple-700 dark:text-purple-400">{formatRM(eis.employer)}</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">{eis.employerRate || 0}% (cap RM6,000)</p>
          </div>
        </div>

        <div className="bg-amber-100/50 dark:bg-amber-900/20 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-700 dark:text-slate-200">Total Employer Cost</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Your salary + employer contributions</p>
            </div>
            <div className="text-right">
              <p className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400">
                {formatRM(salary + totalEmployerContributions)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Contributions: {formatRM(totalEmployerContributions)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmployerCard
