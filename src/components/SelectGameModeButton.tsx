import React from 'react';

interface IProps {
  gameMode: number;
  setGameMode: React.Dispatch<React.SetStateAction<number>>;
  options: GameModeOption[];
  gameOn: boolean;
}

type GameModeOption = {
  name: string;
};

const SelectGameModeButton = ({
  gameMode,
  setGameMode,
  options,
  gameOn,
}: IProps) => {
  return (
    <div>
      {options.map((m, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              if (!gameOn) {
                setGameMode(i + 1);
              }
            }}
          >
            {m.name}
          </button>
        );
      })}
    </div>
  );
};

export default SelectGameModeButton;
