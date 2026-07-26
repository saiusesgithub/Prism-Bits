"use client";

import { useMemo, useState } from "react";
import { PlaygroundControls } from "./PlaygroundControls";
import type {
  PlaygroundConfig,
  PlaygroundValues,
} from "./types";

type PlaygroundProps = {
  config: PlaygroundConfig;
  render: (props: PlaygroundValues) => React.ReactNode;
};

export function Playground({
  config,
  render,
}: PlaygroundProps) {
  const initialValues = useMemo(
    () => ({ ...config.defaults }),
    [config],
  );

  const [values, setValues] =
    useState<PlaygroundValues>(initialValues);

  function handleReset() {
    setValues(initialValues);
  }

  function handleCopy() {
    const props = Object.entries(values)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}="${value}"`;
        }

        return value ? key : "";
      })
      .filter(Boolean)
      .join("\n  ");

    navigator.clipboard.writeText(
`<${config.componentName}
  ${props}
/>`
    );
  }

  return (
    <div className="space-y-6">

      <div className="rounded-2xl border border-white/10 bg-black/20 p-8">
        {render(values)}
      </div>

      <PlaygroundControls
        config={config}
        values={values}
        onChange={setValues}
        onReset={handleReset}
        onCopy={handleCopy}
      />

    </div>
  );
}