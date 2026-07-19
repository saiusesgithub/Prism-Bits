"use client";

import { useState } from "react";
import GlassCta from "./component";

export default function GlassCtaPreview() {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="flex flex-col items-center gap-5">
      <GlassCta
        primaryLabel="Get started"
        secondaryLabel="View docs"
        onPrimaryClick={() => setClicks((count) => count + 1)}
        onSecondaryClick={() => setClicks(0)}
      />
      <p className="text-xs text-white/45" aria-live="polite">
        {clicks > 0 ? `Primary clicked ${clicks}× — secondary resets` : "Click the buttons to test interactivity"}
      </p>
    </div>
  );
}
