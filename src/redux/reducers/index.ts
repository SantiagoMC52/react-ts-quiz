import { combineReducers } from 'redux';
import questionsReducer from './questionsReducer';
// import questionReducer from './questionReducer';

export const rootReducer = combineReducers({
  questionsReducer
//   questionReducer
});

export default rootReducer;
