import { formatRM } from '../utils/calculations'

const colorMap = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    amount: 'text-blue-800 dark:text-blue-300',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    iconText: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    amount: 'text-emerald-800 dark:text-emerald-300',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
    iconText: 'text-emerald-600 dark:text-emerald-400',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    amount: 'text-purple-800 dark:text-purple-300',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    iconText: 'text-purple-600 dark:text-purple-400',
  },
}

const icons = {
  epf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M2 7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7z" strokeLinecap="round"/>
      <path d="M12 12a2 2 0 100-4 2 2 0 000 4z"/>
      <path d="M2 7l6 5m14-5l-6 5" strokeLinecap="round"/>
    </svg>
  ),
  socso: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  eis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

function DeductionCard({ title, amount, rate, color, description, icon }) {
  const c = colorMap[color] || colorMap.blue

  return (
    <div className={`${c.bg} border ${c.border} rounded-xl p-4 transition-all hover:shadow-md hover:-translate-y-0.5`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg ${c.iconBg} ${c.iconText} flex items-center justify-center`}>
          {icons[icon]}
        </div>
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm flex-1">{title}</h3>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{rate}</span>
      </div>
      <p className={`text-2xl font-bold ${c.amount} mb-1`}>{formatRM(amount)}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  )
}

export default DeductionCard
