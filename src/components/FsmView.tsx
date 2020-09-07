import React from "react";
import styled from "@emotion/styled";
import { useFsm, States } from "../lib/fsm";
import FsmGraph from "./FsmGraph";

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  &:first-of-type {
    margin-left: 1rem;
  }
  &:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

export default function ({ states }: { states: States }) {
  const [current, { allowedActions, doAction }] = useFsm(states);
  return (
    <>
      <FsmGraph states={states} current={current} />
      <Actions>
        <pre>Current state: {current}</pre>
        <pre>
          Actions:
          {allowedActions.size ? (
            Array.from(allowedActions).map((action) => (
              <ActionButton key={action} onClick={() => doAction(action)}>
                {action}
              </ActionButton>
            ))
          ) : (
            <ActionButton disabled>N/A</ActionButton>
          )}
        </pre>
      </Actions>
    </>
  );
}

const Actions = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-around;
`;
