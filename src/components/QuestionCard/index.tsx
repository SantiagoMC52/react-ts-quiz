import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import loadQuestions from '../../redux/actions/actionCreators';

const Questioncard:FC = () => {
  const [counter, setCounter] = useState(0);
  const questions = useSelector((store: RootStateOrAny) => store.questionsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!questions.length) dispatch(loadQuestions());
  }, []);
  const nextQuestion = () => {
    setCounter(counter + 1);
  };
  return (
    <>
      <h2>Question Card</h2>
      {questions.length ? <h3 dangerouslySetInnerHTML={{ __html: questions[counter].question }} /> : ''}
      <p>{questions.length ? questions[counter].correct_answer : ''}</p>
      {questions.length ? questions[counter].incorrect_answers.map((answer: string) => <p>{answer}</p>) : ''}
      <button type="button" onClick={() => nextQuestion()}>Next</button>
    </>
  );
};

export default Questioncard;
