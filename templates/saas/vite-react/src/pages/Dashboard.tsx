export default function Dashboard() {
  const metrics = [
    { label: 'Monthly Revenue', value: '$48,295', change: '+12.5%', positive: true },
    { label: 'Active Users', value: '12,847', change: '+8.2%', positive: true },
    { label: 'Churn Rate', value: '2.4%', change: '-0.3%', positive: true },
    { label: 'Avg. Session', value: '4m 32s', change: '-12s', positive: false },
  ];

  const chartData = [
    { month: 'Jan', revenue: 32000 },
    { month: 'Feb', revenue: 35000 },
    { month: 'Mar', revenue: 38500 },
    { month: 'Apr', revenue: 41000 },
    { month: 'May', revenue: 44200 },
    { month: 'Jun', revenue: 48295 },
  ];

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue));

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to <span className="text-primary">{{projectName}}</span>
        </h1>
        <p className="mt-2 text-text-secondary text-lg">
          Your <strong>{{variant}}</strong> dashboard — real-time metrics at a glance.
        </p>
      </div>

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

      <div className="border border-border rounded-theme p-6 bg-card">
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
      </div>
    </div>
  );
}
