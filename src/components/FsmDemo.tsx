import FsmView from "./FsmView";
import React, { useMemo, useState } from "react";
import { States } from "../lib/fsm";
import styled from "@emotion/styled";
import CodeView from "./CodeView";
import { Box, Select } from "../atoms";
import * as demos from "../mock";

export default function () {
  const demoNames = useMemo<Array<keyof typeof demos>>(
    () => Object.keys(demos) as Array<keyof typeof demos>,
    [demos]
  );

  const [selected, setSelected] = useState<keyof typeof demos>(demoNames[0]);

  return (
    <Container>
      <CodeView>
        {
          /* TODO: Load from file? */
          "function FSM() {\n" +
            "  const [current, { allowedActions, doAction }] = useFsm(states);\n" +
            "  return (\n" +
            "    <>\n" +
            "      <pre>Current state: {current}</pre>\n" +
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
            "}"
        }
      </CodeView>
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
