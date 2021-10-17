import { all, spawn, call } from 'redux-saga/effects';
import { watchIncrementCounterSaga } from './modules/counter/saga';

export default function* allSagas() {
  const sagas = [
      watchIncrementCounterSaga,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function*() {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(`Error ${e}`);
          }
        }
      })
    )
  );
}
