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
      throw new Error(`states must not be empty`);
    }

    if (initial !== undefined) {
      if (!states.has(initial)) {
        throw new Error(`Initial state "${initial}" is not a valid state`);
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

  isValidAction(action: ActionName) {
    return this.allowedActions.has(action);
  }

  assertValidAction(action?: ActionName | null): asserts action {
    if (!action || !this.isValidAction(action)) {
      throw new Error(`State "${this.currentState}" has no "${action}" action`);
    }
  }

  assertValidState(state?: StateName | null): asserts state {
    if (!state || !this.#states.has(state)) {
      throw new Error(`State "${state}" is not valid`);
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
