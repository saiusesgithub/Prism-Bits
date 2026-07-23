'use client';
import PricingCard from './component';

export default function Preview() {
  return (
    <div className="flex min-h-[600px] w-full flex-col md:flex-row gap-8 items-center justify-center p-10">
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
