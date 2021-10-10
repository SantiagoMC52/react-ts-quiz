/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import loadQuestions from '../../redux/actions/actionCreators';
import './style.scss';

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

  const handleListItemClick = (item: boolean, event: any) => {
    const count = counter + 1;
    setAnswerSelected(true);
    setSelectedAnswer(event.target.textContent);
    countScore(item);

    if (count < questions.length) {
      setTimeout(() => {
        setCounter(counter + 1);
        setAnswerSelected(false);
        setSelectedAnswer(null);
      }, 2500);
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 2500);
    }
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
    <div className="main">
      {showScore ? (
        <div className="main__score">
          You scored
          {' '}
          {score}
          {' '}
          out of
          {' '}
          {questions.length}
        </div>
      ) : (question ? (
        <div className="main_board">
          <h2 className="main_board-title">
            Question
            {' '}
            {counter + 1}
          </h2>
          <h3 className="main_board-question" dangerouslySetInnerHTML={{ __html: question.question }} />
          <div className="answers-container">
            {question.answers.map((item: IQuestion) => (
              <button
                type="button"
                key={item.item}
                onClick={() => handleListItemClick(item.answer, event)}
                className={getClass(item.item)}
                dangerouslySetInnerHTML={{ __html: item.item }}
              />
            ))}
          </div>
        </div>
      ) : '')}
    </div>
  );
};

export default Questioncard;
