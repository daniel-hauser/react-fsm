import FsmView from "./FsmView";
import React, { useState } from "react";
import { FsmDef } from "../utils/parseStates";
import SelectExample from "./SelectExample";
import ContentLoader from "react-content-loader";

type Props = {
  examples: Array<FsmDef>;
};

function FsmDemo({ examples }: Props) {
  const [selected, setSelected] = useState<FsmDef>(examples[0]);

  return (
    <>
      <pre>
        const states ={" "}
        <SelectExample
          examples={examples}
          selected={selected}
          onChange={setSelected}
        />
      </pre>
      {selected && <FsmView key={selected.name} states={selected.states} />}
    </>
  );
}

function Loader() {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={400}
      viewBox="0 0 400 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="8" y="15" rx="0" ry="0" width="130" height="20" />
      <rect x="166" y="15" rx="0" ry="0" width="130" height="20" />
      <rect x="13" y="368" rx="0" ry="0" width="163" height="19" />
      <rect x="230" y="353" rx="0" ry="0" width="156" height="36" />
      <circle cx="80" cy="200" r="41" />
      <circle cx="200" cy="200" r="41" />
      <circle cx="330" cy="200" r="41" />
    </ContentLoader>
  );
}

export { Loader };
export default FsmDemo;
