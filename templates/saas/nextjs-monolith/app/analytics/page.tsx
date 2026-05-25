export default function AnalyticsPage() {
  const trafficSources = [
    { source: 'Organic Search', visitors: 4521, percentage: 38, color: 'bg-blue-500' },
    { source: 'Direct', visitors: 2847, percentage: 24, color: 'bg-green-500' },
    { source: 'Social Media', visitors: 1923, percentage: 16, color: 'bg-purple-500' },
    { source: 'Referral', visitors: 1456, percentage: 12, color: 'bg-orange-500' },
    { source: 'Email', visitors: 1100, percentage: 10, color: 'bg-pink-500' },
  ];

  const pageViews = [
    { page: '/dashboard', views: 12450, avgTime: '3m 24s', bounceRate: '18%' },
    { page: '/analytics', views: 8920, avgTime: '5m 12s', bounceRate: '12%' },
    { page: '/users', views: 6340, avgTime: '2m 48s', bounceRate: '24%' },
    { page: '/billing', views: 4210, avgTime: '4m 06s', bounceRate: '15%' },
    { page: '/settings', views: 3180, avgTime: '1m 52s', bounceRate: '32%' },
    { page: '/integrations', views: 2890, avgTime: '6m 30s', bounceRate: '8%' },
  ];

  const conversionFunnel = [
    { stage: 'Visitors', count: 45000, width: '100%' },
    { stage: 'Sign Ups', count: 12800, width: '72%' },
    { stage: 'Activated', count: 8400, width: '48%' },
    { stage: 'Subscribed', count: 3200, width: '28%' },
    { stage: 'Enterprise', count: 420, width: '12%' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="mt-1 text-text-secondary">Deep dive into your platform metrics</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm rounded-theme bg-bg-secondary text-text-secondary hover:text-foreground transition">7 Days</button>
          <button className="px-4 py-2 text-sm rounded-theme bg-primary text-white">30 Days</button>
          <button className="px-4 py-2 text-sm rounded-theme bg-bg-secondary text-text-secondary hover:text-foreground transition">90 Days</button>
        </div>
      </div>

      {/* Summary Row */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Traffic Sources */}
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

        {/* Conversion Funnel */}
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Conversion Funnel</h2>
          <div className="space-y-3">
            {conversionFunnel.map((stage) => (
              <div key={stage.stage} className="flex items-center gap-4">
                <div className="w-24 text-sm text-text-secondary">{stage.stage}</div>
                <div className="flex-1">
                  <div
                    className="h-8 bg-primary rounded-theme flex items-center px-3 transition-all"
                    style=\{{ width: stage.width }}
                  >
                    <span className="text-xs text-white font-medium">{stage.count.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="border border-border rounded-theme bg-card">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Top Pages</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Page</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Views</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Avg. Time</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Bounce Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pageViews.map((page) => (
                <tr key={page.page} className="hover:bg-bg-secondary transition">
                  <td className="px-6 py-4 text-sm font-mono text-primary">{page.page}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{page.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{page.avgTime}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{page.bounceRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
