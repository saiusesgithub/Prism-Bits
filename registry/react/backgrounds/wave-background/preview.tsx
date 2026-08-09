'use client';

import WaveBackground from './component';

export default function Preview() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl border border-zinc-800">
      <WaveBackground />
    </div>
  );
}
