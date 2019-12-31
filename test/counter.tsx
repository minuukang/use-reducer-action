import * as React from "react";
import useCounterAction from "./useCounter";

interface IProps {
  defaultValue?: number;
}

export default function CounterComponent({ defaultValue }: IProps) {
  const [
    { value, visible },
    { increase, decrease, reset, toggleVisible, setValue }
  ] = useCounterAction({ value: defaultValue || 0, visible: true });
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
      <div className="value">{visible ? value : ""}</div>
      <div className="actions">
        <button className="increase" onClick={increase}>
          +
        </button>
        <button className="reset" onClick={reset}>
          0
        </button>
        <button className="decrease" onClick={decrease}>
          -
        </button>
        <button className="toggleVisible" onClick={toggleVisible}>
          {visible ? "Hide value" : "Show value"}
        </button>
        <form onSubmit={handleSubmit}>
          <input type="text" name="value" placeholder="Value" />
          <button type="submit">OK</button>
        </form>
      </div>
    </div>
  );
}
