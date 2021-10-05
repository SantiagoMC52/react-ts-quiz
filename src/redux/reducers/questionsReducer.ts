/* eslint-disable camelcase */
import actionTypes from '../actions/actionTypes';

const initialState = {
  questions: []
};

interface IQuestions {
  questions: string[];
}

type Action = {
    type: string;
    questions: string[];
}

function questionsReducer(allQuestions:IQuestions = initialState, action: Action) {
  if (action.type === actionTypes.LOAD_QUESTIONS) {
    return action.questions;
  }
  return allQuestions;
}

export default questionsReducer;
