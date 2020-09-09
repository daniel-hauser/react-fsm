import React, { useEffect, useMemo, useRef } from "react";
import statesToGraph from "../utils/statesToGraph";
import Graph from "react-graph-vis";
import { States, StateName } from "../lib/fsm";
import { Network } from "vis";

const color = "black";

type Props = {
  states: States;
  initial?: StateName;
  current: StateName;
};

function FsmGraph({ states, current }: Props) {
  const dataRef = useRef<Network | null>(null);

  const data = useMemo(() => statesToGraph(states), [states]);

  useEffect(() => {
    if (current) {
      dataRef.current?.selectNodes([current]);
    }
  }, [current]);

  return (
    <div
      style={{
        outlineWidth: 0,
        height: "400px",
        width: "500px",
      }}
    >
      <Graph
        graph={data}
        options={{
          interaction: {
            zoomView: false,
            selectable: false,
            dragView: false,
            dragNodes: false,
            selectConnectedEdges: false,
          },
          nodes: {
            color: {
              background: "white",
              border: color,
              highlight: { background: "white", border: "green" },
            },
          },
          edges: {
            smooth: {
              enabled: true,
              type: "dynamic",
              roundness: 0.5,
            },
            length: 150,
            arrows: { to: true },
            color: {
              inherit: false,
              highlight: color,
              color: color,
            },
          },
          physics: { enabled: true },
          layout: { randomSeed: 1 },
        }}
        getNetwork={(data) => {
          dataRef.current = data;
        }}
      />
    </div>
  );
}

export default FsmGraph;
