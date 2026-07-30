export type PlaygroundControl =
  | {
      type: "text";
      label: string;
      defaultValue: string;
    }
  | {
      type: "select";
      label: string;
      options: string[];
      defaultValue: string;
    }
  | {
      type: "boolean";
      label: string;
      defaultValue: boolean;
    };

export type PlaygroundValues = Record<string, string | boolean>;

export type PlaygroundConfig = {
  title: string;
  componentName: string;
  defaults: PlaygroundValues;
  controls: Record<string, PlaygroundControl>;
};