/* eslint-disable @typescript-eslint/ban-types */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './App.css';
import Header from './components/Header';
import WordBar from './components/WordBar';
import { wordList } from './wordList';
import TypingBox from './components/TypingBox';
import CorrectWords from './components/CorrectWords';
import TimeBar from './components/TimeBar';
import Start from './components/Start';
import { ThemeContext } from './themeContext';
import SwitchButton from './components/SwitchButton';
import TopScores, { IScore } from './components/TopScores';
import ToggleableScores from './components/ToggleableScores';
import firebaseDb from './firebase';
import SelectGameModeButton from './components/SelectGameModeButton';
import useScores from './components/useScores';

type items = {
  [key: string]: number | string;
}[];

export const gameModeOptions = [
  { name: 'Mode1', time: 15 },
  { name: 'Mode2', time: 30 },
];

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState(1);
  const [word, setWord] = useState('');
  const [value, setValue] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const GAME_TIME = gameModeOptions[gameMode - 1].time;
  const [time, setTime] = useState(GAME_TIME);
  const [gameOn, setGameOn] = useState(false);

  const focusRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { scores, setScores } = useScores();

  const options = [
    {
      name: 'Mode1',
      component: TopScores,
      scores: scores,
      setScores: setScores,
    },
    {
      name: 'Mode2',
      component: TopScores,
      scores: scores,
      setScores: setScores,
    },
  ];

  useEffect(() => {
    setTime(gameModeOptions[gameMode - 1].time);
  }, [gameMode]);

  useEffect(() => {
    console.log('on ', gameOn);
  }, [gameOn]);

  useEffect(() => {
    setWord(setNextWord());
  }, []);

  const randomWord = () => {
    return wordList[
      Math.floor(Math.random() * wordList.length)
    ];
  };

  const onGameEnd = () => {
    addScore({
      score: correctCount,
      mode: gameMode,
    });
    setGameOn(false);
    setValue('');
  };

  useEffect(() => {
    let intervalId: any;

    if (time === 0) {
      onGameEnd();
    }

    if (gameOn && time > 0) {
      intervalId = setInterval(
        () => setTime((time) => time - 1),
        1000,
      );
    }
    focusRef?.current?.focus();
    return () => clearInterval(intervalId);
  }, [gameOn, time]);

  function stopGame() {
    setGameOn(false);
    setTime(0);
  }

  const handleStartOrRestart = () => {
    if (gameOn) {
      stopGame();
      setCorrectCount(0);
      setTime(GAME_TIME);
      setGameOn(true);
    } else {
      setTime(GAME_TIME);
      setGameOn(true);
    }
  };

  const setNextWord = () => {
    let nextWord = word;
    while (nextWord === word) {
      nextWord = randomWord();
    }
    return nextWord;
  };

  const handleEnter = () => {
    if (time > 0) {
      if (word === value) {
        setCorrectCount(correctCount + 1);
        setWord(setNextWord);
        setValue('');
      }
    }
  };

  const addScore = (obj: any) => {
    console.log('adding');
    firebaseDb
      .child('scores2')
      .push(obj)
      .catch((err: any) => {
        console.log(err);
      });
  };

  function filteredScores() {
    const scoreArray: Array<IScore> = Object.values(
      scores,
    ).map(function (obj: any) {
      return obj;
    });

    scoreArray.sort(function (a: IScore, b: IScore) {
      return parseInt(b.score) - parseInt(a.score);
    });

    return scoreArray.slice(0, 10);
  }

  return (
    <div className={`${theme}-theme`}>
      <Header />
      <h1>Game Mode {gameMode}</h1>
      <WordBar nextWord={word} />
      <CorrectWords count={correctCount} />
      <TypingBox
        value={value}
        setValue={setValue}
        handleEnter={handleEnter}
        time={time}
        ref={focusRef}
        gameOn={gameOn}
      />
      <TimeBar time={time} />
      {gameMode != 0 && (
        <Start
          gameOn={gameOn}
          handleStartOrRestart={handleStartOrRestart}
        />
      )}
      {
        <SelectGameModeButton
          gameMode={gameMode}
          setGameMode={setGameMode}
          options={gameModeOptions}
          gameOn={gameOn}
        />
      }
      <ToggleableScores
        options={options}
        className="scoreboard"
        scores={filteredScores()}
        setScores={setScores}
        gameMode={gameMode}
      />
      <SwitchButton
        name="Switch Theme"
        onClick={toggleTheme}
        className="button"
      />
    </div>
  );
};

export default App;
