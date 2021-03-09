import React from 'react';

interface IProps {
  name: string;
  onClick: () => void;
  className: string;
}

const SwitchButton = ({
  name,
  onClick,
  className,
}: IProps) => {
  return (
    <button onClick={onClick} className={`${className}`}>
      {name}
    </button>
  );
};

export default SwitchButton;
