import Link from 'next/link';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const productName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const relatedProducts = [
    { slug: 'cashmere-sweater', name: 'Cashmere V-Neck Sweater', price: '$179.99', color: '#fef3c7' },
    { slug: 'tailored-blazer', name: 'Tailored Linen Blazer', price: '$199.99', color: '#e2e8f0' },
    { slug: 'silk-scarf-collection', name: 'Silk Scarf Collection', price: '$59.99', color: '#c4b5fd' },
    { slug: 'gold-hoop-earrings', name: 'Gold Hoop Earrings', price: '$39.99', color: '#fde68a' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Navy', hex: '#1e3a5f' },
    { name: 'Red', hex: '#dc2626' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-text-secondary mb-8">
          <Link href="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition">Products</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{productName}</span>
        </nav>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div
              className="aspect-square rounded-theme bg-bg-secondary border border-border"
              style=\{{ backgroundColor: '#f1f5f9' }}
            />
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-theme border cursor-pointer transition ${
                    i === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                  }`}
                  style=\{{ backgroundColor: i === 0 ? '#f1f5f9' : i === 1 ? '#e2e8f0' : i === 2 ? '#cbd5e1' : '#94a3b8' }}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{productName}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-yellow-400/50'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-text-secondary">4.5 (128 reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">$99.99</span>
              <span className="text-lg text-text-secondary line-through">$129.99</span>
              <span className="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-600 rounded-theme">-23%</span>
            </div>

            {/* Description */}
            <p className="mt-5 text-text-secondary leading-relaxed">
              Crafted from premium materials with meticulous attention to detail. This piece combines timeless design with modern comfort, making it a versatile addition to any wardrobe.
            </p>

            {/* Color Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Color: <span className="font-normal text-text-secondary">Black</span></h3>
              <div className="flex gap-3">
                {colors.map((c, i) => (
                  <button
                    key={c.name}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      i === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                    }`}
                    style=\{{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Size</h3>
                <button className="text-xs text-primary hover:text-primary-hover transition">Size Guide</button>
              </div>
              <div className="flex gap-2">
                {sizes.map((size, i) => (
                  <button
                    key={size}
                    className={`px-4 py-2.5 text-sm font-medium rounded-theme border transition ${
                      i === 2
                        ? 'border-primary bg-primary text-white'
                        : 'border-border text-foreground hover:border-primary hover:text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Quantity</h3>
              <div className="inline-flex items-center border border-border rounded-theme">
                <button className="px-4 py-2.5 text-text-secondary hover:text-foreground transition" aria-label="Decrease quantity">
                  &minus;
                </button>
                <span className="px-5 py-2.5 font-medium text-foreground border-x border-border">1</span>
                <button className="px-4 py-2.5 text-text-secondary hover:text-foreground transition" aria-label="Increase quantity">
                  &#43;
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="mt-8 w-full py-4 rounded-theme bg-primary text-white font-semibold text-lg hover:bg-primary-hover transition shadow-lg shadow-primary/25">
              Add to Cart
            </button>

            {/* Wishlist */}
            <button className="mt-3 w-full py-3 rounded-theme border border-border text-foreground font-medium hover:bg-bg-secondary transition flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Add to Wishlist
            </button>

            {/* Accordion Sections */}
            <div className="mt-8 border-t border-border divide-y divide-border">
              {/* Description */}
              <details className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-foreground">Description</span>
                  <svg className="w-4 h-4 text-text-secondary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-text-secondary leading-relaxed">
                  Made from carefully sourced materials, this product features reinforced stitching, premium hardware, and a refined silhouette. The versatile design transitions seamlessly from casual to formal settings. Machine washable for easy care.
                </p>
              </details>

              {/* Shipping */}
              <details className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-foreground">Shipping Info</span>
                  <svg className="w-4 h-4 text-text-secondary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-3 text-sm text-text-secondary leading-relaxed space-y-2">
                  <p>Free standard shipping on orders over $100.</p>
                  <p>Standard delivery: 5–7 business days.</p>
                  <p>Express delivery: 2–3 business days ($12.99).</p>
                  <p>International shipping available to select countries.</p>
                </div>
              </details>

              {/* Returns */}
              <details className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer">
                  <span className="font-medium text-foreground">Returns</span>
                  <svg className="w-4 h-4 text-text-secondary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-3 text-sm text-text-secondary leading-relaxed space-y-2">
                  <p>30-day return policy for unworn items with tags attached.</p>
                  <p>Free returns on all domestic orders.</p>
                  <p>Exchanges available for different sizes or colors.</p>
                  <p>Refunds processed within 5–7 business days.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20 pb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((product) => (
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
                  <span className="mt-2 block font-bold text-foreground">{product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
