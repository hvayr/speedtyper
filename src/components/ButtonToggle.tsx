import React from 'react';

interface IButtonToggleProps {
  children: React.ReactNode;
  toggleScoreboard: any;
}

const ButtonToggle: React.FC<IButtonToggleProps> = ({
  children,
  toggleScoreboard,
}: IButtonToggleProps) => {
  return (
    <button onClick={() => toggleScoreboard()}>
      {children}
    </button>
  );
};

export default ButtonToggle;
