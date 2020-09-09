import FSM, { StateChangedEvent } from "../index";

describe("Initial state", () => {
  test("Must be a valid state", () => {
    expect(() => new FSM(new Map([["state a", null]]), "state b")).toThrow(
      'Initial state "state b" is not a valid state'
    );
    expect(
      () => new FSM(new Map([["state a", null]]), "state a")
    ).not.toThrow();
  });

  test("Is set as currentState", () => {
    const fsm = new FSM(new Map([["state a", null]]), "state a");

    expect(fsm.currentState).toBe("state a");
  });

  test("Picks the first state if no initial is sent", () => {
    const fsm = new FSM(
      new Map([
        ["state a", null],
        ["state b", null],
      ])
    );
    expect(fsm.currentState).toBe("state a");
  });
});

describe("Lifecycle", () => {
  let fsm: FSM;

  beforeEach(() => {
    fsm = new FSM(
      new Map([
        ["state a", new Map([["goto b", "state b"]])],
        ["state b", null],
      ]),
      "state a"
    );
  });

  test("States must exist", () => {
    expect(() => new FSM(new Map())).toThrow(/states must not be empty/);
  });

  test("Action must exist", () => {
    expect(() => fsm.doAction("goto a")).toThrow('has no "goto a" action');
    fsm.doAction("goto b");
    expect(fsm.currentState).toBe("state b");
  });

  test("Target state must exist", () => {
    const fsm = new FSM(
      new Map([["state a", new Map([["goto b", "state b"]])]]),
      "state a"
    );

    expect(() => fsm.doAction("goto b")).toThrow(
      'State "state b" is not valid'
    );
  });

  test("State is updated correctly", () => {
    fsm.doAction("goto b");

    expect(fsm.currentState).toBe("state b");
  });

  test("Allowed actions are correct", () => {
    expect(fsm.allowedActions).toEqual(new Set(["goto b"]));
    fsm.doAction("goto b");
    expect(fsm.allowedActions).toEqual(new Set());
  });

  test("State changed event is fired on state change", () => {
    const onChange = jest.fn();
    fsm.addEventListener(FSM.EVENTS.stateChanged, onChange);

    fsm.doAction("goto b");

    expect(fsm.currentState).toEqual("state b");
    expect(onChange).toBeCalledWith(
      new StateChangedEvent("state b", "goto b", "state a")
    );
  });
});
