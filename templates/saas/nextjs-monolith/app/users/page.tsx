export default function UsersPage() {
  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@acmecorp.com', role: 'Admin', plan: 'Enterprise', status: 'Active', lastSeen: '2 min ago' },
    { id: 2, name: 'Michael Chen', email: 'mchen@startupxyz.io', role: 'Owner', plan: 'Pro', status: 'Active', lastSeen: '15 min ago' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@devteam.co', role: 'Member', plan: 'Enterprise', status: 'Active', lastSeen: '1 hour ago' },
    { id: 4, name: 'James Wilson', email: 'jwilson@solodev.me', role: 'Owner', plan: 'Starter', status: 'Active', lastSeen: '3 hours ago' },
    { id: 5, name: 'Priya Patel', email: 'priya@bigco.com', role: 'Admin', plan: 'Enterprise', status: 'Inactive', lastSeen: '2 days ago' },
    { id: 6, name: 'Alex Thompson', email: 'alex.t@freelance.dev', role: 'Owner', plan: 'Pro', status: 'Active', lastSeen: '5 hours ago' },
    { id: 7, name: 'Lisa Wang', email: 'lwang@techfirm.io', role: 'Member', plan: 'Pro', status: 'Suspended', lastSeen: '1 week ago' },
    { id: 8, name: 'David Kim', email: 'dkim@agency.co', role: 'Owner', plan: 'Enterprise', status: 'Active', lastSeen: '30 min ago' },
  ];

  const stats = [
    { label: 'Total Users', value: '12,847' },
    { label: 'Active Now', value: '1,234' },
    { label: 'New This Week', value: '89' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="mt-1 text-text-secondary">Manage your platform users and permissions</p>
        </div>
        <button className="px-4 py-2 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
          Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border rounded-theme p-4 bg-card">
            <p className="text-sm text-text-secondary">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="flex-1 px-4 py-2 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <select className="px-4 py-2 rounded-theme border border-border bg-card text-foreground">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Owner</option>
          <option>Member</option>
        </select>
        <select className="px-4 py-2 rounded-theme border border-border bg-card text-foreground">
          <option>All Plans</option>
          <option>Enterprise</option>
          <option>Pro</option>
          <option>Starter</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="border border-border rounded-theme bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">User</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Role</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Plan</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Last Seen</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-bg-secondary transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-medium">
                        {user.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-bg-secondary text-foreground">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' :
                      user.status === 'Inactive' ? 'bg-gray-100 text-gray-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{user.lastSeen}</td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-primary hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
