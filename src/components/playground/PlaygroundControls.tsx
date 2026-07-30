"use client";

import type { PlaygroundConfig, PlaygroundValues } from "./types";

type PlaygroundControlsProps = {
  config: PlaygroundConfig;
  values: PlaygroundValues;
  onChange: (values: PlaygroundValues) => void;
  onReset: () => void;
  onCopy: () => void;
};

export function PlaygroundControls({
  config,
  values,
  onChange,
  onReset,
  onCopy,
}: PlaygroundControlsProps) {
  return (
    <div className="space-y-5 rounded-xl border border-white/10 bg-black/30 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">
          Playground Controls
        </h3>

        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
          >
            Reset
          </button>

          <button
            onClick={onCopy}
            className="rounded-md border border-white/10 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
          >
            Copy JSX
          </button>
        </div>
      </div>

      {Object.entries(config.controls).map(([key, control]) => {
        switch (control.type) {
          case "text":
            return (
              <div key={key} className="space-y-2">
                <label className="text-xs text-white/70">
                  {control.label}
                </label>

                <input
                  type="text"
                  value={String(values[key] ?? "")}
                  onChange={(e) =>
                    onChange({
                      ...values,
                      [key]: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                />
              </div>
            );

          case "select":
            return (
              <div key={key} className="space-y-2">
                <label className="text-xs text-white/70">
                  {control.label}
                </label>

                <select
                  value={String(values[key])}
                  onChange={(e) =>
                    onChange({
                      ...values,
                      [key]: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                >
                  {control.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            );

          case "boolean":
            return (
              <div
                key={key}
                className="flex items-center justify-between"
              >
                <label className="text-sm text-white/70">
                  {control.label}
                </label>

                <input
                  type="checkbox"
                  checked={Boolean(values[key])}
                  onChange={(e) =>
                    onChange({
                      ...values,
                      [key]: e.target.checked,
                    })
                  }
                />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}