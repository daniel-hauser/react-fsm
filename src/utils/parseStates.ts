import { ActionName, StateName, States } from "../lib/fsm";

export type JsonFsmDef = {
  name: string;
  states: Array<[StateName, Array<[ActionName, StateName]> | null]>;
};

export type FsmDef = {
  name: string;
  states: States;
};

/*
 * Since json has no support for Maps, this function converts the K,V arrays to maps
 * */
export function statesFromJson(states: Array<JsonFsmDef>): Array<FsmDef> {
  return states.map(({ name, states }) => ({
    name,
    states: new Map(
      states.map(([stateName, actions]) => [
        stateName,
        actions && new Map(actions),
      ])
    ),
  }));
}
