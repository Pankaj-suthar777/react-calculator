import { useReducer } from "react";
import "./index.css";
import DigitButton from "./DigitButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALULATE: "evaluate",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        current: `${state.current || ""}${action.payload}`,
      };
  }
}

function App() {
  const [{ current, previous, operation }, dispatch] = useReducer(reducer, {});
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous">
          {previous}
          {operation}
        </div>
        <div className="current">{current}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>%</button>
      <DigitButton digit="1" dispatch={dispatch}>
        1
      </DigitButton>
      <DigitButton digit="2" dispatch={dispatch}>
        2
      </DigitButton>
      <DigitButton digit="3" dispatch={dispatch}>
        3
      </DigitButton>
      <button>*</button>
      <DigitButton digit="4" dispatch={dispatch}>
        4
      </DigitButton>
      <DigitButton digit="5" dispatch={dispatch}>
        5
      </DigitButton>
      <DigitButton digit="6" dispatch={dispatch}>
        6
      </DigitButton>
      <button>+</button>
      <DigitButton digit="7" dispatch={dispatch}>
        7
      </DigitButton>
      <DigitButton digit="8" dispatch={dispatch}>
        8
      </DigitButton>
      <DigitButton digit="9" dispatch={dispatch}>
        9
      </DigitButton>
      <button>-</button>
      <button>.</button>
      <DigitButton digit="0" dispatch={dispatch}>
        0
      </DigitButton>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
