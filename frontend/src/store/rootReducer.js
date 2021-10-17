import { combineReducers } from 'redux';
import counterReducer from './modules/counter/reducer';

export default combineReducers({
    counter: counterReducer
});
