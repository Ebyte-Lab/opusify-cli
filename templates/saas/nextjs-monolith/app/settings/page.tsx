export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-text-secondary">Manage your account and application preferences</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Profile Section */}
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
              A
            </div>
            <button className="px-4 py-2 rounded-theme border border-border text-foreground hover:bg-bg-secondary transition text-sm">
              Change Avatar
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
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
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Company</label>
              <input
                type="text"
                defaultValue="Acme Corp"
                className="w-full px-4 py-2 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Timezone</label>
              <select className="w-full px-4 py-2 rounded-theme border border-border bg-background text-foreground">
                <option>UTC-5 (Eastern)</option>
                <option>UTC-6 (Central)</option>
                <option>UTC-8 (Pacific)</option>
                <option>UTC+0 (London)</option>
              </select>
            </div>
          </div>
          <button className="mt-6 px-4 py-2 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
            Save Changes
          </button>
        </div>

        {/* Notifications */}
        <div className="border border-border rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-6">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', description: 'Receive email updates about your account activity', enabled: true },
              { label: 'Push notifications', description: 'Get push notifications in your browser', enabled: true },
              { label: 'Weekly digest', description: 'Receive a weekly summary of your analytics', enabled: false },
              { label: 'Marketing emails', description: 'Receive product updates and announcements', enabled: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-text-secondary">{item.description}</p>
                </div>
                <div className={`w-10 h-6 rounded-full relative cursor-pointer transition ${item.enabled ? 'bg-primary' : 'bg-bg-secondary border border-border'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${item.enabled ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-200 rounded-theme p-6 bg-card">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h2>
          <p className="text-sm text-text-secondary mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="px-4 py-2 rounded-theme bg-red-600 text-white font-medium hover:bg-red-700 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
