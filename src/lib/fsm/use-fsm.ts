import { useCallback, useEffect, useMemo, useState } from "react";
import FSM, { ActionName, StateChangedEvent, StateName, States } from "./FSM";

type FsmHookResult = [StateName, Pick<FSM, "doAction" | "allowedActions">];

function useFsm(states: States, initialState?: StateName): FsmHookResult {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fsm = useMemo<FSM>(() => new FSM(states, initialState), []);

  const [currentState, setCurrentState] = useState<StateName>(fsm.currentState);
  const doAction = useCallback((action: ActionName) => fsm.doAction(action), [
    fsm,
  ]);
  const onChange = useCallback(
    (e: Event) => setCurrentState((e as StateChangedEvent<StateName>).current),
    []
  );

  useEffect(() => {
    fsm.addEventListener(FSM.EVENTS.stateChanged, onChange);
    return () => fsm.removeEventListener(FSM.EVENTS.stateChanged, onChange);
  }, [fsm, onChange]);

  const { allowedActions } = fsm;
  return [
    currentState!,
    {
      doAction,
      allowedActions,
    },
  ];
}

export default useFsm;
