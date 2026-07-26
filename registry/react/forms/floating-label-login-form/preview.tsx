"use client";

import { useState } from "react";
import FloatingLabelLoginForm from "./component";

export default function FloatingLabelLoginFormPreview() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");

  const handleSubmit = async (data: { email: string }) => {
    setLoading(true);
    setStatus("Authenticating...");

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setStatus(`Success! Signed in as ${data.email}`);

    // Clear status after 3s
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 p-4">
      <FloatingLabelLoginForm onSubmit={handleSubmit} loading={loading} />

      <div className="h-6">
        {status && (
          <p
            className="text-sm font-medium text-white/70 animate-in fade-in"
            aria-live="polite"
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
