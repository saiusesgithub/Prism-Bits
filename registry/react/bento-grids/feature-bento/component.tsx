'use client';

type BentoItem = {
  title: string;
  description: string;
  wide?: boolean;
};

type FeatureBentoProps = {
  items?: BentoItem[];
};

const defaultItems: BentoItem[] = [
  {
    title: 'Copy-first',
    description:
      'Every component is source you paste and own — no package, no lock-in.',
    wide: true,
  },
  { title: 'Live previews', description: 'See it run before you copy it.' },
  {
    title: 'Framework-honest',
    description: 'React bits are real React; HTML bits are real HTML.',
  },
  {
    title: 'MIT licensed',
    description: 'Use anywhere, including commercial work.',
  },
  {
    title: 'Community-built',
    description: 'Every bit credits its contributor on the page.',
    wide: true,
  },
];

export default function FeatureBento({
  items = defaultItems,
}: FeatureBentoProps) {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className={`rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] ${
            item.wide ? 'sm:col-span-2' : ''
          }`}
        >
          <h3 className="text-base font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/55">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
}
