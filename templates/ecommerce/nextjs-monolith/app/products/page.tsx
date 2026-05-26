import Link from 'next/link';

export default function ProductsPage() {
  const products = [
    { slug: 'classic-white-sneakers', name: 'Classic White Sneakers', price: '$89.99', originalPrice: null, badge: null, color: '#f1f5f9' },
    { slug: 'leather-crossbody-bag', name: 'Leather Crossbody Bag', price: '$129.99', originalPrice: '$159.99', badge: 'Sale', color: '#d4a574' },
    { slug: 'oversized-wool-coat', name: 'Oversized Wool Coat', price: '$249.99', originalPrice: null, badge: 'New', color: '#1e293b' },
    { slug: 'silk-scarf-collection', name: 'Silk Scarf Collection', price: '$59.99', originalPrice: null, badge: null, color: '#c4b5fd' },
    { slug: 'cashmere-sweater', name: 'Cashmere V-Neck Sweater', price: '$179.99', originalPrice: '$219.99', badge: 'Sale', color: '#fef3c7' },
    { slug: 'tailored-blazer', name: 'Tailored Linen Blazer', price: '$199.99', originalPrice: null, badge: 'New', color: '#e2e8f0' },
    { slug: 'canvas-tote-bag', name: 'Canvas Tote Bag', price: '$49.99', originalPrice: null, badge: null, color: '#d6d3d1' },
    { slug: 'gold-hoop-earrings', name: 'Gold Hoop Earrings', price: '$39.99', originalPrice: null, badge: null, color: '#fde68a' },
    { slug: 'leather-chelsea-boots', name: 'Leather Chelsea Boots', price: '$189.99', originalPrice: null, badge: 'New', color: '#292524' },
    { slug: 'merino-wool-beanie', name: 'Merino Wool Beanie', price: '$34.99', originalPrice: '$44.99', badge: 'Sale', color: '#7c3aed' },
    { slug: 'linen-wide-leg-pants', name: 'Linen Wide-Leg Pants', price: '$109.99', originalPrice: null, badge: null, color: '#f5f5f4' },
    { slug: 'structured-leather-belt', name: 'Structured Leather Belt', price: '$69.99', originalPrice: null, badge: null, color: '#78350f' },
  ];

  const categories = ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'];
  const priceRanges = ['$0 – $50', '$50 – $100', '$100 – $200', '$200+'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Products</h1>
          <p className="mt-1 text-text-secondary">Showing 12 products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="border border-border rounded-theme bg-card p-5 sticky top-6">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground text-sm mb-3">Category</h3>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary group-hover:text-foreground transition">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground text-sm mb-3">Price Range</h3>
                <div className="space-y-2.5">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        className="w-4 h-4 border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary group-hover:text-foreground transition">
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground text-sm mb-3">Sort By</h3>
                <select className="w-full px-3 py-2 text-sm rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Selling</option>
                </select>
              </div>

              {/* Clear */}
              <button className="w-full py-2 text-sm font-medium text-text-secondary hover:text-foreground border border-border rounded-theme hover:bg-bg-secondary transition">
                Clear Filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((product) => (
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

            {/* Pagination */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <button className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-theme hover:bg-bg-secondary transition">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-theme">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-theme hover:bg-bg-secondary transition">
                2
              </button>
              <button className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-theme hover:bg-bg-secondary transition">
                3
              </button>
              <button className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-theme hover:bg-bg-secondary transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
