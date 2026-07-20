"use client";

type PricingCardProps = {
  planName?: string;
  price?: string;
  description?: string;
  features?: string[];
  isPopular?: boolean;
  buttonText?: string;
  onSubscribe?: () => void;
};

export default function PricingCard({
  planName = "Pro",
  price = "$29",
  description = "Perfect for small teams and growing businesses.",
  features = [
    "Up to 5 team members",
    "Basic analytics integration",
    "24/7 priority support",
    "Custom domain setup",
    "100GB storage space"
  ],
  isPopular = true,
  buttonText = "Get Started",
  onSubscribe,
}: PricingCardProps) {
  return (
    <div className={"relative flex w-full max-w-sm flex-col rounded-3xl border " + (isPopular ? 'border-cyan-500/50 bg-white/[0.06]' : 'border-white/12 bg-white/[0.03]') + " p-8 shadow-2xl transition duration-300 hover:border-white/30"}>
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-3 py-1 text-xs font-semibold tracking-wide text-white shadow-lg">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white/80">{planName}</h3>
        <div className="mt-2 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-sm font-medium text-white/50">/month</span>
        </div>
        <p className="mt-4 text-sm text-white/60">{description}</p>
      </div>
      
      <ul className="mb-8 flex flex-1 flex-col gap-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-sm text-white/80">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSubscribe}
        className={"mt-auto w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " + (
          isPopular 
            ? 'bg-white text-black hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-black' 
            : 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/70 focus-visible:ring-offset-black'
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}
