# react-fsm

A react hook for creating Finite-state machines

![test action status](https://github.com/daniel-hauser/react-fsm/workflows/test/badge.svg)
![github pages action status](https://github.com/daniel-hauser/react-fsm/workflows/github%20pages/badge.svg)

## Usage

FSM parameters for both the hook and the class are:

| Name    | required | Type                                               |
| ------- | -------- | -------------------------------------------------- |
| states  | ✔️       | `Map<State, Map<Action, State>`                    |
| initial |          | `State`, defaults to the first `State` in `states` |

Where `State` and `Action` are non-empty strings

### Examples

#### react-hook

```javascript
function RetractablePen() {
  const [current, { allowedActions, doAction }] = useFsm(
    new Map([
      ["close", new Map([["click", "open"]])],
      ["open", new Map([["click", "close"]])],
    ])
  );

  return (
    <>
      <pre>State is {current}</pre>
      <button onClick={() => doAction("click")}>click</button>
    </>
  );
}
```

#### JavaScript class

```javascript
const retractablePen = new FSM(
  new Map([
    ["close", new Map([["click", "open"]])],
    ["open", new Map([["click", "close"]])],
  ])
);

retractablePen.currentState; // "close"
retractablePen.doAction("click");
retractablePen.currentState; // "open"
```
