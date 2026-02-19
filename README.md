# MY Salary Calculator

A comprehensive Malaysian salary calculator that computes EPF (KWSP), SOCSO (PERKESO), EIS (SIP), PCB/MTD (income tax), and Zakat deductions based on your monthly gross salary. Track commitments, compare salaries, and see your actual take-home pay.

## Features

### Calculator Tab
- **EPF/SOCSO/EIS Calculation** - Uses official SOCSO wage bracket table (matching PayrollPanda)
- **PCB/MTD Tax Deduction** - Estimated monthly tax based on marital status & children
- **Zakat Calculator** - Toggle on/off, 2.5% on income after EPF
- **Age-Based Rates** - Different rates for under 60 and 60+ employees
- **Commitment Tracker** - Add unlimited monthly commitments (loans, rent, insurance, etc.)
- **Net Salary Summary** - Visual breakdown with progress bar
- **Savings Goal Tracker** - Set monthly savings target and track progress
- **Employer Contribution View** - See what your company pays on top of your salary
- **Share/Export** - Copy summary to clipboard, print payslip

### Yearly Summary Tab
- Annual breakdown of all deductions
- EPF savings growth (employee + employer)
- Monthly vs yearly comparison

### Salary Comparison Tab
- Compare two salary scenarios side by side (e.g. current vs new offer)
- Shows net difference per month and per year

### Bonus/OT Calculator Tab
- Calculate EPF, SOCSO, EIS deductions on bonus, OT, commission, or allowance

## Contribution Rates (2024/2025)

| Component | Employee | Employer | Method |
|-----------|----------|----------|--------|
| EPF (under 60) | 11% | 13% (≤RM5K) / 12% (>RM5K) | Percentage (no ceiling) |
| EPF (60+) | 5.5% | 6.5% (≤RM5K) / 6% (>RM5K) | Percentage (no ceiling) |
| SOCSO Cat 1 (under 60) | ~0.5% | ~1.75% | Wage bracket table (cap RM6,000) |
| SOCSO Cat 2 (60+) | 0% | ~1.25% | Wage bracket table (cap RM6,000) |
| EIS (under 60) | 0.2% | 0.2% | Wage bracket table (cap RM6,000) |
| PCB/MTD | 0-30% | - | Progressive tax brackets |
| Zakat | 2.5% | - | On income after EPF (optional) |

## Other Features
- **Dark/Light Mode** - Auto-detects system preference with manual toggle
- **Responsive Design** - Works on desktop, tablet, and mobile
- **PWA Support** - Install as an app on your device
- **Session Storage** - Data persists during session, resets on page reload

## Tech Stack

- React 19 + Vite
- Tailwind CSS 4
- PWA (vite-plugin-pwa)
- GitHub Pages deployment (GitHub Actions)

## Getting Started

```bash
npm install
npm run dev
```

## Deployment

Auto-deploys to GitHub Pages via GitHub Actions on push to `main`.

1. Push code to GitHub
2. Go to **Settings > Pages > Source** > select **GitHub Actions**
3. The workflow handles the rest

## Disclaimer

This calculator is for reference purposes only. SOCSO/EIS rates are based on the official wage bracket tables. PCB is a simplified estimate. Please verify with official sources (KWSP, PERKESO, LHDN) or PayrollPanda for accuracy.
