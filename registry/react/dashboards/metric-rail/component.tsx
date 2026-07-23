'use client';

type Metric = {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down';
};

type MetricRailProps = {
  metrics?: Metric[];
};

const defaultMetrics: Metric[] = [
  { label: 'Revenue', value: '$48.2k', delta: '+12.4%', trend: 'up' },
  { label: 'Active users', value: '8,921', delta: '+3.1%', trend: 'up' },
  { label: 'Churn', value: '1.9%', delta: '-0.4%', trend: 'down' },
  { label: 'Avg. session', value: '6m 12s' },
];

export default function MetricRail({
  metrics = defaultMetrics,
}: MetricRailProps) {
  return (
    <dl className="grid w-full max-w-2xl grid-cols-2 gap-3 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-white/20"
        >
          <dt className="text-xs font-medium uppercase tracking-[0.1em] text-white/45">
            {metric.label}
          </dt>
          <dd className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-white">
              {metric.value}
            </span>
            {metric.delta ? (
              <span
                className={`text-xs font-semibold ${
                  metric.trend === 'down'
                    ? 'text-rose-300/90'
                    : 'text-emerald-300/90'
                }`}
              >
                {metric.delta}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
