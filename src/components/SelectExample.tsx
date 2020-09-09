import React from "react";
import { Select } from "../atoms";
import { FsmDef } from "../utils/parseStates";

type Props = {
  examples: Array<FsmDef>;
  selected?: FsmDef;
  onChange(example: FsmDef): void;
};

function SelectExample({ examples, selected, onChange }: Props) {
  return (
    <Select
      selected={selected?.name}
      options={examples.map((example) => example.name)}
      onChange={(item) => {
        onChange(examples.find((example) => example.name === item)!);
      }}
    />
  );
}

export default SelectExample;
