import Link from 'next/link';

export default function Home() {
  const categories = [
    { name: 'Women', count: 124, color: '#f9a8d4' },
    { name: 'Men', count: 98, color: '#93c5fd' },
    { name: 'Accessories', count: 67, color: '#fcd34d' },
    { name: 'Sale', count: 45, color: '#fca5a5' },
  ];

  const featuredProducts = [
    { slug: 'classic-white-sneakers', name: 'Classic White Sneakers', price: '$89.99', originalPrice: null, badge: null, color: '#f1f5f9' },
    { slug: 'leather-crossbody-bag', name: 'Leather Crossbody Bag', price: '$129.99', originalPrice: '$159.99', badge: 'Sale', color: '#d4a574' },
    { slug: 'oversized-wool-coat', name: 'Oversized Wool Coat', price: '$249.99', originalPrice: null, badge: 'New', color: '#1e293b' },
    { slug: 'silk-scarf-collection', name: 'Silk Scarf Collection', price: '$59.99', originalPrice: null, badge: null, color: '#c4b5fd' },
  ];

  const testimonials = [
    { name: 'Sarah M.', text: 'Absolutely love the quality. Every piece I have ordered has exceeded my expectations. The attention to detail is remarkable.', rating: 5 },
    { name: 'James K.', text: 'Fast shipping and the packaging is beautiful. It feels like a luxury experience from start to finish. Will definitely order again.', rating: 5 },
    { name: 'Emily R.', text: 'Found my new favorite store. The curated selection makes it so easy to find pieces that work together. Customer service is top-notch.', rating: 4 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-bg-secondary">
        <div className="absolute inset-0 opacity-30" style=\{{ background: 'radial-gradient(ellipse at 70% 50%, var(--primary) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-6">
              New Season Collection
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Welcome to <span className="text-primary">{{projectName}}</span>
            </h1>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              Discover our curated <strong>{{variant}}</strong> collection — where timeless elegance meets modern design. Elevate your everyday with pieces crafted for those who appreciate quality.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-theme bg-primary px-8 py-3.5 text-white font-medium hover:bg-primary-hover transition shadow-lg shadow-primary/25"
              >
                Shop Now
              </Link>
              <Link
                href="/products"
                className="rounded-theme border border-border px-8 py-3.5 font-medium text-foreground hover:bg-bg-secondary transition"
              >
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Shop by Category</h2>
          <p className="mt-2 text-text-secondary">Find exactly what you are looking for</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href="/products"
              className="group relative overflow-hidden rounded-theme border border-border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div
                className="aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                style=\{{ backgroundColor: cat.color, opacity: 0.7 }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 group-hover:bg-black/20 transition">
                <h3 className="text-lg font-bold text-white drop-shadow-md">{cat.name}</h3>
                <p className="text-sm text-white/80 mt-1 drop-shadow-md">{cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-primary hover:text-primary-hover transition">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block border border-border rounded-theme bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <div
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  style=\{{ backgroundColor: product.color }}
                />
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-theme text-white ${product.badge === 'Sale' ? 'bg-red-500' : 'bg-primary'}`}>
                    {product.badge}
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <span className="px-4 py-2 bg-white text-foreground text-sm font-medium rounded-theme opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                    Quick View
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground group-hover:text-primary transition text-sm">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-bold text-foreground">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-text-secondary line-through">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">What Our Customers Say</h2>
            <p className="mt-2 text-text-secondary">Trusted by thousands of happy shoppers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-theme p-6">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= t.rating ? 'text-yellow-400' : 'text-border'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-text-secondary text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold text-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-card">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground">Join the {{projectName}} Community</h2>
          <p className="mt-2 text-text-secondary">Get 10% off your first order when you subscribe to our newsletter.</p>
          <div className="mt-8 flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-theme border border-border bg-background text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-6 py-3 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-xs text-text-secondary">No spam, unsubscribe anytime. We respect your privacy.</p>
        </div>
      </section>
    </div>
  );
}
