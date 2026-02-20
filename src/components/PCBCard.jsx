import { formatRM } from '../utils/calculations';

function PCBCard({ pcb, maritalStatus, setMaritalStatus, children, setChildren, pcbEnabled, setPcbEnabled }) {
  return (
    <div className={`rounded-xl border p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${
      pcbEnabled
        ? 'bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-rose-200 dark:border-rose-800/50'
        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
    }`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          pcbEnabled
            ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
        }`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round"/>
            <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">PCB / MTD (Tax)</h3>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 mr-1">LHDN</span>
        <button
          onClick={() => setPcbEnabled(!pcbEnabled)}
          className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer shrink-0 ${
            pcbEnabled ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'
          }`}
        >
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            pcbEnabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}></span>
        </button>
      </div>

      <p className={`text-2xl font-bold mb-3 ${pcbEnabled ? 'text-rose-700 dark:text-rose-400' : 'text-slate-400 dark:text-slate-600'}`}>
        {formatRM(pcbEnabled ? pcb.monthly : 0)}
      </p>

      {pcbEnabled ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 w-16 shrink-0">Status</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="flex-1 text-xs px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 w-16 shrink-0">Children</label>
            <input
              type="number"
              value={children}
              onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              max="20"
              className="flex-1 text-xs px-2 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Relief: {formatRM(pcb.reliefs)} | Annual tax: {formatRM(pcb.annual)}
          </p>
        </div>
      ) : (
        <p className="text-[11px] text-slate-400 dark:text-slate-500">Toggle to enable PCB / MTD tax calculation</p>
      )}
    </div>
  );
}

export default PCBCard;
