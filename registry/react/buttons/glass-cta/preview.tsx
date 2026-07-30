"use client";

import GlassCta from "./component";
import { Playground } from "@/components/playground/Playground";
import type { PlaygroundConfig } from "@/components/playground/types";

const playgroundConfig: PlaygroundConfig = {
  title: "Glass CTA",
  componentName: "GlassCta",

  defaults: {
    primaryLabel: "Get started",
    secondaryLabel: "View docs",
  },

  controls: {
    primaryLabel: {
      type: "text",
      label: "Primary Label",
      defaultValue: "Get started",
    },

    secondaryLabel: {
      type: "text",
      label: "Secondary Label",
      defaultValue: "View docs",
    },
  },
};

export default function GlassCtaPreview() {
  return (
    <Playground
      config={playgroundConfig}
      render={(props) => (
        <GlassCta
          primaryLabel={String(props.primaryLabel)}
          secondaryLabel={String(props.secondaryLabel)}
        />
      )}
    />
  );
}