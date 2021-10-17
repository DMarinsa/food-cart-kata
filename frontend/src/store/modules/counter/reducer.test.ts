import * as Actions from './actions';
import reducer from './reducer';
import { initialState } from './model';

describe('Counter reducer', () => {

  it('handles INCREMENT_COUNTER correctly', () => {
    const action = Actions.incrementCounterAction();
    const result = reducer(initialState, action);
    const expected = { ...initialState, value: 2 };
    expect(result).toEqual(expected);
  });

  it('handles DECREMENT_COUNTER correctly', () => {
    const action = Actions.decrementCounterAction();
    const result = reducer(initialState, action);
    const expected = { ...initialState, value: 0 };
    expect(result).toEqual(expected);
  });

  it('handles INCREMENT_COUNTER_REQUEST correctly', () => {
    const action = Actions.incrementCounterRequestAction();
    const result = reducer(initialState, action);
    const expected = { ...initialState, loading: true, error: false };
    expect(result).toEqual(expected);
  });

  it('handles INCREMENT_COUNTER_SUCCESS correctly', () => {
    const action = Actions.incrementCounterSuccessAction();
    const result = reducer(initialState, action);
    const expected = { ...initialState, loading: false, error: false };
    expect(result).toEqual(expected);
  });

  it('handles INCREMENT_COUNTER_FAILURE correctly', () => {
    const action = Actions.incrementCounterFailureAction();
    const result = reducer(initialState, action);
    const expected = { ...initialState, loading: false, error: true };
    expect(result).toEqual(expected);
  });

});
