/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from 'react';
import firebaseDb from '../firebase';

const useScores: () => {
  scores: {};
  setScores: React.Dispatch<React.SetStateAction<{}>>;
} = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    firebaseDb
      .child('scores2')
      .on('value', (snapshot: any) => {
        if (snapshot.val() != null) {
          setScores({
            ...snapshot.val(),
          });
        }
      });
  }, []);

  return { scores, setScores };
};

export default useScores;
