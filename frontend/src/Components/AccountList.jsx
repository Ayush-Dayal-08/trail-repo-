function AccountList({ accounts, onAccountClick }) {
  // Sort accounts by recovery probability (highest first)
  const sortedAccounts = [...accounts].sort((a, b) => {
    // Backend returns flat data, so we check recovery_probability directly
    const scoreA = a.recovery_probability || 0
    const scoreB = b.recovery_probability || 0
    return scoreB - scoreA
  })

  // Color coding function
  const getScoreColor = (probability) => {
    const percent = probability * 100
    if (percent >= 70) return 'bg-green-500'
    if (percent >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getScoreBgColor = (probability) => {
    const percent = probability * 100
    if (percent >= 70) return 'bg-emerald-500/10 border-emerald-500/30'
    if (percent >= 50) return 'bg-yellow-500/10 border-yellow-500/30'
    return 'bg-red-500/10 border-red-500/30'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark-100">
          📋 Account Analysis Results
        </h2>
        <p className="text-dark-400">
          {accounts.length} accounts analyzed • Sorted by recovery probability
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAccounts.map((account) => {
          const probability = account.recovery_probability || 0
          const percentScore = Math.round(probability * 100)

          return (
            <div
              key={account.account_id}
              onClick={() => onAccountClick(account.account_id)}
              className={`
                p-5 rounded-xl border-2 cursor-pointer
                transition-all duration-300 hover:shadow-lg hover:scale-[1.02]
                backdrop-blur-sm
                ${getScoreBgColor(probability)}
              `}
            >
              {/* Company Name */}
              <h3 className="text-lg font-bold text-dark-100 mb-3">
                🏢 {account.company_name}
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-dark-500 uppercase tracking-wide">Amount</p>
                  <p className="text-lg font-semibold text-dark-200">
                    {formatCurrency(account.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-dark-500 uppercase tracking-wide">Days Overdue</p>
                  <p className="text-lg font-semibold text-dark-200">
                    {account.days_overdue} days
                  </p>
                </div>
              </div>

              {/* Score Bar */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs text-dark-500 uppercase tracking-wide">Recovery Score</p>
                  <p className="text-lg font-bold text-dark-100">{percentScore}%</p>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getScoreColor(probability)}`}
                    style={{ width: `${percentScore}%` }}
                  ></div>
                </div>
              </div>

              {/* Click hint */}
              <p className="text-xs text-dark-500 mt-3 text-center">
                Click for details →
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AccountList