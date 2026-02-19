import { useState } from 'react'
import { formatRM } from '../utils/calculations'

function ShareButton({ result, salary }) {
  const [copied, setCopied] = useState(false)

  const generateText = () => {
    const lines = [
      `MY Salary Calculator Summary`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Gross Salary: ${formatRM(salary)}`,
      ``,
      `Deductions:`,
      `  EPF: ${formatRM(result.epf.employee)} (${result.epf.employeeRate}%)`,
      `  SOCSO: ${formatRM(result.socso.employee)} (${result.socso.employeeRate}%)`,
      `  EIS: ${formatRM(result.eis.employee)} (${result.eis.employeeRate}%)`,
      `  PCB/Tax: ${formatRM(result.pcb.monthly)}`,
    ]

    if (result.zakat.monthly > 0) {
      lines.push(`  Zakat: ${formatRM(result.zakat.monthly)}`)
    }

    lines.push(
      ``,
      `Total Deductions: ${formatRM(result.totalEmployeeDeductions)}`,
    )

    if (result.totalCommitments > 0) {
      lines.push(`Total Commitments: ${formatRM(result.totalCommitments)}`)
    }

    lines.push(
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Net Take Home: ${formatRM(result.netSalary)}`,
      ``,
      `Employer Contribution: ${formatRM(result.totalEmployerContributions)}`,
      `Total Employer Cost: ${formatRM(salary + result.totalEmployerContributions)}`,
    )

    return lines.join('\n')
  }

  const handleShare = async () => {
    const text = generateText()

    if (navigator.share) {
      try {
        await navigator.share({ title: 'MY Salary Calculator', text })
        return
      } catch {
        // fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
        copied
          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700'
          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600'
      }`}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Share
        </>
      )}
    </button>
  )
}

export default ShareButton
