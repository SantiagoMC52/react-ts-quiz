import actionTypes from '../actions/actionTypes';

interface IQuestions {
    type: string;
    questions: [];
}

function questionsReducer(allQuestions: any = [], action: IQuestions) {
  if (action.type === actionTypes.LOAD_QUESTIONS) { return action.questions; }
  return allQuestions;
}

export default questionsReducer;
