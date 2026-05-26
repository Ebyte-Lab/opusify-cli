interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
  color: string;
  size: string;
  imageColor: string;
}

export default function CartItem({ name, price, quantity, color, size, imageColor }: CartItemProps) {
  const lineTotal = (price * quantity).toFixed(2);

  return (
    <div className="flex gap-4 py-6 border-b border-border">
      {/* Image */}
      <div
        className="w-20 h-20 rounded-theme flex-shrink-0"
        style=\{{ backgroundColor: imageColor }}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-medium text-foreground text-sm">{name}</h3>
            <p className="text-xs text-text-secondary mt-1">
              {color} &middot; Size {size}
            </p>
          </div>
          {/* Remove Button */}
          <button className="text-text-secondary hover:text-red-500 transition p-1" aria-label="Remove item">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-border rounded-theme">
            <button className="px-2.5 py-1 text-text-secondary hover:text-foreground transition text-sm" aria-label="Decrease quantity">
              &minus;
            </button>
            <span className="px-3 py-1 text-sm font-medium text-foreground border-x border-border">
              {quantity}
            </span>
            <button className="px-2.5 py-1 text-text-secondary hover:text-foreground transition text-sm" aria-label="Increase quantity">
              &#43;
            </button>
          </div>
          <span className="font-semibold text-foreground">${lineTotal}</span>
        </div>
      </div>
    </div>
  );
}
