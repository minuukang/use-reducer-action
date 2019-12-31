import { createReducerAction } from "../src/index";

interface ICounterState {
  value: number;
  visible: boolean;
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
  toggleVisible(state: ICounterState) {
    return {
      ...state,
      visible: !state.visible
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
