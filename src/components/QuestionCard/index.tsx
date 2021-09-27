import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import loadQuestions from '../../redux/actions/actionCreators';

const Questioncard:FC = () => {
  const questions = useSelector((store: RootStateOrAny) => store.questionsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!questions.length) dispatch(loadQuestions());
  }, []);
  // eslint-disable-next-line no-console
  console.log(questions);
  return (
    <h2>Question Card</h2>
  );
};

export default Questioncard;
