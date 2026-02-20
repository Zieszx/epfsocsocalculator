import { useState } from 'react';
import { calculateBonusDeductions, formatRM } from '../utils/calculations';

const OT_MULTIPLIERS = [
  { label: 'Weekday OT (1.5×)', value: 1.5 },
  { label: 'Rest Day OT (2×)', value: 2 },
  { label: 'Public Holiday OT (3×)', value: 3 },
];

function BonusCalculator({ age, salary = 0 }) {
  const [bonusType, setBonusType] = useState('bonus');
  const [bonusAmount, setBonusAmount] = useState('');

  // OT-specific state
  const [otSalary, setOtSalary] = useState(salary > 0 ? String(salary) : '');
  const [otHours, setOtHours] = useState('');
  const [otMultiplier, setOtMultiplier] = useState(1.5);

  const isOT = bonusType === 'ot';

  // Derive the RM amount to pass to deduction calculation
  const otMonthlySalary = parseFloat(otSalary) || 0;
  const otHoursNum = parseFloat(otHours) || 0;
  // Malaysian formula: monthly salary ÷ 26 working days ÷ 8 hours × multiplier × hours
  const otAmount = otMonthlySalary > 0 && otHoursNum > 0
    ? Math.round((otMonthlySalary / 26 / 8) * otMultiplier * otHoursNum * 100) / 100
    : 0;
  const hourlyRate = otMonthlySalary > 0 ? Math.round((otMonthlySalary / 26 / 8) * 100) / 100 : 0;

  const amount = isOT ? otAmount : (parseFloat(bonusAmount) || 0);
  const result = calculateBonusDeductions(amount, age);

  return (
    <div className="space-y-4 animate-fade-in-up">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-colors">
        <h2 className="text-base sm:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-yellow-500 rounded-full"></span>
          Bonus / Overtime Calculator
        </h2>

        {/* Type selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Type</label>
          <select
            value={bonusType}
            onChange={(e) => setBonusType(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bonus">Annual Bonus</option>
            <option value="ot">Overtime Pay</option>
            <option value="commission">Commission</option>
            <option value="allowance">Allowance</option>
          </select>
        </div>

        {isOT ? (
          /* ── OT mode: calculate by hours ── */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Monthly Basic Salary (RM)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">RM</span>
                  <input
                    type="number"
                    value={otSalary}
                    onChange={(e) => setOtSalary(e.target.value)}
                    placeholder="e.g. 3000"
                    min="0"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                {hourlyRate > 0 && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Hourly rate: {formatRM(hourlyRate)} (salary ÷ 26 days ÷ 8 hrs)
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  OT Hours
                </label>
                <input
                  type="number"
                  value={otHours}
                  onChange={(e) => setOtHours(e.target.value)}
                  placeholder="e.g. 10"
                  min="0"
                  className="w-full px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">OT Rate</label>
              <div className="flex flex-wrap gap-2">
                {OT_MULTIPLIERS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setOtMultiplier(m.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                      otMultiplier === m.value
                        ? 'bg-yellow-500 border-yellow-500 text-white'
                        : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-yellow-400'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {otAmount > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-4 py-2.5 border border-yellow-200 dark:border-yellow-800/50">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  OT Pay = {formatRM(hourlyRate)} × {otMultiplier}× × {otHoursNum} hrs =&nbsp;
                  <span className="font-bold text-yellow-700 dark:text-yellow-400">{formatRM(otAmount)}</span>
                </p>
              </div>
            )}
          </div>
        ) : (
          /* ── Non-OT mode: direct amount input ── */
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Amount (RM)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">RM</span>
              <input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                placeholder="e.g. 5000"
                min="0"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        )}
      </div>

      {amount > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Employee deductions */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 transition-colors">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Your Deductions
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Gross {bonusType === 'ot' ? 'OT pay' : bonusType}</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">{formatRM(amount)}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400">
                <span className="pl-2">EPF ({age < 60 ? '11%' : '5.5%'})</span>
                <span>-{formatRM(result.epf)}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400">
                <span className="pl-2">SOCSO (0.5%)</span>
                <span>-{formatRM(result.socso)}</span>
              </div>
              <div className="flex justify-between text-red-600 dark:text-red-400">
                <span className="pl-2">EIS (0.2%)</span>
                <span>-{formatRM(result.eis)}</span>
              </div>
              <hr className="border-slate-200 dark:border-slate-600" />
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Net {bonusType === 'ot' ? 'OT pay' : bonusType}</span>
                <span className="text-lg font-bold text-green-600 dark:text-green-400">{formatRM(result.net)}</span>
              </div>
            </div>
          </div>

          {/* Employer cost */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800/50 p-4 transition-colors">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Employer Cost for This {bonusType === 'ot' ? 'OT' : bonusType}
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">EPF Employer</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{formatRM(result.epfEmployer)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">SOCSO Employer</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{formatRM(result.socsoEmployer)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">EIS Employer</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">{formatRM(result.eisEmployer)}</span>
              </div>
              <hr className="border-amber-200 dark:border-amber-700" />
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700 dark:text-slate-200">Total Employer Cost</span>
                <span className="text-lg font-bold text-amber-700 dark:text-amber-400">{formatRM(amount + result.epfEmployer + result.socsoEmployer + result.eisEmployer)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {amount === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-3">
            <svg className="w-8 h-8 text-yellow-500 dark:text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            {isOT ? 'Enter your monthly salary and OT hours above to see the breakdown' : 'Enter your bonus or OT amount above to see the breakdown'}
          </p>
        </div>
      )}
    </div>
  );
}

export default BonusCalculator;
