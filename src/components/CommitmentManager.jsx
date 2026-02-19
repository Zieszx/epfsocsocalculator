import { useState } from 'react'
import { formatRM } from '../utils/calculations'

function CommitmentManager({ commitments, setCommitments }) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')

  const addCommitment = () => {
    if (!name.trim() || !amount || parseFloat(amount) <= 0) return
    setCommitments([...commitments, { id: Date.now(), name: name.trim(), amount: parseFloat(amount) }])
    setName('')
    setAmount('')
  }

  const removeCommitment = (id) => {
    setCommitments(commitments.filter((c) => c.id !== id))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addCommitment()
  }

  const total = commitments.reduce((sum, c) => sum + c.amount, 0)

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-3">Monthly Commitments</h2>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6 transition-colors">
        {/* Add commitment form */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Car Loan, Rent, Insurance"
            className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
          />
          <div className="relative w-full sm:w-40">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">RM</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Amount"
              min="0"
              step="10"
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
            />
          </div>
          <button
            onClick={addCommitment}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            + Add
          </button>
        </div>

        {/* Commitment list */}
        {commitments.length > 0 ? (
          <div className="space-y-2">
            {commitments.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 rounded-lg px-4 py-3 group"
              >
                <span className="text-slate-700 dark:text-slate-200 font-medium">{c.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-600 dark:text-slate-300 font-semibold">{formatRM(c.amount)}</span>
                  <button
                    onClick={() => removeCommitment(c.id)}
                    className="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full w-7 h-7 flex items-center justify-center transition-colors opacity-60 group-hover:opacity-100 cursor-pointer"
                    title="Remove"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Total Commitments</span>
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400">{formatRM(total)}</span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">
            No commitments added yet. Add your monthly commitments above.
          </p>
        )}
      </div>
    </section>
  )
}

export default CommitmentManager
