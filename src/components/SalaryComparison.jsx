import { useState } from 'react'
import { calculateAll, formatRM } from '../utils/calculations'

function CompareColumn({ label, salary, age, commitments, options, color }) {
  const salaryNum = parseFloat(salary) || 0
  const result = calculateAll(salaryNum, age, commitments, options)

  const colorClasses = color === 'blue'
    ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20'
    : 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'

  const headerColor = color === 'blue' ? 'bg-blue-600 dark:bg-blue-700' : 'bg-emerald-600 dark:bg-emerald-700'

  if (salaryNum <= 0) {
    return (
      <div className={`rounded-xl border ${colorClasses} p-4`}>
        <div className={`${headerColor} text-white text-sm font-semibold px-3 py-2 rounded-lg mb-4 text-center`}>{label}</div>
        <p className="text-center text-slate-400 dark:text-slate-500 text-sm py-8">Enter a salary to compare</p>
      </div>
    )
  }

  return (
    <div className={`rounded-xl border ${colorClasses} p-4 transition-colors`}>
      <div className={`${headerColor} text-white text-sm font-semibold px-3 py-2 rounded-lg mb-4 text-center`}>{label}</div>
      <div className="space-y-2 text-sm">
        <Row label="Gross" value={formatRM(salaryNum)} bold />
        <Divider />
        <Row label="EPF" value={`-${formatRM(result.epf.employee)}`} sub />
        <Row label="SOCSO" value={`-${formatRM(result.socso.employee)}`} sub />
        <Row label="EIS" value={`-${formatRM(result.eis.employee)}`} sub />
        <Row label="PCB (Tax)" value={`-${formatRM(result.pcb.monthly)}`} sub />
        {result.zakat.monthly > 0 && <Row label="Zakat" value={`-${formatRM(result.zakat.monthly)}`} sub />}
        <Divider />
        <Row label="Total Deductions" value={formatRM(result.totalEmployeeDeductions)} className="text-red-600 dark:text-red-400" />
        {result.totalCommitments > 0 && <Row label="Commitments" value={`-${formatRM(result.totalCommitments)}`} className="text-orange-600 dark:text-orange-400" />}
        <Divider />
        <Row label="Net Salary" value={formatRM(result.netSalary)} bold className={result.netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} />
        <Divider />
        <Row label="Employer Cost" value={formatRM(salaryNum + result.totalEmployerContributions)} sub className="text-amber-600 dark:text-amber-400" />
      </div>
    </div>
  )
}

function Row({ label, value, bold, sub, className = '' }) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <span className={`${sub ? 'text-slate-400 dark:text-slate-500 pl-2' : 'text-slate-600 dark:text-slate-400'} ${bold ? 'font-semibold' : ''}`}>{label}</span>
      <span className={`${bold ? 'font-bold text-base' : 'font-medium'}`}>{value}</span>
    </div>
  )
}

function Divider() {
  return <hr className="border-slate-200 dark:border-slate-700" />
}

function SalaryComparison({ age, commitments, options }) {
  const [salary1, setSalary1] = useState('')
  const [salary2, setSalary2] = useState('')

  const s1 = parseFloat(salary1) || 0
  const s2 = parseFloat(salary2) || 0
  const r1 = calculateAll(s1, age, commitments, options)
  const r2 = calculateAll(s2, age, commitments, options)
  const diff = r2.netSalary - r1.netSalary

  return (
    <div className="space-y-4 animate-fade-in-up">
      {/* Salary inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Salary A (Current)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">RM</span>
            <input
              type="number"
              value={salary1}
              onChange={(e) => setSalary1(e.target.value)}
              placeholder="e.g. 3500"
              min="0"
              className="w-full pl-10 pr-4 py-2.5 border border-blue-300 dark:border-blue-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Salary B (New Offer)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">RM</span>
            <input
              type="number"
              value={salary2}
              onChange={(e) => setSalary2(e.target.value)}
              placeholder="e.g. 5000"
              min="0"
              className="w-full pl-10 pr-4 py-2.5 border border-emerald-300 dark:border-emerald-700 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Difference banner */}
      {s1 > 0 && s2 > 0 && (
        <div className={`rounded-xl p-4 text-center ${diff >= 0 ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'}`}>
          <p className="text-sm text-slate-600 dark:text-slate-400">Net salary difference</p>
          <p className={`text-2xl font-bold ${diff >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {diff >= 0 ? '+' : ''}{formatRM(diff)} / month
          </p>
          <p className={`text-sm font-medium ${diff >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {diff >= 0 ? '+' : ''}{formatRM(diff * 12)} / year
          </p>
        </div>
      )}

      {/* Side by side comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CompareColumn label="Salary A" salary={salary1} age={age} commitments={commitments} options={options} color="blue" />
        <CompareColumn label="Salary B" salary={salary2} age={age} commitments={commitments} options={options} color="green" />
      </div>
    </div>
  )
}

export default SalaryComparison
