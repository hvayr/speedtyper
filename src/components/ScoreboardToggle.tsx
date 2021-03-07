import React from 'react';

interface IScoreboardToggleProps {
  currentScoreboard: number;
  children: any;
}

const ScoreboardToggle: React.FC<IScoreboardToggleProps> = ({
  currentScoreboard,
  children,
}: IScoreboardToggleProps) => {
  return <div>{children[currentScoreboard]}</div>;
};

export default ScoreboardToggle;
