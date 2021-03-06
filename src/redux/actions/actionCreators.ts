import axios from 'axios';
import { Dispatch } from 'redux';
import actionTypes from './actionTypes';

const url = 'https://opentdb.com/api.php?amount=5&category=9&type=multiple';

export default function loadQuestions() {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios(url);
      dispatch({
        type: actionTypes.LOAD_QUESTIONS,
        questions: data.results
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_QUESTIONS_ERROR
      });
    }
  };
}
