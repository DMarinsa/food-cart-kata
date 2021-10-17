import {
  decrementCounterAction,
  incrementCounterAction, incrementCounterFailureAction,
  incrementCounterRequestAction,
  incrementCounterSuccessAction
} from "./actions";

describe('Counter actions', () => {
  it('Increment action', () => {
    expect(incrementCounterAction()).toMatchSnapshot();
  });

  it('Decrement action', () => {
    expect(decrementCounterAction()).toMatchSnapshot();
  });

  it('Increment request action', () => {
    expect(incrementCounterRequestAction()).toMatchSnapshot();
  });

  it('Increment success action', () => {
    expect(incrementCounterSuccessAction()).toMatchSnapshot();
  });

  it('Increment failure action', () => {
    expect(incrementCounterFailureAction()).toMatchSnapshot();
  });
});
