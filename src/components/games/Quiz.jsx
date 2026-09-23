import { useState } from 'react';
import Ransom from '../shared/Ransom.jsx';
import { quiz } from '../../data/quiz.js';
import { useSfx } from '../../context/SfxContext.jsx';
import useLocalBest from '../../hooks/useLocalBest.js';

const rankFor = (score) => {
  const ratio = score / quiz.length;
  if (ratio === 1) return 'S';
  if (ratio >= 0.75) return 'A';
  if (ratio >= 0.5) return 'B';
  return 'C';
};

export default function Quiz() {
  const { play } = useSfx();
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [best, submitBest] = useLocalBest('p5-quiz-best', 'max');

  const q = quiz[index];
  const answered = chosen !== null;

  const pick = (i) => {
    if (answered) return;
    setChosen(i);
    if (i === q.answer) {
      setScore((s) => s + 1);
      play('match');
    } else {
      play('miss');
    }
  };

  const next = () => {
    if (index + 1 >= quiz.length) {
      submitBest(score);
      setFinished(true);
      play('win');
      return;
    }
    setIndex((i) => i + 1);
    setChosen(null);
    play('select');
  };

  const restart = () => {
    setIndex(0);
    setChosen(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="game">
        <div className="result result--solo" role="status">
          <Ransom text={`Rango ${rankFor(score)}`} seed={41} className="result__title" />
          <p>
            Acertaste {score} de {quiz.length}. Mejor marca: {best === null ? score : Math.max(best, score)}.
          </p>
          <button className="btn btn--red" onClick={restart}>
            <span>Reintentar</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="hud">
        <p>
          Pregunta{' '}
          <strong>
            {index + 1}/{quiz.length}
          </strong>
        </p>
        <p>
          Aciertos <strong>{score}</strong>
        </p>
        <p>
          Récord <strong>{best === null ? '-' : best}</strong>
        </p>
      </div>

      <h4 className="quiz__q">{q.q}</h4>
      <ul className="quiz__opts">
        {q.options.map((opt, i) => {
          const isRight = answered && i === q.answer;
          const isWrong = answered && i === chosen && i !== q.answer;
          return (
            <li key={opt}>
              <button
                className={`quiz__opt ${isRight ? 'is-right' : ''} ${isWrong ? 'is-wrong' : ''}`}
                onClick={() => pick(i)}
                disabled={answered}
              >
                <span>
                  {opt}
                  {isRight && <b> ✔</b>}
                  {isWrong && <b> ✘</b>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {answered && (
        <div className="quiz__why" role="status">
          <p>{q.why}</p>
          <button className="btn btn--red" onClick={next}>
            <span>{index + 1 >= quiz.length ? 'Ver resultado' : 'Siguiente'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
