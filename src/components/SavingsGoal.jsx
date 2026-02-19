import { useState } from 'react'
import { formatRM } from '../utils/calculations'

function SavingsGoal({ disposableIncome }) {
  const [goal, setGoal] = useState('')
  const goalNum = parseFloat(goal) || 0
  const progress = disposableIncome > 0 && goalNum > 0 ? Math.min(100, (goalNum / disposableIncome) * 100) : 0
  const remaining = disposableIncome - goalNum
  const isAchievable = remaining >= 0

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 transition-colors">
      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Monthly Savings Goal
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-400 text-sm">RM</span>
        <input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g. 500"
          min="0"
          className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {goalNum > 0 && disposableIncome > 0 && (
        <>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isAchievable ? 'bg-gradient-to-r from-indigo-400 to-indigo-600' : 'bg-gradient-to-r from-red-400 to-red-500'}`}
              style={{ width: `${Math.min(100, progress)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className={isAchievable ? 'text-indigo-600 dark:text-indigo-400' : 'text-red-500'}>
              {progress.toFixed(0)}% of net salary
            </span>
            <span className="text-slate-400 dark:text-slate-500">
              {isAchievable ? `${formatRM(remaining)} left to spend` : `Exceeds by ${formatRM(Math.abs(remaining))}`}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default SavingsGoal
