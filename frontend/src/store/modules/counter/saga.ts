import { takeLatest, put, all, delay } from 'redux-saga/effects';
import {
  INCREMENT_COUNTER_REQUEST,
  incrementCounterAction,
  incrementCounterFailureAction,
  incrementCounterSuccessAction
} from './actions';

// Extremely simple saga that's here just as an example
export function* incrementCounterSaga() {
  try {
    yield delay(1000);
    yield put(incrementCounterAction());
    yield put(incrementCounterSuccessAction());
  } catch (e) {
    yield put(incrementCounterFailureAction());
    console.log('Failed incrementing a counter');
  }
}

export function* watchIncrementCounterSaga() {
  yield all([
    takeLatest([ INCREMENT_COUNTER_REQUEST ], incrementCounterSaga),
  ]);
}
