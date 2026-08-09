'use client';
import PricingCard from './component';

export default function Preview() {
  return (
    <div className="flex min-h-[600px] w-full flex-col items-center justify-center gap-8 p-10 md:flex-row">
      <PricingCard
        planName="Basic"
        price="$12"
        description="For hobbyists and individuals."
        isPopular={false}
        features={['1 team member', 'Basic analytics', 'Community support']}
      />
      <PricingCard />
    </div>
  );
}
