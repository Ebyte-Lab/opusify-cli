export default function Analytics() {
  const trafficSources = [
    { source: 'Organic Search', visitors: 4521, percentage: 38, color: 'bg-blue-500' },
    { source: 'Direct', visitors: 2847, percentage: 24, color: 'bg-green-500' },
    { source: 'Social Media', visitors: 1923, percentage: 16, color: 'bg-purple-500' },
    { source: 'Referral', visitors: 1456, percentage: 12, color: 'bg-orange-500' },
    { source: 'Email', visitors: 1100, percentage: 10, color: 'bg-pink-500' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="mt-1 text-text-secondary">Deep dive into your platform metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="border border-border rounded-theme p-6 bg-card">
          <p className="text-sm text-text-secondary">Total Page Views</p>
          <p className="text-3xl font-bold text-foreground mt-1">284,920</p>
          <p className="text-sm text-green-500 mt-2">+18.3% vs last period</p>
        </div>
        <div className="border border-border rounded-theme p-6 bg-card">
          <p className="text-sm text-text-secondary">Unique Visitors</p>
          <p className="text-3xl font-bold text-foreground mt-1">11,847</p>
          <p className="text-sm text-green-500 mt-2">+9.7% vs last period</p>
        </div>
        <div className="border border-border rounded-theme p-6 bg-card">
          <p className="text-sm text-text-secondary">Conversion Rate</p>
          <p className="text-3xl font-bold text-foreground mt-1">7.1%</p>
          <p className="text-sm text-red-500 mt-2">-0.4% vs last period</p>
        </div>
      </div>

      <div className="border border-border rounded-theme p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-6">Traffic Sources</h2>
        <div className="space-y-4">
          {trafficSources.map((source) => (
            <div key={source.source}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-foreground">{source.source}</span>
                <span className="text-text-secondary">{source.visitors.toLocaleString()} ({source.percentage}%)</span>
              </div>
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${source.color}`}
                  style=\{{ width: `${source.percentage * 2.5}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
