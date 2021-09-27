import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';

export const rootReducer = combineReducers({
  questionsReducer
});

export default rootReducer;
