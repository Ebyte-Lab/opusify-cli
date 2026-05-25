export default function BillingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['Up to 5 users', '10GB storage', 'Basic analytics', 'Email support'],
      current: false,
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      features: ['Up to 25 users', '100GB storage', 'Advanced analytics', 'Priority support', 'API access', 'Custom integrations'],
      current: true,
    },
    {
      name: 'Enterprise',
      price: '$2,400',
      period: '/year',
      features: ['Unlimited users', '1TB storage', 'Full analytics suite', 'Dedicated support', 'SSO & SAML', 'Custom SLA', 'On-premise option'],
      current: false,
    },
  ];

  const invoices = [
    { id: 'INV-2024-006', date: 'Jun 1, 2024', amount: '$99.00', status: 'Paid' },
    { id: 'INV-2024-005', date: 'May 1, 2024', amount: '$99.00', status: 'Paid' },
    { id: 'INV-2024-004', date: 'Apr 1, 2024', amount: '$99.00', status: 'Paid' },
    { id: 'INV-2024-003', date: 'Mar 1, 2024', amount: '$99.00', status: 'Paid' },
    { id: 'INV-2024-002', date: 'Feb 1, 2024', amount: '$99.00', status: 'Paid' },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Billing</h1>
        <p className="mt-1 text-text-secondary">Manage your subscription and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="border border-border rounded-theme p-6 bg-card mb-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Current Plan</p>
            <p className="text-2xl font-bold text-foreground mt-1">Pro Plan</p>
            <p className="text-text-secondary mt-1">$99/month &middot; Renews on Jul 1, 2024</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-theme border border-border text-foreground hover:bg-bg-secondary transition">
              Cancel Plan
            </button>
            <button className="px-4 py-2 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
              Upgrade
            </button>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-text-secondary">Storage used</span>
            <span className="text-foreground">67GB / 100GB</span>
          </div>
          <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style=\{{ width: '67%' }} />
          </div>
        </div>
      </div>

      {/* Plans Comparison */}
      <h2 className="text-xl font-semibold text-foreground mb-6">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-theme p-6 ${
              plan.current ? 'border-primary bg-card ring-2 ring-primary' : 'border-border bg-card'
            }`}
          >
            {plan.current && (
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary text-white mb-4">
                Current Plan
              </span>
            )}
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-foreground">{plan.price}</span>
              <span className="text-text-secondary">{plan.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="text-primary">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-6 px-4 py-2 rounded-theme font-medium transition ${
                plan.current
                  ? 'bg-bg-secondary text-text-secondary cursor-default'
                  : 'bg-primary text-white hover:bg-primary-hover'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Invoice History */}
      <div className="border border-border rounded-theme bg-card">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Invoice History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Invoice</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Amount</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Status</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-secondary uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-bg-secondary transition">
                  <td className="px-6 py-4 text-sm font-mono text-foreground">{inv.id}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{inv.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-primary hover:underline">Download</button>
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
