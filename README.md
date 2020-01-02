# use-reducer-action

Create hook state and simple actions from useReducer. This package will support **Typescript**.

## How to use?

Step1. Create reducer action file

```ts
// useCounter.ts
import { createReducerAction } from "use-reducer-action";

interface ICounterState {
  value: number;
}

const counterActions = {
  increase(state: ICounterState) {
    return {
      ...state,
      value: state.value + 1
    };
  },
  decrease(state: ICounterState) {
    return {
      ...state,
      value: state.value - 1
    };
  },
  reset(state: ICounterState) {
    return {
      ...state,
      value: 0
    };
  },
  setValue(state: ICounterState, payload: { value: number }) {
    return {
      ...state,
      value: payload.value
    };
  }
};

export default createReducerAction<ICounterState, typeof counterActions>(
  counterActions
);
```

Step 2. Use the hook!

```tsx
import * as React from "react";
import useCounterAction from "./useCounter";

interface IProps {
  defaultValue?: number;
}

export default function CounterComponent({ defaultValue }: IProps) {
  const [
    { value },
    { increase, decrease, reset, setValue }
  ] = useCounterAction({ value: defaultValue || 0 });
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    e => {
      const form = e.target as HTMLFormElement;
      setValue({
        value: parseInt(
          (form.elements.namedItem("value") as HTMLInputElement).value,
          10
        )
      });
      e.preventDefault();
    },
    []
  );
  return (
    <div>
      <div className="value">Count: {value}</div>
      <div className="actions">
        <button className="increase" onClick={increase}>+</button>
        <button className="reset" onClick={reset}>0</button>
        <button className="decrease" onClick={decrease}>-</button>
        <form onSubmit={handleSubmit}>
          <input type="text" name="value" placeholder="Value" />
          <button type="submit">OK</button>
        </form>
      </div>
    </div>
  );
}
```
