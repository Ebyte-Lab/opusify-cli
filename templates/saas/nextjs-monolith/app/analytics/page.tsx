import SparkLine from '../../components/SparkLine';
import LineChart from '../../components/LineChart';
import DonutChart from '../../components/DonutChart';
import BarChart from '../../components/BarChart';

export default function AnalyticsPage() {
  const summaryMetrics = [
    { label: 'Total Page Views', value: '284,920', change: '+18.3%', positive: true, sparkData: [180, 210, 195, 230, 255, 270, 285] },
    { label: 'Unique Visitors', value: '11,847', change: '+9.7%', positive: true, sparkData: [7.2, 8.1, 8.8, 9.5, 10.2, 11.0, 11.8] },
    { label: 'Conversion Rate', value: '7.1%', change: '-0.4%', positive: false, sparkData: [7.8, 7.6, 7.5, 7.3, 7.2, 7.0, 7.1], color: '#ef4444' },
  ];

  const trafficData = [
    { label: '1', value: 8200 },
    { label: '2', value: 7800 },
    { label: '3', value: 9100 },
    { label: '4', value: 8600 },
    { label: '5', value: 9400 },
    { label: '6', value: 10200 },
    { label: '7', value: 9800 },
    { label: '8', value: 8900 },
    { label: '9', value: 9600 },
    { label: '10', value: 10800 },
    { label: '11', value: 11200 },
    { label: '12', value: 10500 },
    { label: '13', value: 9900 },
    { label: '14', value: 10100 },
    { label: '15', value: 11400 },
    { label: '16', value: 12100 },
    { label: '17', value: 11800 },
    { label: '18', value: 10900 },
    { label: '19', value: 11500 },
    { label: '20', value: 12400 },
    { label: '21', value: 11900 },
    { label: '22', value: 10600 },
    { label: '23', value: 11100 },
    { label: '24', value: 12800 },
    { label: '25', value: 13200 },
    { label: '26', value: 12600 },
    { label: '27', value: 11800 },
    { label: '28', value: 12300 },
    { label: '29', value: 13500 },
    { label: '30', value: 14100 },
  ];

  const trafficSources = [
    { label: 'Organic', value: 38, color: 'var(--primary)' },
    { label: 'Direct', value: 24, color: '#10b981' },
    { label: 'Social', value: 16, color: '#8b5cf6' },
    { label: 'Referral', value: 12, color: '#f59e0b' },
    { label: 'Email', value: 10, color: '#ec4899' },
  ];

  const topPages = [
    { label: 'Dashboard', value: 12450 },
    { label: 'Analytics', value: 8920 },
    { label: 'Users', value: 6340 },
    { label: 'Billing', value: 4210 },
    { label: 'Settings', value: 3180 },
  ];

  const conversionFunnel = [
    { stage: 'Visitors', count: 45000, percentage: 100 },
    { stage: 'Sign Ups', count: 12800, percentage: 72 },
    { stage: 'Activated', count: 8400, percentage: 48 },
    { stage: 'Subscribed', count: 3200, percentage: 28 },
    { stage: 'Enterprise', count: 420, percentage: 12 },
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

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {summaryMetrics.map((metric) => (
          <div key={metric.label} className="border border-border rounded-theme p-6 bg-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-text-secondary">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{metric.value}</p>
              </div>
              <SparkLine data={metric.sparkData} color={metric.color} />
            </div>
            <p className={`text-sm mt-3 ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
              {metric.change} vs last period
            </p>
          </div>
        ))}
      </div>

      {/* Traffic Over Time */}
      <div className="border border-border rounded-theme p-6 bg-card mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-6">Traffic Over Time</h2>
        <LineChart data={trafficData} height={220} />
        <div className="flex justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-sm text-text-secondary">Total Views (30d)</p>
            <p className="text-lg font-bold text-foreground">284,920</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Daily Average</p>
            <p className="text-lg font-bold text-foreground">9,497</p>
          </div>
          <div>
            <p className="text-sm text-text-secondary">Peak Day</p>
            <p className="text-lg font-bold text-green-500">14,100</p>
          </div>
        </div>
      </div>

      {/* Two-column: Donut + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Traffic Sources</h2>
          <DonutChart segments={trafficSources} />
        </div>
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Top Pages</h2>
          <BarChart data={topPages} height={180} />
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="border border-border rounded-theme p-6 bg-card">
        <h2 className="text-lg font-semibold text-foreground mb-6">Conversion Funnel</h2>
        <div className="space-y-3">
          {conversionFunnel.map((stage) => (
            <div key={stage.stage} className="flex items-center gap-4">
              <div className="w-24 text-sm text-text-secondary flex-shrink-0">{stage.stage}</div>
              <div className="flex-1">
                <div
                  className="h-9 rounded-theme flex items-center px-3 transition-all"
                  style=\{{ width: `${stage.percentage}%`, backgroundColor: 'var(--primary)', opacity: 0.15 + (stage.percentage / 100) * 0.85 }}
                >
                  <span className="text-xs font-medium text-foreground">{stage.count.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-12 text-right text-sm font-medium text-text-secondary">{stage.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
