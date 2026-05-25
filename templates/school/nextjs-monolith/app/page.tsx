export default function Dashboard() {
  const stats = [
    { label: 'Total Students', value: '2,847', change: '+12%' },
    { label: 'Active Courses', value: '156', change: '+3%' },
    { label: 'Attendance Rate', value: '94.2%', change: '+1.5%' },
    { label: 'Upcoming Exams', value: '23', change: 'This week' },
  ];

  const recentActivity = [
    { id: 1, text: 'Sarah Johnson submitted Assignment 3 for Advanced Mathematics', time: '2 min ago' },
    { id: 2, text: 'New student enrollment: Michael Chen (Grade 10)', time: '15 min ago' },
    { id: 3, text: 'Dr. Williams posted grades for Physics 101 midterm', time: '1 hour ago' },
    { id: 4, text: 'Attendance alert: 5 students absent from Period 3', time: '2 hours ago' },
    { id: 5, text: 'Course schedule updated for Spring semester', time: '3 hours ago' },
    { id: 6, text: 'Parent-teacher conference scheduled for next Friday', time: '5 hours ago' },
  ];

  const quickActions = [
    { label: 'Add Student', description: 'Register a new student' },
    { label: 'Create Course', description: 'Set up a new course' },
    { label: 'Take Attendance', description: 'Mark today\'s attendance' },
    { label: 'Generate Report', description: 'Export data reports' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome to <span className="text-primary">{{projectName}}</span>
        </h1>
        <p className="mt-2 text-text-secondary text-lg">
          Your <strong>{{variant}}</strong> dashboard — here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border rounded-theme p-6 bg-card"
          >
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
            <p className="text-sm text-primary mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="border border-border rounded-theme bg-card divide-y divide-border">
            {recentActivity.map((item) => (
              <div key={item.id} className="px-6 py-4 flex items-start justify-between gap-4">
                <p className="text-foreground text-sm">{item.text}</p>
                <span className="text-xs text-text-secondary whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="w-full text-left border border-border rounded-theme p-4 bg-card hover:bg-bg-secondary transition"
              >
                <p className="font-medium text-foreground">{action.label}</p>
                <p className="text-sm text-text-secondary mt-1">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
