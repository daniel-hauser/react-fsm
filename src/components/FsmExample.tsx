import React from "react";
import styled from "@emotion/styled";
import { Box } from "../atoms";
import CodeView from "./CodeView";
import FsmDemo, { Loader as FsmDemoLoader } from "./FsmDemo";
import { useFsmExamples } from "../hooks/useFsmExamples";

const codeExample =
  "function FSM() {\n" +
  "  const [currentState, { allowedActions, doAction }] = useFsm(states);\n" +
  "  return (\n" +
  "    <>\n" +
  "      <pre>Current state: {currentState}</pre>\n" +
  "      <pre>\n" +
  "        Actions:\n" +
  "        {allowedActions.size ? (\n" +
  "          Array.from(allowedActions).map((action) => (\n" +
  "            <button key={action} onClick={() => doAction(action)}>\n" +
  "              {action}\n" +
  "            </button>\n" +
  "          ))\n" +
  "        ) : (\n" +
  "          <button disabled>N/A</button>\n" +
  "        )}\n" +
  "      </pre>\n" +
  "    </>\n" +
  "  );\n" +
  "}\n";

function FsmExample() {
  const { examples, loading } = useFsmExamples();

  return (
    <ExampleContainer>
      <Box>
        {loading && <FsmDemoLoader />}
        {examples && <FsmDemo examples={examples} />}
      </Box>
      <CodeView>{codeExample}</CodeView>
    </ExampleContainer>
  );
}

const ExampleContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

export default FsmExample;
