import Link from 'next/link';

const products = [
  { slug: 'product-1', name: 'Classic T-Shirt', price: '$29.99' },
  { slug: 'product-2', name: 'Denim Jacket', price: '$89.99' },
  { slug: 'product-3', name: 'Running Shoes', price: '$119.99' },
  { slug: 'product-4', name: 'Leather Bag', price: '$149.99' },
  { slug: 'product-5', name: 'Sunglasses', price: '$59.99' },
  { slug: 'product-6', name: 'Watch', price: '$199.99' },
];

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="border border-border rounded-theme p-6 bg-card hover:shadow-lg transition block"
          >
            <div className="h-48 bg-bg-secondary rounded-theme mb-4" />
            <h2 className="font-semibold text-foreground">{product.name}</h2>
            <p className="text-primary font-bold mt-1">{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
