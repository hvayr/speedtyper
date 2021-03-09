import React from 'react';

interface IProps {
  time: number;
}

const TimeBar: React.FC<IProps> = ({ time }: IProps) => {
  return (
    <div className="time">
      <h2>Time remaining</h2>
      <h1>{time}</h1>
    </div>
  );
};

export default TimeBar;
