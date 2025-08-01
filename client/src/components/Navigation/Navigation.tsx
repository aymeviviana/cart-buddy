import Button from '../Button/Button';
import type { ButtonStyles, ClickHandler } from '../../types/types';
import styles from './Navigation.module.css';

type NavigationProps = {
  onDisplayNewListForm: ClickHandler;
  onDisplayLists: ClickHandler;
};

function Navigation({ onDisplayNewListForm, onDisplayLists }: NavigationProps) { 
  const myListsButton: ButtonStyles = {
    float: "left",
    width: "48%",
  };

  const newListButton: ButtonStyles = {
    float: "right",
    width: "48%",
  };
  
  return (
    <nav className={styles.wrapper}>
      <Button
        onClick={onDisplayLists}
        buttonStyles={myListsButton}
      >
        My Lists
      </Button>

      <Button
        onClick={onDisplayNewListForm}
        buttonStyles={newListButton}
      >
        New List
      </Button>
    </nav>
  );
}

export default Navigation;