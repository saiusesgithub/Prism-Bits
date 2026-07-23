'use client';

type ProductCardProps = {
  title?: string;
  price?: string;
  originalPrice?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  onAddToCart?: () => void;
};

export default function ProductCard({
  title = 'Sony Noise Cancelling Headphones',
  price = '$298.00',
  originalPrice = '$348.00',
  imageUrl = 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80',
  rating = 4.8,
  reviewCount = 1240,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="group flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] shadow-2xl transition duration-300 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="relative aspect-square overflow-hidden bg-white/5">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-full bg-black/50 p-2 backdrop-blur-md transition hover:bg-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={
                i < Math.floor(rating) ? 'text-yellow-400' : 'text-white/20'
              }
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-white/50">({reviewCount})</span>
        </div>

        <h3 className="mb-1 text-lg font-medium text-white line-clamp-1">
          {title}
        </h3>

        <div className="mb-5 flex items-center gap-2 mt-auto">
          <span className="text-xl font-bold text-white">{price}</span>
          {originalPrice && (
            <span className="text-sm text-white/40 line-through">
              {originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={onAddToCart}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
