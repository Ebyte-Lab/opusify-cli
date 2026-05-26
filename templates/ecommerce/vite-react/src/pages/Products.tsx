import { Link } from 'react-router-dom';

export default function Products() {
  const products = [
    { slug: 'classic-white-sneakers', name: 'Classic White Sneakers', price: '$89.99', color: '#f1f5f9' },
    { slug: 'leather-crossbody-bag', name: 'Leather Crossbody Bag', price: '$129.99', originalPrice: '$159.99', badge: 'Sale', color: '#d4a574' },
    { slug: 'oversized-wool-coat', name: 'Oversized Wool Coat', price: '$249.99', badge: 'New', color: '#1e293b' },
    { slug: 'silk-scarf', name: 'Silk Scarf Collection', price: '$59.99', color: '#c4b5fd' },
    { slug: 'cashmere-sweater', name: 'Cashmere V-Neck Sweater', price: '$179.99', originalPrice: '$219.99', badge: 'Sale', color: '#fef3c7' },
    { slug: 'tailored-blazer', name: 'Tailored Linen Blazer', price: '$199.99', badge: 'New', color: '#e2e8f0' },
    { slug: 'canvas-tote', name: 'Canvas Tote Bag', price: '$49.99', color: '#d6d3d1' },
    { slug: 'gold-earrings', name: 'Gold Hoop Earrings', price: '$39.99', color: '#fde68a' },
    { slug: 'chelsea-boots', name: 'Leather Chelsea Boots', price: '$189.99', badge: 'New', color: '#292524' },
  ];

  const categories = ['Clothing', 'Shoes', 'Bags', 'Accessories'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">All Products</h1>
          <p className="mt-1 text-text-secondary">Showing {products.length} products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="border border-border rounded-theme bg-card p-5 lg:sticky lg:top-6">
              <h3 className="font-semibold text-foreground text-sm mb-3">Category</h3>
              <div className="space-y-2.5 mb-6">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-foreground transition">{cat}</span>
                  </label>
                ))}
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-3">Sort By</h3>
              <select className="w-full px-3 py-2 text-sm rounded-theme border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((product) => (
                <Link key={product.slug} to={`/products/${product.slug}`} className="group block border border-border rounded-theme bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <div className="w-full h-full transition-transform duration-300 group-hover:scale-105" style=\{{ backgroundColor: product.color }} />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-theme text-white ${product.badge === 'Sale' ? 'bg-red-500' : 'bg-primary'}`}>
                        {product.badge}
                      </span>
                    )}
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
          </div>
        </div>
      </div>
    </div>
  );
}
