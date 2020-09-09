import FsmView from "./FsmView";
import React, { useMemo, useState } from "react";
import styled from "@emotion/styled";
import CodeView from "./CodeView";
import { Box, Select } from "../atoms";
import * as demos from "../mock";

type DemoName = keyof typeof demos;

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

export default function () {
  const demoNames = useMemo<Array<DemoName>>(
    () => Object.keys(demos) as Array<DemoName>,
    []
  );

  const [selected, setSelected] = useState<DemoName>(demoNames[0]);

  return (
    <Container>
      <CodeView>{codeExample}</CodeView>
      <Box>
        <pre>
          const states ={" "}
          <Select
            selected={selected}
            options={demoNames}
            onChange={(item) => setSelected(item)}
          />
        </pre>
        <FsmView key={selected} states={demos[selected].data} />
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;
