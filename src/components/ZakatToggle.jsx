import { formatRM } from '../utils/calculations'

function ZakatToggle({ zakat, enabled, setEnabled }) {
  return (
    <div className={`rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
      enabled
        ? 'bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200 dark:border-teal-800/50'
        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          enabled ? 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
        }`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M12 3l1.912 5.813h6.088l-4.956 3.574L16.956 18 12 14.426 7.044 18l1.912-5.613L4 8.813h6.088L12 3z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm flex-1">Zakat</h3>
        <button
          onClick={() => setEnabled(!enabled)}
          type="button"
          role="switch"
          aria-checked={enabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 cursor-pointer ${
            enabled ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span className="sr-only">Toggle Zakat</span>
          <span
            aria-hidden="true"
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
              enabled ? 'translate-x-6' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <p className={`text-2xl font-bold mb-1 ${enabled ? 'text-teal-700 dark:text-teal-400' : 'text-slate-400 dark:text-slate-600'}`}>
        {formatRM(zakat.monthly)}
      </p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        {enabled ? `${zakat.rate}% on income after EPF` : 'Toggle to enable zakat calculation'}
      </p>
    </div>
  )
}

export default ZakatToggle
