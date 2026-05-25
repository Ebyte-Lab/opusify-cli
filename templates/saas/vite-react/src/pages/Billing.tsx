export default function Billing() {
  const plans = [
    { name: 'Starter', price: '$29', features: ['5 users', '10GB storage', 'Basic analytics'], current: false },
    { name: 'Pro', price: '$99', features: ['25 users', '100GB storage', 'Advanced analytics', 'API access'], current: true },
    { name: 'Enterprise', price: '$249', features: ['Unlimited users', '1TB storage', 'Full suite', 'SSO', 'Dedicated support'], current: false },
  ];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Billing</h1>
        <p className="mt-1 text-text-secondary">Manage your subscription</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-theme p-6 ${
              plan.current ? 'border-primary ring-2 ring-primary bg-card' : 'border-border bg-card'
            }`}
          >
            {plan.current && (
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-primary text-white mb-4">
                Current
              </span>
            )}
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="text-3xl font-bold text-foreground mt-2">{plan.price}<span className="text-sm text-text-secondary">/mo</span></p>
            <ul className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="text-primary">&#10003;</span> {f}
                </li>
              ))}
            </ul>
            <button
              className={`w-full mt-6 px-4 py-2 rounded-theme font-medium transition ${
                plan.current ? 'bg-bg-secondary text-text-secondary' : 'bg-primary text-white hover:bg-primary-hover'
              }`}
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Select'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
