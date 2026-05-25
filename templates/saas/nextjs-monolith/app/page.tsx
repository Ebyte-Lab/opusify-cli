export default function Dashboard() {
  const metrics = [
    { label: 'Monthly Revenue', value: '$48,295', change: '+12.5%', positive: true },
    { label: 'Active Users', value: '12,847', change: '+8.2%', positive: true },
    { label: 'Churn Rate', value: '2.4%', change: '-0.3%', positive: true },
    { label: 'Avg. Session', value: '4m 32s', change: '-12s', positive: false },
  ];

  const chartData = [
    { month: 'Jan', revenue: 32000, users: 8400 },
    { month: 'Feb', revenue: 35000, users: 9200 },
    { month: 'Mar', revenue: 38500, users: 9800 },
    { month: 'Apr', revenue: 41000, users: 10500 },
    { month: 'May', revenue: 44200, users: 11300 },
    { month: 'Jun', revenue: 48295, users: 12847 },
  ];

  const recentTransactions = [
    { id: 'TXN-001', customer: 'Acme Corp', plan: 'Enterprise', amount: '$2,400', status: 'Completed', date: 'Today' },
    { id: 'TXN-002', customer: 'StartupXYZ', plan: 'Pro', amount: '$99', status: 'Completed', date: 'Today' },
    { id: 'TXN-003', customer: 'DevTeam Inc', plan: 'Enterprise', amount: '$2,400', status: 'Pending', date: 'Yesterday' },
    { id: 'TXN-004', customer: 'Solo Dev', plan: 'Starter', amount: '$29', status: 'Completed', date: 'Yesterday' },
    { id: 'TXN-005', customer: 'BigCo Ltd', plan: 'Enterprise', amount: '$2,400', status: 'Failed', date: '2 days ago' },
  ];

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to <span className="text-primary">{{projectName}}</span>
        </h1>
        <p className="mt-2 text-text-secondary text-lg">
          Your <strong>{{variant}}</strong> dashboard — real-time metrics at a glance.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((metric) => (
          <div key={metric.label} className="border border-border rounded-theme p-6 bg-card">
            <p className="text-sm text-text-secondary">{metric.label}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
            <p className={`text-sm mt-2 ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="border border-border rounded-theme p-6 bg-card mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-6">Revenue Overview</h2>
        <div className="flex items-end gap-4 h-48">
          {chartData.map((point) => (
            <div key={point.month} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-primary rounded-t-sm transition-all"
                style=\{{ height: `${(point.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-xs text-text-secondary">{point.month}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-text-secondary">Total Revenue (6mo)</p>
            <p className="text-lg font-bold text-foreground">$238,995</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Growth Rate</p>
            <p className="text-lg font-bold text-green-500">+50.9%</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="border border-border rounded-theme bg-card">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
          <button className="text-sm text-primary hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">ID</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Plan</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-bg-secondary transition">
                  <td className="px-6 py-4 text-sm font-mono text-text-secondary">{txn.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{txn.customer}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{txn.plan}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{txn.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      txn.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
