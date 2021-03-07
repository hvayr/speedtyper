/* eslint-disable @typescript-eslint/ban-types */
import React, { useContext, useEffect, useRef, useState } from 'react';
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

type items = {
  [key: string]: number | string;
}[];

export const gameModeOptions = [{ name: 'Mode1' }, { name: 'Mode2' }];

const App: React.FC = () => {
  const GAME_TIME = 5;

  const [gameMode, setGameMode] = useState(0);
  const [word, setWord] = useState('');
  const [scores, setScores] = useState({});
  const [value, setValue] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [time, setTime] = useState(GAME_TIME);
  const [gameOn, setGameOn] = useState(false);

  const focusRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

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
    console.log('gamemode ', gameMode);
    console.log('options ', gameModeOptions[0]);
  }, [gameMode]);

  useEffect(() => {
    setWord(setNextWord());
  }, []);

  const randomWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)];
  };

  const onGameEnd = () => {
    addScore({
      score: correctCount,
      mode: gameMode,
    });
  };

  useEffect(() => {
    let intervalId: any;

    if (time === 0) {
      onGameEnd();
    }

    if (gameOn && time > 0) {
      intervalId = setInterval(() => setTime((time) => time - 1), 1000);
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
    firebaseDb
      .child('scores')
      .push(obj)
      .catch((err: any) => {
        console.log(err);
      });
  };

  function filteredScores() {
    const scoreArray: Array<IScore> = Object.values(scores).map(function (
      obj: any,
    ) {
      return obj;
    });

    scoreArray.sort(function (a: IScore, b: IScore) {
      return parseInt(b.score) - parseInt(a.score);
    });

    console.log('scoreArray ', scoreArray);

    return scoreArray.slice(0, 10);
  }

  return (
    <div className={`${theme}-theme`}>
      <Header />
      <WordBar nextWord={word} />
      <CorrectWords count={correctCount} />
      <TypingBox
        value={value}
        setValue={setValue}
        handleEnter={handleEnter}
        time={time}
        ref={focusRef}
      />
      <TimeBar time={time} />
      {gameMode != 0 && (
        <Start gameOn={gameOn} handleStartOrRestart={handleStartOrRestart} />
      )}
      {
        <SelectGameModeButton
          gameMode={gameMode}
          setGameMode={setGameMode}
          options={gameModeOptions}
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
