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
    const { questions } = action;
    const newQuestions = questions.map((question: any) => ({
      ...question,
      answers: [{ item: question.correct_answer, answer: true }, ...question.incorrect_answers
        .map((item: any) => ({ item, answer: false }))].sort(() => Math.random() - 0.5)
    }));
    return newQuestions;
  }
  return allQuestions;
}

export default questionsReducer;
