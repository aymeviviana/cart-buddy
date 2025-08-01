import React from 'react';
import styles from './Button.module.css';
import type { ButtonStyles, ClickHandler } from '../../types/types';

type ButtonProps = {
  onClick: ClickHandler;
  buttonStyles?: ButtonStyles;
  children: React.ReactNode;
};

function Button({ onClick, buttonStyles, children }: ButtonProps) { 
  return (
    <button
      className={styles.btn}
      style={buttonStyles}
      onClick={onClick}
    >
      { children }
    </button>
  );
}

export default Button;