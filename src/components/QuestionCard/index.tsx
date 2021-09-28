/* eslint-disable react/no-danger */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import loadQuestions from '../../redux/actions/actionCreators';

const Questioncard:FC = () => {
  // eslint-disable-next-line no-unused-vars
  const [counter, setCounter] = useState(0);
  const questions = useSelector((store: RootStateOrAny) => store.questionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions.length) dispatch(loadQuestions());
  }, []);

  const nextQuestion = () => {
    // setCounter(counter + 1);
  };

  let answers: any = [];

  if (questions.length) {
    const correctAnswers = { answer: questions[counter].correct_answer, correct: true };
    const wrongAnswers = questions[counter].incorrect_answers
      .map((answer: string) => ({ answer, correct: false }));
    answers = [correctAnswers, ...wrongAnswers];
    answers.sort(() => Math.random() - 0.5);
    // eslint-disable-next-line no-console
    console.log(answers);
  }

  return (
    <>
      <h2>Question Card</h2>
      {questions.length ? <h3 dangerouslySetInnerHTML={{ __html: questions[counter].question }} /> : ''}
      {questions.length ? answers.map((item: any) => <p><button onClick={() => nextQuestion()} style={{ background: `${item.correct ? 'green' : 'red'}` }} type="button">{item.answer}</button></p>) : ''}
      {/* <button type="button" onClick={() => nextQuestion()}>Next</button> */}
    </>
  );
};

export default Questioncard;
