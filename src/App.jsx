import { useState, useEffect, useCallback } from 'react'
import { calculateAll, formatRM } from './utils/calculations'
import SalaryInput from './components/SalaryInput'
import DeductionCard from './components/DeductionCard'
import PCBCard from './components/PCBCard'
import ZakatToggle from './components/ZakatToggle'
import CommitmentManager from './components/CommitmentManager'
import NetSalaryCard from './components/NetSalaryCard'
import EmployerCard from './components/EmployerCard'
import SavingsGoal from './components/SavingsGoal'
import ShareButton from './components/ShareButton'
import ExportPayslip from './components/ExportPayslip'
import ThemeToggle from './components/ThemeToggle'
import TabPanel from './components/TabPanel'
import YearlySummary from './components/YearlySummary'
import SalaryComparison from './components/SalaryComparison'
import BonusCalculator from './components/BonusCalculator'
import RateTable from './components/RateTable'

const STORAGE_KEY = 'mySalaryCalcData'

function loadFromStorage() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // ignore
  }
  return null
}

function App() {
  const saved = loadFromStorage()
  const [salary, setSalary] = useState(saved?.salary || '')
  const [age, setAge] = useState(saved?.age || 30)
  const [commitments, setCommitments] = useState(saved?.commitments || [])
  const [maritalStatus, setMaritalStatus] = useState(saved?.maritalStatus || 'single')
  const [children, setChildren] = useState(saved?.children || 0)
  const [zakatEnabled, setZakatEnabled] = useState(saved?.zakatEnabled || false)
  const [dark, setDark] = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(prefersDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const salaryNum = parseFloat(salary) || 0
  const options = { maritalStatus, children, zakatEnabled }
  const result = calculateAll(salaryNum, age, commitments, options)

  const saveToStorage = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        salary, age, commitments, maritalStatus, children, zakatEnabled
      }))
    } catch {
      // ignore
    }
  }, [salary, age, commitments, maritalStatus, children, zakatEnabled])

  useEffect(() => {
    saveToStorage()
  }, [saveToStorage])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 text-white shadow-xl border-b border-blue-600 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight">MY Salary Calculator</h1>
              <p className="text-blue-200 dark:text-slate-400 text-[11px] sm:text-sm">EPF / SOCSO / EIS / PCB / Zakat</p>
            </div>
          </div>
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-5 sm:py-8 space-y-5 sm:space-y-6">
        {/* Salary Input - always visible */}
        <div className="animate-fade-in-up">
          <SalaryInput salary={salary} setSalary={setSalary} age={age} setAge={setAge} />
        </div>

        {/* Tab Navigation */}
        {salaryNum > 0 && (
          <div className="animate-fade-in-up">
            <TabPanel activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        )}

        {/* ── Calculator Tab ── */}
        {salaryNum > 0 && activeTab === 'calculator' && (
          <div className="space-y-5 sm:space-y-6 animate-fade-in-up">
            {/* Quick Summary Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 transition-colors">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Gross</p>
                  <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">{formatRM(salaryNum)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Deductions</p>
                  <p className="text-base sm:text-lg font-bold text-red-600 dark:text-red-400">{formatRM(result.totalEmployeeDeductions)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Commitments</p>
                  <p className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400">{formatRM(result.totalCommitments)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Net Pay</p>
                  <p className={`text-base sm:text-lg font-bold ${result.netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{formatRM(result.netSalary)}</p>
                </div>
              </div>
            </div>

            {/* Statutory Deductions */}
            <section>
              <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Employee Deductions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <DeductionCard
                  title="EPF (KWSP)"
                  amount={result.epf.employee}
                  rate={`${result.epf.employeeRate}%`}
                  color="blue"
                  description={age < 60 ? 'Standard rate (under 60)' : 'Reduced rate (60+)'}
                  icon="epf"
                />
                <DeductionCard
                  title="SOCSO (PERKESO)"
                  amount={result.socso.employee}
                  rate={`Cat ${result.socso.category}`}
                  color="green"
                  description={`Wage bracket table - Ceiling RM6,000`}
                  icon="socso"
                />
                <DeductionCard
                  title="EIS (SIP)"
                  amount={result.eis.employee}
                  rate={`${result.eis.employeeRate || 0}%`}
                  color="purple"
                  description={age >= 60 ? 'Exempt (60+)' : 'Wage bracket table - Ceiling RM6,000'}
                  icon="eis"
                />
                <PCBCard
                  pcb={result.pcb}
                  maritalStatus={maritalStatus}
                  setMaritalStatus={setMaritalStatus}
                  children={children}
                  setChildren={setChildren}
                />
                <ZakatToggle
                  zakat={result.zakat}
                  enabled={zakatEnabled}
                  setEnabled={setZakatEnabled}
                />
              </div>
            </section>

            {/* Commitments */}
            <CommitmentManager commitments={commitments} setCommitments={setCommitments} />

            {/* Net Salary */}
            <NetSalaryCard result={result} />

            {/* Savings Goal */}
            <SavingsGoal disposableIncome={result.netSalary} />

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <ShareButton result={result} salary={salaryNum} />
              <ExportPayslip result={result} salary={salaryNum} age={age} maritalStatus={maritalStatus} children={children} />
            </div>

            {/* Employer Contributions */}
            <EmployerCard result={result} salary={salaryNum} />
          </div>
        )}

        {/* ── Yearly Tab ── */}
        {salaryNum > 0 && activeTab === 'yearly' && (
          <YearlySummary result={result} />
        )}

        {/* ── Compare Tab ── */}
        {salaryNum > 0 && activeTab === 'compare' && (
          <SalaryComparison age={age} commitments={commitments} options={options} />
        )}

        {/* ── Bonus/OT Tab ── */}
        {salaryNum > 0 && activeTab === 'bonus' && (
          <BonusCalculator age={age} />
        )}

        {/* ── Rate Tables Tab ── */}
        {salaryNum > 0 && activeTab === 'rates' && (
          <RateTable salary={salary} />
        )}

        {/* Empty State */}
        {salaryNum === 0 && (
          <div className="animate-fade-in-up text-center py-12 sm:py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Enter Your Salary</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Key in your monthly gross salary above to calculate your EPF, SOCSO, EIS, PCB tax deductions and see your net take-home pay.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-[11px] sm:text-xs text-slate-400 dark:text-slate-600 pb-6 pt-2 space-y-1">
          <p>Rates: EPF (KWSP), SOCSO (PERKESO), EIS (SIP), PCB/MTD (LHDN) - Malaysia 2024/2025</p>
          <p>SOCSO & EIS: Official wage bracket table | EPF: Percentage based | PCB: Simplified estimate</p>
          <p>For reference only. Verify with official sources or PayrollPanda.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
