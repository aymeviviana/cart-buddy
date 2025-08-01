import Button from '../Button/Button';
import type { ButtonStyles, ClickHandler } from '../../types/types';
import styles from './Welcome.module.css';

type WelcomeProps = {
  onDisplayNewListForm: ClickHandler;
  onDisplayLists: ClickHandler;
};


function Welcome({ onDisplayNewListForm, onDisplayLists }: WelcomeProps) { 
  const buttonStyles: ButtonStyles = {
    display: "block",
    margin: "0 auto",
    marginTop: "30px"
  };
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Cart Buddy</h1>
      <Button
        onClick={onDisplayLists}
        buttonStyles={buttonStyles}
      >
        See My Lists
      </Button>
    
      <Button
        onClick={onDisplayNewListForm}
        buttonStyles={buttonStyles}
      >
        Create a New List
      </Button>
  </div>
  );
}

export default Welcome;