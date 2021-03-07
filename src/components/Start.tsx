import React from 'react';

interface IProps {
  gameOn: boolean;
  handleStartOrRestart: () => void;
}

const Start: React.FC<IProps> = ({ gameOn, handleStartOrRestart }: IProps) => {
  return (
    <div className="start">
      <button onClick={handleStartOrRestart}>
        {gameOn ? 'Restart' : 'Start'}
      </button>
    </div>
  );
};

export default Start;
