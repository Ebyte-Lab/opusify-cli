import Link from 'next/link';

export default function CheckoutPage() {
  const orderItems = [
    { name: 'Classic White Sneakers', quantity: 1, price: 89.99, imageColor: '#f1f5f9' },
    { name: 'Leather Crossbody Bag', quantity: 1, price: 129.99, imageColor: '#d4a574' },
    { name: 'Oversized Wool Coat', quantity: 1, price: 249.99, imageColor: '#1e293b' },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 9.99;
  const tax = 12.50;
  const total = subtotal + shipping + tax;

  const steps = [
    { label: 'Shipping', active: true, completed: false },
    { label: 'Payment', active: false, completed: false },
    { label: 'Review', active: false, completed: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-0">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.active
                      ? 'bg-primary text-white'
                      : step.completed
                        ? 'bg-primary/20 text-primary'
                        : 'bg-bg-secondary text-text-secondary border border-border'
                  }`}>
                    {step.completed ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`text-sm font-medium ${step.active ? 'text-foreground' : 'text-text-secondary'}`}>
                    {step.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-16 lg:w-24 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Form */}
          <div className="flex-1">
            <div className="border border-border rounded-theme bg-card p-6 lg:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">Shipping Information</h2>

              <div className="space-y-5">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Main Street, Apt 4B"
                    className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* City, State, Zip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">City</label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">State</label>
                    <input
                      type="text"
                      placeholder="NY"
                      className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">ZIP Code</label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                  <select className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Phone <span className="text-text-secondary font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Save Address */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary">Save this address for future orders</span>
                </label>
              </div>

              {/* Continue Button */}
              <button className="mt-8 w-full py-3.5 rounded-theme bg-primary text-white font-semibold hover:bg-primary-hover transition shadow-lg shadow-primary/25">
                Continue to Payment
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96">
            <div className="border border-border rounded-theme bg-card p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold text-foreground mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-5">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-theme flex-shrink-0"
                      style=\{{ backgroundColor: item.imageColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-text-secondary">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-foreground">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="border-t border-border pt-5 mb-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 text-sm rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button className="px-4 py-2 text-sm font-medium rounded-theme border border-border text-foreground hover:bg-bg-secondary transition">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="font-medium text-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tax</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border mt-5 pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-5 flex items-center gap-2 text-xs text-text-secondary">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout — your data is encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
