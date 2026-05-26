import Link from 'next/link';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  imageColor: string;
  badge?: 'New' | 'Sale';
  slug: string;
}

export default function ProductCard({ name, price, originalPrice, imageColor, badge, slug }: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      className="group block border border-border rounded-theme bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          style=\{{ backgroundColor: imageColor }}
        />
        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-theme text-white ${
              badge === 'Sale' ? 'bg-red-500' : 'bg-primary'
            }`}
          >
            {badge}
          </span>
        )}
        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <span className="px-4 py-2 bg-white text-foreground text-sm font-medium rounded-theme opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
            Quick View
          </span>
        </div>
      </div>
      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-foreground group-hover:text-primary transition text-sm leading-tight">
          {name}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-bold text-foreground">{price}</span>
          {originalPrice && (
            <span className="text-sm text-text-secondary line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
