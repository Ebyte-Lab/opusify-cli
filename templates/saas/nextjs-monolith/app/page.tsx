import SparkLine from '../components/SparkLine';
import LineChart from '../components/LineChart';
import DonutChart from '../components/DonutChart';
import BarChart from '../components/BarChart';

export default function Dashboard() {
  const metrics = [
    { label: 'Monthly Revenue', value: '$48,295', change: '+12.5%', positive: true, sparkData: [32, 35, 38, 41, 44, 48] },
    { label: 'Active Users', value: '12,847', change: '+8.2%', positive: true, sparkData: [8, 9, 9.8, 10.5, 11.3, 12.8] },
    { label: 'Churn Rate', value: '2.4%', change: '-0.3%', positive: true, sparkData: [3.2, 2.9, 2.8, 2.7, 2.5, 2.4], color: '#ef4444' },
    { label: 'Avg. Session', value: '4m 32s', change: '-12s', positive: false, sparkData: [4.1, 4.3, 4.5, 4.4, 4.6, 4.5] },
  ];

  const revenueData = [
    { label: 'Jan', value: 28400 },
    { label: 'Feb', value: 31200 },
    { label: 'Mar', value: 29800 },
    { label: 'Apr', value: 35600 },
    { label: 'May', value: 33100 },
    { label: 'Jun', value: 38500 },
    { label: 'Jul', value: 36200 },
    { label: 'Aug', value: 41000 },
    { label: 'Sep', value: 39400 },
    { label: 'Oct', value: 44200 },
    { label: 'Nov', value: 46100 },
    { label: 'Dec', value: 48295 },
  ];

  const revenueBySource = [
    { label: 'Direct', value: 38, color: 'var(--primary)' },
    { label: 'Organic', value: 28, color: '#10b981' },
    { label: 'Referral', value: 18, color: '#f59e0b' },
    { label: 'Social', value: 16, color: '#8b5cf6' },
  ];

  const monthlyUsers = [
    { label: 'Jul', value: 8400 },
    { label: 'Aug', value: 9200 },
    { label: 'Sep', value: 9800 },
    { label: 'Oct', value: 10500 },
    { label: 'Nov', value: 11300 },
    { label: 'Dec', value: 12847 },
  ];

  const recentTransactions = [
    { id: 'TXN-001', customer: 'Acme Corp', plan: 'Enterprise', amount: '$2,400', status: 'Completed', date: 'Today' },
    { id: 'TXN-002', customer: 'StartupXYZ', plan: 'Pro', amount: '$99', status: 'Completed', date: 'Today' },
    { id: 'TXN-003', customer: 'DevTeam Inc', plan: 'Enterprise', amount: '$2,400', status: 'Pending', date: 'Yesterday' },
    { id: 'TXN-004', customer: 'Solo Dev', plan: 'Starter', amount: '$29', status: 'Completed', date: 'Yesterday' },
    { id: 'TXN-005', customer: 'BigCo Ltd', plan: 'Enterprise', amount: '$2,400', status: 'Failed', date: '2 days ago' },
  ];

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
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-secondary">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
              </div>
              <SparkLine data={metric.sparkData} color={metric.color} />
            </div>
            <p className={`text-sm mt-3 ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="border border-border rounded-theme p-6 bg-card mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Revenue Overview</h2>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-xs rounded-theme bg-bg-secondary text-text-secondary hover:text-foreground transition">7D</button>
            <button className="px-3 py-1.5 text-xs rounded-theme bg-bg-secondary text-text-secondary hover:text-foreground transition">30D</button>
            <button className="px-3 py-1.5 text-xs rounded-theme bg-bg-secondary text-text-secondary hover:text-foreground transition">90D</button>
            <button className="px-3 py-1.5 text-xs rounded-theme bg-primary text-white">12M</button>
          </div>
        </div>
        <LineChart data={revenueData} height={220} />
        <div className="flex justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-text-secondary">Total Revenue (12mo)</p>
            <p className="text-lg font-bold text-foreground">$451,795</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Growth Rate</p>
            <p className="text-lg font-bold text-green-500">+70.1%</p>
          </div>
        </div>
      </div>

      {/* Two-column: Donut + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Revenue by Source</h2>
          <DonutChart segments={revenueBySource} />
        </div>
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Monthly Active Users</h2>
          <BarChart data={monthlyUsers} height={180} />
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
