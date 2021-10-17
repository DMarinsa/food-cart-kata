import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const composedMiddleware = [
  applyMiddleware(sagaMiddleware),
];

// Add Redux dev tools if available in non-production environments
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
if (process.env.NODE_ENV !== 'production') {
  window.__REDUX_DEVTOOLS_EXTENSION__ && composedMiddleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const composedEnhancers = compose(...composedMiddleware);

export default createStore(rootReducer, composedEnhancers);

sagaMiddleware.run(rootSaga);
