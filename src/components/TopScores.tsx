/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import firebaseDb from '../firebase';
import { gameModeOptions } from '../App';

export interface IScore {
  score: string;
  mode: number;
}

export interface ITopScoresProps {
  name?: string;
  scores: Array<IScore>;
  setScores: React.Dispatch<React.SetStateAction<{}>>;
  gameMode: number;
  index: number;
  // add: (obj: any) => JSX.Element;
}

type items = {
  [key: string]: number | string;
}[];

const TopScores = ({
  name,
  scores,
  setScores,
  gameMode,
  index,
}: ITopScoresProps) => {
  useEffect(() => {
    firebaseDb.child('scores').on('value', (snapshot: any) => {
      if (snapshot.val() != null) {
        setScores({
          ...snapshot.val(),
        });
      }
    });
  }, []);

  function filteredScores() {
    let scoreArray: Array<IScore> = Object.values(scores).map(function (
      obj: IScore,
    ) {
      return obj;
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    scoreArray = scoreArray.map((s: IScore) => {
      if (s.mode === index + 1) {
        return s;
      }
    });
    const sA = scoreArray
      .sort(function (a: IScore, b: IScore) {
        return parseInt(b.score) - parseInt(a.score);
      })
      .slice(0, 5);

    console.log('sa ', sA);

    return sA;
  }

  return (
    <div className="scoreboard">
      <h1>{name}</h1>
      {filteredScores()?.map((s: IScore | undefined, i: number) => {
        if (s) {
          return <h1 key={i}>{`${i + 1}. ${s.score} words`}</h1>;
        }
      })}
    </div>
  );
};

export default TopScores;
