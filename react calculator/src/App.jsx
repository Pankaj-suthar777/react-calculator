import { useReducer } from "react";
import "./index.css";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete_digit",
  EVALULATE: "evaluate",
};

function evaluate({ current, previous, operation }) {
  const prev = parseFloat(previous);
  const curr = parseFloat(current);

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "*":
      computation = prev * curr;
      break;
    case "%":
      computation = prev / curr;
  }

  return computation.toString();
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          current: action.payload,
          overwrite: false,
        };
      }
      if (action.payload === "0" && state.current === "0") return state;
      if (action.payload === "." && state.current.includes(".")) return state;
      return {
        ...state,
        current: `${state.current || ""}${action.payload}`,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.current == null && state.previous == null) {
        console.log(state.current);
        return state;
      }
      if (state.previous == null) {
        return {
          ...state,
          previous: state.current,
          current: null,
          operation: action.payload,
        };
      }

      if (state.current == null) {
        return { ...state, operation: action.payload };
      }
      return {
        ...state,
        previous: evaluate(state),
        current: null,
        operation: action.payload,
      };
    case ACTIONS.EVALULATE:
      if (
        state.current == null ||
        state.previous == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        current: evaluate(state),
        previous: null,
        overwrite: true,
        operation: null,
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.current == null) return state;

      return {
        ...state,
        current: state.current.slice(0, -1),
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
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="%" dispatch={dispatch}>
        %
      </OperationButton>
      <DigitButton digit="1" dispatch={dispatch}>
        1
      </DigitButton>
      <DigitButton digit="2" dispatch={dispatch}>
        2
      </DigitButton>
      <DigitButton digit="3" dispatch={dispatch}>
        3
      </DigitButton>
      <OperationButton operation="*" dispatch={dispatch}>
        *
      </OperationButton>
      <DigitButton digit="4" dispatch={dispatch}>
        4
      </DigitButton>
      <DigitButton digit="5" dispatch={dispatch}>
        5
      </DigitButton>
      <DigitButton digit="6" dispatch={dispatch}>
        6
      </DigitButton>
      <OperationButton operation="+" dispatch={dispatch}>
        +
      </OperationButton>
      <DigitButton digit="7" dispatch={dispatch}>
        7
      </DigitButton>
      <DigitButton digit="8" dispatch={dispatch}>
        8
      </DigitButton>
      <DigitButton digit="9" dispatch={dispatch}>
        9
      </DigitButton>
      <OperationButton operation="-" dispatch={dispatch}>
        -
      </OperationButton>
      <DigitButton digit="." dispatch={dispatch}>
        .
      </DigitButton>
      <DigitButton digit="0" dispatch={dispatch}>
        0
      </DigitButton>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.EVALULATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
