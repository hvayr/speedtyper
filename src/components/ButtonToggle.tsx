import React from 'react';

interface IButtonToggleProps {
  children: React.ReactNode;
  toggleScoreboard: any;
}

const ButtonToggle = ({ children, toggleScoreboard }: IButtonToggleProps) => {
  return <button onClick={() => toggleScoreboard()}>{children}</button>;
};

export default ButtonToggle;
