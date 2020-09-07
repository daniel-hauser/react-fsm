export const trafficLight = {
  data: new Map([
    ["red", new Map([["yellow", "yellow"]])],
    [
      "yellow",
      new Map([
        ["red", "red"],
        ["green", "green"],
      ]),
    ],
    ["green", new Map([["yellow", "yellow"]])],
  ]),
};

export const ballPointPen = {
  data: new Map([
    ["close", new Map([["click", "open"]])],
    ["open", new Map([["click", "close"]])],
  ]),
};

export const passwordValidator = {
  data: new Map([
    [
      "locked",
      new Map([
        ["press 1", "1"],
        ["other digit", "locked"],
      ]),
    ],
    [
      "1",
      new Map([
        ["press 2", "2"],
        ["other digit", "locked"],
      ]),
    ],
    [
      "2",
      new Map([
        ["press 3", "3"],
        ["other digit", "locked"],
      ]),
    ],
    [
      "3",
      new Map([
        ["press 4", "4"],
        ["other digit", "locked"],
      ]),
    ],
    [
      "4",
      new Map([
        ["press *", "unlocked"],
        ["other digit", "locked"],
      ]),
    ],
    ["unlocked", new Map([["press lock", "locked"]])],
  ]),
};

export const interviewProcess = {
  data: new Map([
    [
      "start",
      new Map([
        ["go", "phone interview"],
        ["no go", "withdrawn"],
      ]),
    ],
    [
      "phone interview",
      new Map([
        ["go", "technical interview"],
        ["no go", "withdrawn"],
      ]),
    ],
    [
      "technical interview",
      new Map([
        ["go", "final interview"],
        // ["no go", "withdrawn"],
      ]),
    ],
    [
      "final interview",
      new Map([
        ["no go", "withdrawn"],
        ["go", "hired"],
      ]),
    ],
    ["hired", new Map([["work", "hired"]])],
    ["withdrawn", null],
  ]),
};
