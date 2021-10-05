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
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answers, setAnswers] = useState<any>([]);
  const questions = useSelector((store: RootStateOrAny) => store.questionsReducer);
  const dispatch = useDispatch();
  console.log(questions);

  useEffect(() => {
    if (!questions.length) dispatch(loadQuestions());
  }, []);

  useEffect(() => {
    if (questions.length) {
      const correctAnswers = { answer: questions[counter].correct_answer, correct: true };
      const wrongAnswers = questions[counter].incorrect_answers.map((
        answer: string
      ) => ({ answer, correct: false }));
      setAnswers([correctAnswers, ...wrongAnswers].sort(() => Math.random() - 0.5));
    }
  }, [counter]);
  console.log(answers);

  const countScore = (correct: boolean) => {
    if (correct) {
      console.log('Answer correct');
      setScore(score + 1);
    }
    setDisplayAnswer(true);
  };

  const nextQuestion = (): void => {
    const count = counter + 1;

    if (count < questions.length) {
      setCounter(counter + 1);
      setDisplayAnswer(false);
    } else {
      setShowScore(true);
    }
  };

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
              {answers.map((item: any) => {
                const bgColor = displayAnswer
                  ? questions[counter].correct_answer === item.answer
                    ? 'green'
                    : 'red'
                  : 'blue';
                return (
                  <p key={item.answer}>
                    <button
                      style={{ backgroundColor: bgColor, color: 'white' }}
                      type="button"
                      onClick={() => countScore(item.correct)}
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </p>
                );
              })}
              <button onClick={() => nextQuestion()} type="button"> Next</button>
            </>
          ) : ''
        )
      }
    </div>
  );
};

export default Questioncard;
