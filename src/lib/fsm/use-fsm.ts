import { useCallback, useEffect, useMemo, useState } from "react";
import FSM, { States, ActionName, StateChangedEvent, StateName } from "./FSM";

type FsmHookResult = [StateName, Pick<FSM, "doAction" | "allowedActions">];

function useFsm(states: States, initialState?: StateName): FsmHookResult {
  const [_, setCurrentState] = useState<StateName>();
  const fsm = useMemo<FSM>(() => new FSM(states, initialState), []);
  const doAction = useCallback((action: ActionName) => fsm.doAction(action), [
    fsm,
  ]);
  const onChange = useCallback(
    (e: Event) => setCurrentState((e as StateChangedEvent<StateName>).current),
    []
  );

  useEffect(() => {
    fsm.addEventListener(FSM.EVENTS.stateChanged, onChange);
    return () => fsm.addEventListener(FSM.EVENTS.stateChanged, onChange);
  }, [fsm]);

  const { allowedActions, currentState } = fsm;
  return [
    currentState,
    {
      doAction,
      allowedActions,
    },
  ];
}

export default useFsm;
