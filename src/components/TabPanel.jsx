const tabs = [
  { id: 'calculator', label: 'Calculator', shortLabel: 'Calc', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="4" y="2" width="16" height="20" rx="2" strokeLinecap="round"/>
      <path d="M8 6h8M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2" strokeLinecap="round"/>
    </svg>
  )},
  { id: 'yearly', label: 'Yearly', shortLabel: 'Year', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round"/>
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round"/>
    </svg>
  )},
  { id: 'compare', label: 'Compare', shortLabel: 'Comp', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M9 19V6l-6 6M15 5v13l6-6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { id: 'bonus', label: 'Bonus/OT', shortLabel: 'Bonus', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )},
  { id: 'rates', label: 'Rate Tables', shortLabel: 'Rates', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
      <path d="M3 10h18M3 14h18M3 6h18M3 18h18M8 6v12M16 6v12" strokeLinecap="round"/>
    </svg>
  )},
]

function TabPanel({ activeTab, setActiveTab }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-1 transition-colors">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-1.5 px-1.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden text-[10px]">{tab.shortLabel}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabPanel
