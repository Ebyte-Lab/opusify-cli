import Link from 'next/link';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/products"
        className="text-primary hover:underline mb-6 inline-block"
      >
        &larr; Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
        {/* Product Image Placeholder */}
        <div className="h-96 bg-bg-secondary rounded-theme" />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-foreground capitalize">
            {params.slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-2xl text-primary font-bold mt-4">$99.99</p>
          <p className="text-text-secondary mt-4 leading-relaxed">
            This is a placeholder product page for <strong>{params.slug}</strong>.
            When connected to a CMS or database, this page will display real product data.
          </p>
          <button className="mt-8 w-full rounded-theme bg-primary px-6 py-3 text-white font-medium hover:bg-primary-hover transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
