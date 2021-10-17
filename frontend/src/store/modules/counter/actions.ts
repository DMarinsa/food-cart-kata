export const INCREMENT_COUNTER_REQUEST = 'INCREMENT_COUNTER_REQUEST';
export const INCREMENT_COUNTER_SUCCESS = 'INCREMENT_COUNTER_SUCCESS';
export const INCREMENT_COUNTER_FAILURE = 'INCREMENT_COUNTER_FAILURE';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export type IncrementCounterRequestAction = ReturnType<typeof incrementCounterRequestAction>;
export const incrementCounterRequestAction = () => ({
  type: INCREMENT_COUNTER_REQUEST as typeof INCREMENT_COUNTER_REQUEST
});

export type IncrementCounterSuccessAction = ReturnType<typeof incrementCounterSuccessAction>;
export const incrementCounterSuccessAction = () => ({
  type: INCREMENT_COUNTER_SUCCESS as typeof INCREMENT_COUNTER_SUCCESS
});

export type IncrementCounterFailureAction = ReturnType<typeof incrementCounterFailureAction>;
export const incrementCounterFailureAction = () => ({
  type: INCREMENT_COUNTER_FAILURE as typeof INCREMENT_COUNTER_FAILURE
});

export type IncrementCounterAction = ReturnType<typeof incrementCounterAction>;
export const incrementCounterAction = () => ({
  type: INCREMENT_COUNTER as typeof INCREMENT_COUNTER
});

export type DecrementCounterAction = ReturnType<typeof decrementCounterAction>;
export const decrementCounterAction = () => ({
  type: DECREMENT_COUNTER as typeof DECREMENT_COUNTER
});

export type CounterAction =
  | IncrementCounterRequestAction
  | IncrementCounterSuccessAction
  | IncrementCounterFailureAction
  | IncrementCounterAction
  | DecrementCounterAction;
