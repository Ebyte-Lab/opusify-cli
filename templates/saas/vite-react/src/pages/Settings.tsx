export default function Settings() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-text-secondary">Manage your account preferences</p>
      </div>

      <div className="max-w-2xl space-y-8">
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
              <input
                type="text"
                defaultValue="Admin User"
                className="w-full px-4 py-2 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <input
                type="email"
                defaultValue="admin@company.com"
                className="w-full px-4 py-2 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <button className="mt-6 px-4 py-2 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
            Save Changes
          </button>
        </div>

        <div className="border border-red-200 rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-text-secondary mb-4">Permanently delete your account and all data.</p>
          <button className="px-4 py-2 rounded-theme bg-red-600 text-white font-medium hover:bg-red-700 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
