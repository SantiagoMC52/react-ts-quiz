/* eslint-disable camelcase */
import actionTypes from '../actions/actionTypes';

type Action = {
    type: string;
    questions: string[];
}

function questionsReducer(allQuestions: any = [], action: Action) {
  if (action.type === actionTypes.LOAD_QUESTIONS) {
    return action.questions;
  }
  return allQuestions;
}

export default questionsReducer;
