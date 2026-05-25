export default function Users() {
  const users = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@acmecorp.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Michael Chen', email: 'mchen@startupxyz.io', role: 'Owner', status: 'Active' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@devteam.co', role: 'Member', status: 'Active' },
    { id: 4, name: 'James Wilson', email: 'jwilson@solodev.me', role: 'Owner', status: 'Inactive' },
    { id: 5, name: 'Priya Patel', email: 'priya@bigco.com', role: 'Admin', status: 'Active' },
    { id: 6, name: 'Alex Thompson', email: 'alex.t@freelance.dev', role: 'Member', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="mt-1 text-text-secondary">Manage your platform users</p>
        </div>
        <button className="px-4 py-2 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
          Invite User
        </button>
      </div>

      <div className="border border-border rounded-theme bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-bg-secondary">
              <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">User</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Role</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-bg-secondary transition">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-text-secondary">{user.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-sm text-primary hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
