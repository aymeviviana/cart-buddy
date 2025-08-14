import type { ButtonStyles, ClickHandler, DisplayListItemsHandler, ListType, SetCurrentListHandler, UpdateListsHandler } from "../../types/types";
import Items from '../Items/Items';
import Button from "../Button/Button";
import Message from "../Message/Message";
import styles from './List.module.css';

type ListProps = {
  list: ListType | null;
  onDisplaySearchForm: ClickHandler;
  onDisplayListItems: DisplayListItemsHandler;
  onUpdateLists: UpdateListsHandler;
  onSetCurrentList: SetCurrentListHandler;
};

function List({ list, onDisplaySearchForm, onDisplayListItems, onUpdateLists, onSetCurrentList }: ListProps) { 
  const buttonStyles: ButtonStyles = {
    margin: "15px 0 15px 0",
    width: "40%",
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>{list && list.name}</h1>

      <Button
        onClick={onDisplaySearchForm}
        buttonStyles={buttonStyles}
      >
        Add Item
      </Button>
      
      {list?.items.length === 0
        ? <Message
            message="List is currently empty"
          />
        : <Items
            list={list}
            onDisplayListItems={onDisplayListItems}
            onUpdateLists={onUpdateLists}
            onSetCurrentList={onSetCurrentList}
          />}
    </div>
  );
}

export default List;