import Link from 'next/link';

export default function CartPage() {
  const cartItems = [
    { name: 'Classic White Sneakers', price: 89.99, quantity: 1, color: 'White', size: '10', imageColor: '#f1f5f9' },
    { name: 'Leather Crossbody Bag', price: 129.99, quantity: 1, color: 'Tan', size: 'One Size', imageColor: '#d4a574' },
    { name: 'Oversized Wool Coat', price: 249.99, quantity: 1, color: 'Charcoal', size: 'M', imageColor: '#1e293b' },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
        <p className="text-text-secondary mb-8">{cartItems.length} items in your cart</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="border border-border rounded-theme bg-card p-6">
              {cartItems.map((item, index) => (
                <div key={index} className={`flex gap-4 py-6 ${index !== 0 ? 'border-t border-border' : ''}`}>
                  {/* Image */}
                  <div
                    className="w-24 h-24 rounded-theme flex-shrink-0"
                    style=\{{ backgroundColor: item.imageColor }}
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-text-secondary mt-1">
                          {item.color} &middot; Size {item.size}
                        </p>
                      </div>
                      {/* Remove Button */}
                      <button className="text-text-secondary hover:text-red-500 transition p-1" aria-label="Remove item">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-theme">
                        <button className="px-3 py-1.5 text-text-secondary hover:text-foreground transition" aria-label="Decrease quantity">
                          &minus;
                        </button>
                        <span className="px-4 py-1.5 text-sm font-medium text-foreground border-x border-border">
                          {item.quantity}
                        </span>
                        <button className="px-3 py-1.5 text-text-secondary hover:text-foreground transition" aria-label="Increase quantity">
                          &#43;
                        </button>
                      </div>
                      <span className="font-semibold text-foreground text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:text-primary-hover transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="border border-border rounded-theme bg-card p-6 lg:sticky lg:top-6">
              <h2 className="text-lg font-semibold text-foreground mb-5">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="text-text-secondary">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Estimated Tax</span>
                  <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-border mt-5 pt-5">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 block w-full py-3.5 rounded-theme bg-primary text-white font-semibold text-center hover:bg-primary-hover transition shadow-lg shadow-primary/25"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="mt-3 block w-full py-3 rounded-theme border border-border text-foreground font-medium text-center hover:bg-bg-secondary transition"
              >
                Continue Shopping
              </Link>

              {/* Payment Methods */}
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs text-text-secondary mb-3">Accepted Payment Methods</p>
                <div className="flex flex-wrap gap-2">
                  {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
                    <span
                      key={method}
                      className="px-3 py-1.5 text-xs font-medium border border-border rounded-theme bg-bg-secondary text-text-secondary"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
