import { States } from "../lib/fsm";

export default function statesToGraph(states: States) {
  return {
    nodes: Array.from(states.entries()).map(([state, actions]) => ({
      id: state,
      label: state,
      color: { border: Boolean(actions) ? undefined : "red" },
    })),
    edges: Array.from(states.entries())
      .filter(([_, actions]) => actions !== null)
      .flatMap(([state, actions], i) => {
        return Array.from(actions!.entries()).map(([action, target]) => ({
          from: state,
          to: target,
          label: action,
        }));
      }),
  };
}
