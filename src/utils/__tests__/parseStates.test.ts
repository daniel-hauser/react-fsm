import { statesFromJson } from "../parseStates";

test("Parses json fsm definitions to States with Map", () => {
  const states = statesFromJson([
    {
      name: "test",
      states: [
        ["a", [["b", "b"]]],
        ["b", null],
      ],
    },
  ]);

  expect(states).toEqual([
    {
      name: "test",
      states: new Map([
        ["a", new Map([["b", "b"]])],
        ["b", null],
      ]),
    },
  ]);
});

test("Parses multiple fsm definitions", () => {
  const states = statesFromJson([
    {
      name: "test 1",
      states: [["a", null]],
    },
    {
      name: "test 2",
      states: [["a", null]],
    },
  ]);

  expect(states).toEqual([
    {
      name: "test 1",
      states: new Map([["a", null]]),
    },
    {
      name: "test 2",
      states: new Map([["a", null]]),
    },
  ]);
});
