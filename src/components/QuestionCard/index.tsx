import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import loadQuestions from '../../redux/actions/actionCreators';

const Questioncard:FC = () => {
  const [counter, setCounter] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const questions = useSelector((store: RootStateOrAny) => store.questionsReducer);
  const dispatch = useDispatch();

  const question = questions[counter];

  useEffect(() => {
    if (!questions.length) dispatch(loadQuestions());
  }, []);

  const countScore = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
  };

  const checkAnswer = (correct: boolean, event: any) => {
    const count = counter + 1;

    countScore(correct);
    setAnswer(event.target.textContent);
    setDisplayAnswer(true);

    if (count < questions.length) {
      setTimeout(() => {
        setCounter(counter + 1);
        setDisplayAnswer(false);
        setAnswer(null);
      }, 2500);
    } else {
      setTimeout(() => {
        setShowScore(true);
      }, 2500);
    }
  };

  const playAgain = () => {
    window.location.reload();
    // setCounter(0);
    // setShowScore(false);
    // setScore(0);
    // setDisplayAnswer(false);
    // setAnswer(null);
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

            <button type="button" onClick={playAgain}>Play again</button>
          </div>
        ) : (
          <>
            <h2>Question Card</h2>
            <h3 dangerouslySetInnerHTML={{ __html: question?.question }} />
            {question?.answers?.map((item: any) => {
              const bgColor = displayAnswer
                ? question.correct_answer === item.item
                  ? 'green'
                  : 'red'
                    ? answer === item.item
                      ? 'red'
                      : 'black'
                    : ''
                : 'black';
              return (
                <p key={item.item}>
                  <button
                    style={{ backgroundColor: bgColor, color: 'white' }}
                    type="button"
                    onClick={() => checkAnswer(item.answer, event)}
                    dangerouslySetInnerHTML={{ __html: item.item }}
                  />
                </p>
              );
            })}
          </>
        )
      }
    </div>
  );
};

export default Questioncard;
