/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import loadQuestions from '../../redux/actions/actionCreators';
import './style.css';

interface IQuestion {
  item: string;
  answer: boolean;
}

const Questioncard:FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answerSelected, setAnswerSelected] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const questions = useSelector((store: RootStateOrAny) => store.questionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!questions.length) dispatch(loadQuestions());
  }, []);

  const question = questions[counter];

  const countScore = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = (): void => {
    const count = counter + 1;

    if (count < questions.length) {
      setCounter(counter + 1);
      setAnswerSelected(false);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handleListItemClick = (item: boolean, event: any) => {
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);
    countScore(item);
  };

  const getClass = (option: string) => {
    if (!answerSelected) {
      return '';
    }
    if (option === question.correct_answer) {
      return 'correct';
    }
    if (option === selectedAnswer) {
      return 'selected';
    }
    return '';
  };

  return (
    <div>
      {showScore ? (
        <div>
          You scored
          {' '}
          {score}
          {' '}
          out of
          {' '}
          {questions.length}
        </div>
      ) : (question ? (
        <>
          <h2>Question Card</h2>
          <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
          <ul>
            {question.answers.map((item: IQuestion) => (
              <li
                key={item.item}
                onClick={() => handleListItemClick(item.answer, event)}
                className={getClass(item.item)}
                dangerouslySetInnerHTML={{ __html: item.item }}
              />
            ))}
          </ul>
          <button onClick={() => nextQuestion()} type="button"> Next</button>
        </>
      ) : '')}
    </div>
  );
};

export default Questioncard;
