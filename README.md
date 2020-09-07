# react-fsm

A react hook for creating Finite-state machines

## Usage

FSM parameters for both the hook and the class are:

| Name    | required | Type                                               |
| ------- | -------- | -------------------------------------------------- |
| states  | ✔️       | `Map<State, Map<Action, State>`                    |
| initial |          | `State`, defaults to the first `State` in `states` |

Where `State` and `Action` are non-empty strings

### react-hook

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
      <button onClick={() => doAction([...allowedActions][0])}>click</button>
    </>
  );
}
```

### JavaScript class

```javascript
const retractablePen = new FSM(
  new Map([
    ["close", new Map([["click", "open"]])],
    ["open", new Map([["click", "close"]])],
  ])
);

retractablePen.currentState; // "close"
retractablePen.doAction("open");
retractablePen.currentState; // "open"
```
