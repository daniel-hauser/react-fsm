import React from "react";
import FsmExample from "./components/FsmExample";
import { Footer, Theme } from "./atoms";

export default function App() {
  return (
    <>
      <Theme />
      <header>
        <h1>react-fsm</h1>
        <h2>
          A react hook for creating{" "}
          <a href={"https://en.wikipedia.org/wiki/Finite-state_machine"}>
            Finite-state machine
          </a>
        </h2>
      </header>
      <main>
        <FsmExample />
      </main>
      <Footer>
        Created by{" "}
        <a href={"https://github.com/daniel-hauser"}>Daniel Hauser</a>
      </Footer>
    </>
  );
}
