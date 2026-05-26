import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { slug } = useParams();
  const productName = (slug || 'product').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

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
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition">Products</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-theme bg-bg-secondary border border-border" />
            <div className="grid grid-cols-4 gap-3 mt-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`aspect-square rounded-theme border cursor-pointer transition ${i === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`} style=\{{ backgroundColor: i === 0 ? '#f1f5f9' : i === 1 ? '#e2e8f0' : i === 2 ? '#cbd5e1' : '#94a3b8' }} />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{productName}</h1>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-4 h-4 ${star <= 4 ? 'text-yellow-400' : 'text-yellow-400/50'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-text-secondary">4.5 (128 reviews)</span>
            </div>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-foreground">$99.99</span>
              <span className="text-lg text-text-secondary line-through">$129.99</span>
            </div>

            <p className="mt-5 text-text-secondary leading-relaxed">
              Crafted from premium materials with meticulous attention to detail. This piece combines timeless design with modern comfort.
            </p>

            {/* Colors */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Color</h3>
              <div className="flex gap-3">
                {colors.map((c, i) => (
                  <button key={c.name} className={`w-8 h-8 rounded-full border-2 transition ${i === 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'}`} style=\{{ backgroundColor: c.hex }} aria-label={c.name} />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Size</h3>
              <div className="flex gap-2">
                {sizes.map((size, i) => (
                  <button key={size} className={`px-4 py-2.5 text-sm font-medium rounded-theme border transition ${i === 2 ? 'border-primary bg-primary text-white' : 'border-border text-foreground hover:border-primary'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">Quantity</h3>
              <div className="inline-flex items-center border border-border rounded-theme">
                <button className="px-4 py-2.5 text-text-secondary hover:text-foreground transition">&minus;</button>
                <span className="px-5 py-2.5 font-medium text-foreground border-x border-border">1</span>
                <button className="px-4 py-2.5 text-text-secondary hover:text-foreground transition">&#43;</button>
              </div>
            </div>

            <button className="mt-8 w-full py-4 rounded-theme bg-primary text-white font-semibold text-lg hover:bg-primary-hover transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
