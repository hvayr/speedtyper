import React, { useEffect, useState } from 'react';
import firebaseDb from '../firebase';

const useScores = () => {
  const [scores, setScores] = useState({});

  useEffect(() => {
    firebaseDb.child('scores').on('value', (snapshot: any) => {
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
