import * as React from "react";

interface IAction<T, P> {
  type: T;
  payload: P;
}

type RecordToAction<
  S,
  T extends Record<string, (prevState: S, payload?: unknown) => S>
> = T extends Record<infer K, Function>
  ? K extends string
    ? IAction<K, Parameters<T[K]>[1]>
    : never
  : never;

type ActionRecords<S> = {
  [key in string]: (prevState: S, payload?: unknown) => S;
};

export function createReducerAction<S, Actions extends ActionRecords<S>>(
  actions: Actions
) {
  type ActionsKey = keyof Actions;

  function recuder(state: S, action: RecordToAction<S, Actions>) {
    if (actions[action.type]) {
      return actions[action.type](state, action.payload);
    }
    throw new Error(`Action[${action.type}] is not defined!`);
  }

  type MutationActionRecord = {
    [N in ActionsKey]: Parameters<Actions[N]>[1] extends undefined
      ? VoidFunction
      : (payload: Parameters<Actions[N]>[1]) => void;
  };

  return function(initialState: S): [S, MutationActionRecord] {
    const [state, dispatch] = React.useReducer(recuder, initialState);
    const handlers = React.useMemo(
      () =>
        (Object.keys(actions) as ActionsKey[]).reduce(
          (result, actionKey) => ({
            ...result,
            [actionKey]: (
              payload?: Parameters<Actions[typeof actionKey]>[1]
            ) => {
              dispatch({ type: actionKey, payload } as RecordToAction<
                S,
                Actions
              >);
            }
          }),
          {} as MutationActionRecord
        ),
      []
    );
    return [state, handlers];
  };
}
