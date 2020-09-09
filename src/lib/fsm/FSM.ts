export type StateName = string;
export type ActionName = string;
export type States = Map<StateName, Actions>;
export type Actions = Map<ActionName, StateName> | null;

export default class FSM extends EventTarget {
  static EVENTS = {
    stateChanged: "stateChanged",
  };
  #states: States;
  #currentState: StateName;

  constructor(states: States, initial?: StateName) {
    super();

    if (states.size === 0) {
      throw new TypeError(`states must not be empty`);
    }

    if (initial !== undefined) {
      if (!states.has(initial)) {
        throw new TypeError(`Initial state "${initial}" is not a valid state`);
      }

      this.#currentState = initial;
    } else {
      // Use first inserted key as initial
      // Note from MDN: The keys() method returns the keys in insertion order.
      this.#currentState = states.keys().next().value;
    }

    this.#states = states;
  }

  get currentState() {
    return this.#currentState;
  }

  get allowedActions(): Set<ActionName> {
    return new Set(this.#states.get(this.#currentState)?.keys());
  }

  assertValidAction(action?: ActionName | null): asserts action {
    if (!action || !this.allowedActions.has(action)) {
      throw new TypeError(
        `State "${this.currentState}" has no "${action}" action`
      );
    }
  }

  assertValidState(state?: StateName | null): asserts state {
    if (!state || !this.#states.has(state)) {
      throw new TypeError(`State "${state}" is not valid`);
    }
  }

  doAction(action: ActionName) {
    this.assertValidAction(action);

    // I use `!` because we should allays have a state entry for
    //  the current state as its asserted in assertValidAction
    const nextState = this.#states.get(this.#currentState)!.get(action);

    this.assertValidState(nextState);

    this.dispatchEvent(
      new StateChangedEvent(nextState, action, this.currentState)
    );

    this.#currentState = nextState;
  }
}

export class StateChangedEvent<StateName> extends Event {
  prev: StateName;
  action: ActionName;
  current: StateName;

  constructor(current: StateName, action: ActionName, prev: StateName) {
    super(FSM.EVENTS.stateChanged);

    this.prev = prev;
    this.action = action;
    this.current = current;
  }
}
