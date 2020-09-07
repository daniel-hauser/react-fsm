import React, { ReactNode } from "react";
// import styled from "@emotion/styled";

type Props<T> = {
  selected?: T | null;
  options: Array<T>;
  onChange(selected: T): void;
  renderItem?(item: T): ReactNode;
};

function Select<T extends string>({
  options,
  selected,
  onChange,
  renderItem,
}: Props<T>) {
  return (
    <select onChange={(e) => onChange(e.target.value as T)}>
      {options.map((item) => (
        <option selected={item === selected}>
          {renderItem?.(item) || item}
        </option>
      ))}
    </select>
  );
}

export { Select };
