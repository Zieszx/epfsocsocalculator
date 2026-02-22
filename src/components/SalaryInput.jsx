function SalaryInput({ salary, setSalary, age, setAge }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-colors">
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Salary Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Monthly Gross Salary (RM)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">RM</span>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="e.g. 3500"
              min="0"
              step="100"
              className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => {
              const value = e.target.value
              setAge(value === '' ? '' : value)
            }}
            onBlur={(e) => {
              const value = parseInt(e.target.value)
              setAge(isNaN(value) || value < 18 ? 30 : value > 75 ? 75 : value)
            }}
            placeholder="e.g. 30"
            min="18"
            max="75"
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
          />
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            {age && age < 60 ? 'Standard EPF 11% + SOCSO Cat 1 + EIS' : age >= 60 ? 'Reduced EPF 5.5% + SOCSO Cat 2, No EIS' : 'Enter your age for accurate calculations'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SalaryInput
