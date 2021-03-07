import React from 'react';

interface IProps {
  count: number;
}

const CorrectWords: React.FC<IProps> = ({ count }: IProps) => {
  return (
    <div className="correctWords">
      <h2>Words: {count}</h2>
    </div>
  );
};

export default CorrectWords;
