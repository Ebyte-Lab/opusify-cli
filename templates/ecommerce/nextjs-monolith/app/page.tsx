import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Welcome to <span className="text-primary">{{projectName}}</span>
        </h1>
        <p className="mt-4 text-xl text-text-secondary max-w-2xl mx-auto">
          Your <strong>{{variant}}</strong> store, powered by Next.js 14 and scaffolded by Opusify CLI.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/products"
            className="rounded-theme bg-primary px-8 py-3 text-white font-medium hover:bg-primary-hover transition"
          >
            Browse Products
          </Link>
          <Link
            href="/cart"
            className="rounded-theme border border-border px-8 py-3 font-medium text-foreground hover:bg-bg-secondary transition"
          >
            View Cart
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-foreground mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-theme p-6 bg-card hover:shadow-lg transition">
              <div className="h-48 bg-bg-secondary rounded-theme mb-4" />
              <h3 className="font-semibold text-foreground">Product {i}</h3>
              <p className="text-text-secondary mt-1">$29.99</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
