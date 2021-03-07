import React from 'react';

type Props = {
  nextWord: string;
};

const WordBar: React.FC<Props> = ({ nextWord }: Props) => {
  return (
    <div className="wordBar">
      <h3>Type word:</h3>
      <h1>{nextWord}</h1>
    </div>
  );
};

export default WordBar;
