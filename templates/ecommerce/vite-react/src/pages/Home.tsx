import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { name: 'Women', count: 124, color: '#f9a8d4' },
    { name: 'Men', count: 98, color: '#93c5fd' },
    { name: 'Accessories', count: 67, color: '#fcd34d' },
    { name: 'Sale', count: 45, color: '#fca5a5' },
  ];

  const featured = [
    { slug: 'classic-white-sneakers', name: 'Classic White Sneakers', price: '$89.99', color: '#f1f5f9' },
    { slug: 'leather-crossbody-bag', name: 'Leather Crossbody Bag', price: '$129.99', originalPrice: '$159.99', color: '#d4a574' },
    { slug: 'oversized-wool-coat', name: 'Oversized Wool Coat', price: '$249.99', color: '#1e293b' },
    { slug: 'silk-scarf', name: 'Silk Scarf Collection', price: '$59.99', color: '#c4b5fd' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg-secondary">
        <div className="absolute inset-0 opacity-30" style=\{{ background: 'radial-gradient(ellipse at 70% 50%, var(--primary) 0%, transparent 60%)' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
              Welcome to <span className="text-primary">{{projectName}}</span>
            </h1>
            <p className="mt-5 text-lg text-text-secondary leading-relaxed">
              Discover our curated <strong>{{variant}}</strong> collection — where timeless elegance meets modern design.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/products" className="rounded-theme bg-primary px-8 py-3.5 text-white font-medium hover:bg-primary-hover transition">
                Shop Now
              </Link>
              <Link to="/products" className="rounded-theme border border-border px-8 py-3.5 font-medium text-foreground hover:bg-bg-secondary transition">
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} to="/products" className="group relative overflow-hidden rounded-theme border border-border bg-card hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] transition-transform duration-300 group-hover:scale-105" style=\{{ backgroundColor: cat.color, opacity: 0.7 }} />
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
          <Link to="/products" className="text-sm font-medium text-primary hover:underline">View All &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((product) => (
            <Link key={product.slug} to={`/products/${product.slug}`} className="group block border border-border rounded-theme bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-square overflow-hidden">
                <div className="w-full h-full transition-transform duration-300 group-hover:scale-105" style=\{{ backgroundColor: product.color }} />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foreground group-hover:text-primary transition text-sm">{product.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-bold text-foreground">{product.price}</span>
                  {product.originalPrice && <span className="text-sm text-text-secondary line-through">{product.originalPrice}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-foreground">Join the {{projectName}} Community</h2>
          <p className="mt-2 text-text-secondary">Get 10% off your first order when you subscribe.</p>
          <div className="mt-8 flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-theme border border-border bg-card text-foreground placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary" />
            <button className="px-6 py-3 rounded-theme bg-primary text-white font-medium hover:bg-primary-hover transition">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
