import axios from 'axios';
import { Dispatch } from 'redux';
import actionTypes from './actionTypes';

const url = 'https://opentdb.com/api.php?amount=50&category=9&type=multiple';

export default function loadQuestions() {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios(url);
      dispatch({
        type: actionTypes.LOAD_QUESTIONS,
        questions: data
      });
    } catch (error) {
      dispatch({
        type: actionTypes.LOAD_QUESTIONS_ERROR
      });
    }
  };
}
