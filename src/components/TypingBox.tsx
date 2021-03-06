import React, { forwardRef, useState } from 'react';

interface IProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleEnter: () => void;
  time: number;
  gameOn: boolean;
}

const TypingBox = forwardRef<HTMLInputElement, IProps>(
  (Props, ref) => {
    const {
      value,
      setValue,
      handleEnter,
      time,
      gameOn,
    } = Props;
    const onTextChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (time > 0 && gameOn) {
        setValue(e.target.value);
      }
    };

    return (
      <div className="typingBox">
        <input
          type="text"
          value={value}
          onChange={onTextChange}
          onKeyPress={(e) => {
            e.key === 'Enter' ? handleEnter() : null;
          }}
          ref={ref}
        />
      </div>
    );
  },
);

TypingBox.displayName = 'TypingBox';
export default TypingBox;
