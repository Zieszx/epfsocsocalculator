import { useState, useEffect, useCallback } from 'react';
import { calculateAll, formatRM } from './utils/calculations';
import SalaryInput from './components/SalaryInput';
import DeductionCard from './components/DeductionCard';
import PCBCard from './components/PCBCard';
import ZakatToggle from './components/ZakatToggle';
import CommitmentManager from './components/CommitmentManager';
import NetSalaryCard from './components/NetSalaryCard';
import EmployerCard from './components/EmployerCard';
import SavingsGoal from './components/SavingsGoal';
import ShareButton from './components/ShareButton';
import ExportPayslip from './components/ExportPayslip';
import ThemeToggle from './components/ThemeToggle';
import TabPanel from './components/TabPanel';
import YearlySummary from './components/YearlySummary';
import SalaryComparison from './components/SalaryComparison';
import BonusCalculator from './components/BonusCalculator';
import RateTable from './components/RateTable';

const STORAGE_KEY = 'mySalaryCalcData';

function loadFromStorage() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return null;
}

function App() {
  const saved = loadFromStorage();
  const [salary, setSalary] = useState(saved?.salary || '');
  const [age, setAge] = useState(saved?.age?.toString() || '30');
  const [commitments, setCommitments] = useState(saved?.commitments || []);
  const [maritalStatus, setMaritalStatus] = useState(saved?.maritalStatus || 'single');
  const [children, setChildren] = useState(saved?.children?.toString() || '0');
  const [zakatEnabled, setZakatEnabled] = useState(saved?.zakatEnabled || false);
  const [pcbEnabled, setPcbEnabled] = useState(saved?.pcbEnabled ?? true);
  const [dark, setDark] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');
  const [bonuses, setBonuses] = useState(saved?.bonuses || []);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDark(prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const salaryNum = parseFloat(salary) || 0;
  const ageNum = parseInt(age) || 30;
  const totalBonusAmount = bonuses.reduce((sum, b) => sum + b.amount, 0);
  const totalGrossWithBonus = salaryNum + totalBonusAmount;
  const options = { maritalStatus, children: parseInt(children) || 0, zakatEnabled, pcbEnabled };
  const result = calculateAll(salaryNum, ageNum, commitments, options);
  const resultWithBonus = calculateAll(totalGrossWithBonus, ageNum, commitments, options);

  const saveToStorage = useCallback(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          salary,
          age: parseInt(age) || 30,
          commitments,
          maritalStatus,
          children: parseInt(children) || 0,
          zakatEnabled,
          pcbEnabled,
          bonuses,
        }),
      );
    } catch {
      // ignore
    }
  }, [salary, age, commitments, maritalStatus, children, zakatEnabled, pcbEnabled, bonuses]);

  useEffect(() => {
    saveToStorage();
  }, [saveToStorage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 text-white shadow-xl border-b border-blue-600 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/15 backdrop-blur rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
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
            {/* Bonus Summary Bar (if bonuses exist) */}
            {bonuses.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-800/50 p-4 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">Bonuses Added ({bonuses.length})</h3>
                  </div>
                  <button
                    onClick={() => setBonuses([])}
                    className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bonuses.map((bonus) => (
                    <span key={bonus.id} className="inline-flex items-center gap-1 px-2 py-1 bg-white dark:bg-slate-800 rounded-lg text-sm border border-yellow-300 dark:border-yellow-700">
                      <span className="text-slate-600 dark:text-slate-300">{bonus.type}</span>
                      <span className="font-semibold text-yellow-700 dark:text-yellow-400">{formatRM(bonus.amount)}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Summary Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 transition-colors">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">
                    {bonuses.length > 0 ? 'Base Gross' : 'Gross'}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">{formatRM(salaryNum)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Deductions</p>
                  <p className="text-base sm:text-lg font-bold text-red-600 dark:text-red-400">{formatRM((bonuses.length > 0 ? resultWithBonus : result).totalEmployeeDeductions)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Commitments</p>
                  <p className="text-base sm:text-lg font-bold text-orange-600 dark:text-orange-400">{formatRM(result.totalCommitments)}</p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Net Pay</p>
                  <p className={`text-base sm:text-lg font-bold ${(bonuses.length > 0 ? resultWithBonus : result).netSalary >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {formatRM((bonuses.length > 0 ? resultWithBonus : result).netSalary)}
                  </p>
                </div>
              </div>
              {bonuses.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">With Bonus</p>
                      <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400">{formatRM(resultWithBonus.netSalary)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Extra Deductions</p>
                      <p className="text-sm font-bold text-red-500 dark:text-red-400">{formatRM(resultWithBonus.totalEmployeeDeductions - result.totalEmployeeDeductions)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Bonus Net</p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">{formatRM(resultWithBonus.netSalary - result.netSalary)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Statutory Deductions */}
            <section>
              <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-500 rounded-full"></span>
                Employee Deductions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <DeductionCard title="EPF (KWSP)" amount={result.epf.employee} rate={`${result.epf.employeeRate}%`} color="blue" description={age < 60 ? 'Standard rate (under 60)' : 'Reduced rate (60+)'} icon="epf" />
                <DeductionCard title="SOCSO (PERKESO)" amount={result.socso.employee} rate={`Cat ${result.socso.category}`} color="green" description={`Wage bracket table - Ceiling RM6,000`} icon="socso" />
                <DeductionCard title="EIS (SIP)" amount={result.eis.employee} rate={`${result.eis.employeeRate || 0}%`} color="purple" description={age >= 60 ? 'Exempt (60+)' : 'Wage bracket table - Ceiling RM6,000'} icon="eis" />
                <PCBCard pcb={result.pcb} maritalStatus={maritalStatus} setMaritalStatus={setMaritalStatus} children={children} setChildren={setChildren} pcbEnabled={pcbEnabled} setPcbEnabled={setPcbEnabled} />
                <ZakatToggle zakat={result.zakat} enabled={zakatEnabled} setEnabled={setZakatEnabled} />
              </div>
            </section>

            {/* Commitments */}
            <CommitmentManager commitments={commitments} setCommitments={setCommitments} />

            {/* Net Salary */}
            <NetSalaryCard result={bonuses.length > 0 ? resultWithBonus : result} showBonus={bonuses.length > 0} baseResult={result} bonusResult={resultWithBonus} bonuses={bonuses} />

            {/* Savings Goal */}
            <SavingsGoal disposableIncome={(bonuses.length > 0 ? resultWithBonus : result).netSalary} />

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <ShareButton result={bonuses.length > 0 ? resultWithBonus : result} salary={totalGrossWithBonus} />
              <ExportPayslip result={bonuses.length > 0 ? resultWithBonus : result} salary={totalGrossWithBonus} age={ageNum} maritalStatus={maritalStatus} children={parseInt(children) || 0} bonuses={bonuses} />
            </div>

            {/* Employer Contributions */}
            <EmployerCard result={bonuses.length > 0 ? resultWithBonus : result} salary={totalGrossWithBonus} />
          </div>
        )}

        {/* ── Yearly Tab ── */}
        {salaryNum > 0 && activeTab === 'yearly' && <YearlySummary result={bonuses.length > 0 ? resultWithBonus : result} baseResult={result} bonuses={bonuses} />}

        {/* ── Compare Tab ── */}
        {salaryNum > 0 && activeTab === 'compare' && <SalaryComparison age={ageNum} commitments={commitments} options={options} />}

        {/* ── Bonus/OT Tab ── */}
        {salaryNum > 0 && activeTab === 'bonus' && <BonusCalculator age={ageNum} salary={salaryNum} bonuses={bonuses} setBonuses={setBonuses} resultWithBonus={resultWithBonus} baseResult={result} />}

        {/* ── Rate Tables Tab ── */}
        {salaryNum > 0 && activeTab === 'rates' && <RateTable salary={salary} />}

        {/* Empty State */}
        {salaryNum === 0 && (
          <div className="animate-fade-in-up text-center py-12 sm:py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-4">
              <svg className="w-10 h-10 text-blue-500 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Enter Your Salary</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">Key in your monthly gross salary above to calculate your EPF, SOCSO, EIS, PCB tax deductions and see your net take-home pay.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-[11px] sm:text-xs text-slate-400 dark:text-slate-600 pb-6 pt-2 space-y-1">
          <p>Rates: EPF (KWSP), SOCSO (PERKESO), EIS (SIP), PCB/MTD (LHDN) - Malaysia 2024/2025</p>
          <p>SOCSO & EIS: Official wage bracket table | EPF: Percentage based | PCB: Simplified estimate</p>
          <p>For reference only. Verify with official sources or PayrollPanda.</p>
          <p className="pt-1">
            Made with ❤︎ by{' '}
            <span className="font-medium text-slate-500 dark:text-slate-500">
              <a href="https://zieszx.github.io/portfolio" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Zieszx
              </a>
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
