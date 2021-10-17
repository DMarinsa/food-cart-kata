import {ICounterDomain, initialState} from './model';
import * as Actions from './actions';

const counterReducer = (state: ICounterDomain = initialState, action: Actions.CounterAction) => {
  switch (action.type) {
    case Actions.INCREMENT_COUNTER:
      return { ...state, value: state.value + 1 };

    case Actions.DECREMENT_COUNTER:
      return { ...state, value: state.value - 1 };

    case Actions.INCREMENT_COUNTER_REQUEST:
      return { ...state, loading: true, error: false };

    case Actions.INCREMENT_COUNTER_SUCCESS:
      return { ...state, loading: false, error: false };

    case Actions.INCREMENT_COUNTER_FAILURE:
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default counterReducer;
