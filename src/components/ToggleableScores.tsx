/* eslint-disable @typescript-eslint/ban-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import React, { createElement, useState } from 'react';
import TopScores, {
  IScore,
  ITopScoresProps,
} from './TopScores';
import ButtonToggle from './ButtonToggle';
import ScoreboardToggle from './ScoreboardToggle';
import '../App.css';

export interface IToggleableScoresProps {
  options: ScoreboardComponent[];
  className: string;
  scores: Array<IScore>;
  setScores: React.Dispatch<React.SetStateAction<{}>>;
  gameMode: number;
}

export interface ScoreboardComponent {
  name: string;
  component: ({ name }: ITopScoresProps) => JSX.Element;
  scores: {};
  setScores: React.Dispatch<React.SetStateAction<{}>>;
}

type Props = {
  scores: {};
  setScores: React.Dispatch<React.SetStateAction<{}>>;
};

const ToggleableScores = ({
  options,
  className,
  scores,
  setScores,
  gameMode,
}: IToggleableScoresProps) => {
  const [
    currentScoreboard,
    setCurrentScoreboard,
  ] = useState(0);
  return (
    <div className={`${className}`}>
      <div className="scoreboardHeader">
        <h1>Top Scores</h1>
      </div>
      <div>
        {options.map((f, index) => {
          return (
            <ButtonToggle
              key={index}
              toggleScoreboard={() =>
                setCurrentScoreboard(index)
              }
            >
              <h3>{f.name}</h3>
            </ButtonToggle>
          );
        })}
        <ScoreboardToggle
          currentScoreboard={currentScoreboard}
        >
          {options.map((c, index) => {
            return (
              <div key={index}>
                {createElement(c.component, {
                  scores,
                  setScores,
                  gameMode,
                  index,
                })}
              </div>
            );
          })}
        </ScoreboardToggle>
      </div>
    </div>
  );
};

export default ToggleableScores;
