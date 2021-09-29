/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import loadQuestions from '../../redux/actions/actionCreators';

const Questioncard:FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const questions = useSelector((store: RootStateOrAny) => store.questionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions.length) dispatch(loadQuestions());
  }, []);

  const nextQuestion = (correct: boolean): void => {
    const count = counter + 1;

    if (correct) {
      console.log('Answer correct');
      setScore(score + 1);
    }

    if (count < questions.length) {
      setCounter(counter + 1);
    } else {
      setShowScore(true);
    }
  };

  let answers:{answer: string, correct: boolean}[] = [];

  if (questions.length) {
    const correctAnswers = { answer: questions[counter].correct_answer, correct: true };
    const wrongAnswers = questions[counter].incorrect_answers.map((
      answer: string
    ) => ({ answer, correct: false }));
    answers = [correctAnswers, ...wrongAnswers];
    answers.sort(() => Math.random() - 0.5);
    console.log(answers);
  }

  return (
    <div>
      {
        showScore ? (
          <div>
            You scored
            {' '}
            {score}
            {' '}
            out of
            {' '}
            {questions.length}
          </div>
        ) : (
          questions.length ? (
            <>
              <h2>Question Card</h2>
              <h3 dangerouslySetInnerHTML={{ __html: questions[counter].question }} />
              {answers.map((item: any) => (
                <p key={item.answer}>
                  <button
                    type="button"
                    onClick={() => nextQuestion(item.correct)}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </p>
              ))}
            </>
          ) : ''
        )
      }
    </div>
  );
};

export default Questioncard;
