import { formatRM } from '../utils/calculations'

function ExportPayslip({ result, salary, age, maritalStatus, children }) {
  const handlePrint = () => {
    const { epf, socso, eis, pcb, zakat, totalEmployeeDeductions, totalEmployerContributions, totalCommitments, netSalary } = result

    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Payslip Summary</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; padding: 32px; color: #1e293b; max-width: 700px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 3px solid #1e40af; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { font-size: 22px; color: #1e40af; }
    .header p { font-size: 12px; color: #64748b; margin-top: 4px; }
    .info { display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; }
    .info div { background: #f8fafc; padding: 8px 14px; border-radius: 6px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
    th { text-align: left; padding: 10px 12px; background: #f1f5f9; border-bottom: 2px solid #e2e8f0; color: #475569; font-weight: 600; }
    td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
    td:last-child { text-align: right; font-weight: 500; }
    .total-row td { border-top: 2px solid #1e40af; font-weight: 700; font-size: 15px; padding-top: 12px; }
    .net-positive { color: #16a34a; }
    .net-negative { color: #dc2626; }
    .deduction { color: #dc2626; }
    .employer { color: #d97706; }
    .section-label { font-weight: 600; color: #475569; background: #f8fafc; }
    .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px; }
    @media print { body { padding: 16px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Payslip Summary</h1>
    <p>Generated on ${new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>

  <div class="info">
    <div>Age: <strong>${age}</strong></div>
    <div>Status: <strong>${maritalStatus === 'married' ? 'Married' : 'Single'}</strong></div>
    <div>Children: <strong>${children}</strong></div>
  </div>

  <table>
    <thead>
      <tr><th>Description</th><th style="text-align:right">Amount (RM)</th></tr>
    </thead>
    <tbody>
      <tr><td><strong>Gross Monthly Salary</strong></td><td><strong>${formatRM(salary)}</strong></td></tr>
      <tr><td class="section-label" colspan="2">Employee Deductions</td></tr>
      <tr><td>&nbsp;&nbsp;EPF (${epf.employeeRate}%)</td><td class="deduction">- ${formatRM(epf.employee)}</td></tr>
      <tr><td>&nbsp;&nbsp;SOCSO (${socso.employeeRate}%)</td><td class="deduction">- ${formatRM(socso.employee)}</td></tr>
      <tr><td>&nbsp;&nbsp;EIS (${eis.employeeRate}%)</td><td class="deduction">- ${formatRM(eis.employee)}</td></tr>
      <tr><td>&nbsp;&nbsp;PCB / MTD (Tax)</td><td class="deduction">- ${formatRM(pcb.monthly)}</td></tr>
      ${zakat.monthly > 0 ? `<tr><td>&nbsp;&nbsp;Zakat (${zakat.rate}%)</td><td class="deduction">- ${formatRM(zakat.monthly)}</td></tr>` : ''}
      <tr><td><strong>Total Deductions</strong></td><td class="deduction"><strong>- ${formatRM(totalEmployeeDeductions)}</strong></td></tr>
      ${totalCommitments > 0 ? `
      <tr><td class="section-label" colspan="2">Commitments</td></tr>
      <tr><td><strong>Total Commitments</strong></td><td style="color:#ea580c"><strong>- ${formatRM(totalCommitments)}</strong></td></tr>
      ` : ''}
      <tr class="total-row"><td>Net Take Home Pay</td><td class="${netSalary >= 0 ? 'net-positive' : 'net-negative'}">${formatRM(netSalary)}</td></tr>
    </tbody>
  </table>

  <table>
    <thead>
      <tr><th>Employer Contributions</th><th style="text-align:right">Amount (RM)</th></tr>
    </thead>
    <tbody>
      <tr><td>&nbsp;&nbsp;EPF (${epf.employerRate}%)</td><td class="employer">${formatRM(epf.employer)}</td></tr>
      <tr><td>&nbsp;&nbsp;SOCSO (${socso.employerRate}%)</td><td class="employer">${formatRM(socso.employer)}</td></tr>
      <tr><td>&nbsp;&nbsp;EIS (${eis.employerRate}%)</td><td class="employer">${formatRM(eis.employer)}</td></tr>
      <tr><td><strong>Total Employer Contributions</strong></td><td class="employer"><strong>${formatRM(totalEmployerContributions)}</strong></td></tr>
      <tr class="total-row"><td>Total Cost to Company</td><td class="employer">${formatRM(salary + totalEmployerContributions)}</td></tr>
    </tbody>
  </table>

  <div class="footer">
    <p>MY Salary Calculator - For reference only. Verify with official sources.</p>
    <p>EPF (KWSP) | SOCSO (PERKESO) | EIS (SIP) | LHDN PCB/MTD</p>
  </div>
</body>
</html>`

    const printWindow = window.open('', '_blank')
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
    }
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all cursor-pointer"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Print Payslip
    </button>
  )
}

export default ExportPayslip
