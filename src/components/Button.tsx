import React from 'react';

const Button: React.FC<{
  onPress: () => void;
  btnText: string;
  btnClassName: string;
}> = props => {
  const { onPress, btnText, btnClassName } = props;

  return (
    <button className={`button ${btnClassName}`} onClick={onPress}>
      {btnText}
    </button>
  );
};

export default Button;
