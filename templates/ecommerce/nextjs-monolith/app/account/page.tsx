import Link from 'next/link';

export default function AccountPage() {
  const orders = [
    { id: 'ORD-2024-001', date: 'Jun 15, 2024', items: 3, total: '$469.97', status: 'Delivered' },
    { id: 'ORD-2024-002', date: 'Jun 2, 2024', items: 1, total: '$89.99', status: 'Delivered' },
    { id: 'ORD-2024-003', date: 'May 18, 2024', items: 2, total: '$189.98', status: 'Delivered' },
    { id: 'ORD-2024-004', date: 'May 5, 2024', items: 1, total: '$249.99', status: 'Returned' },
  ];

  const addresses = [
    { label: 'Home', name: 'John Doe', address: '123 Main Street, Apt 4B', city: 'New York, NY 10001', default: true },
    { label: 'Office', name: 'John Doe', address: '456 Business Ave, Floor 12', city: 'New York, NY 10018', default: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
        <p className="text-text-secondary mb-10">Manage your profile, orders, and preferences</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-border rounded-theme bg-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-foreground">John Doe</p>
                  <p className="text-sm text-text-secondary">john@example.com</p>
                </div>
              </div>
              <nav>
                <ul className="space-y-1">
                  {['Orders', 'Addresses', 'Payment Methods', 'Wishlist', 'Settings'].map((item, i) => (
                    <li key={item}>
                      <button className={`w-full text-left px-4 py-2.5 rounded-theme text-sm transition ${i === 0 ? 'bg-primary text-white font-medium' : 'text-text-secondary hover:bg-bg-secondary hover:text-foreground'}`}>
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
              <button className="mt-6 w-full py-2 text-sm text-text-secondary border border-border rounded-theme hover:bg-bg-secondary transition">
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <div className="border border-border rounded-theme bg-card">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Recent Orders</h2>
                <button className="text-sm text-primary hover:underline">View All</button>
              </div>
              <div className="divide-y divide-border">
                {orders.map((order) => (
                  <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{order.id}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{order.date} &middot; {order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{order.total}</p>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full mt-1 ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Addresses */}
            <div className="border border-border rounded-theme bg-card">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Saved Addresses</h2>
                <button className="text-sm text-primary hover:underline">Add New</button>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.label} className={`border rounded-theme p-4 ${addr.default ? 'border-primary' : 'border-border'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground">{addr.label}</span>
                      {addr.default && (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground">{addr.name}</p>
                    <p className="text-sm text-text-secondary">{addr.address}</p>
                    <p className="text-sm text-text-secondary">{addr.city}</p>
                    <div className="mt-3 flex gap-3">
                      <button className="text-xs text-primary hover:underline">Edit</button>
                      <button className="text-xs text-text-secondary hover:text-red-500">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Settings */}
            <div className="border border-border rounded-theme bg-card p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">Account Settings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                  <input type="text" defaultValue="John" className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <button className="mt-6 px-6 py-2.5 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
