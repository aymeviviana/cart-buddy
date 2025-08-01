import ListLink from '../ListLink/ListLink';
import type { ListType, DisplayListItemsHandler, SetCurrentListHandler, DeleteListHandler } from '../../types/types';
import styles from './Lists.module.css';

type ListsProps = {
  lists: ListType[] | [];
  onDisplayListItems: DisplayListItemsHandler;
  onSetCurrentList: SetCurrentListHandler;
  onDeleteList: DeleteListHandler;
};

function Lists({ lists, onDisplayListItems, onSetCurrentList, onDeleteList }: ListsProps) { 
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>My Lists</h1>
      <ul className={styles.lists}>
        {lists.map( list => (  
          <ListLink 
            key={list._id}
            list={list}
            onDisplayListItems={onDisplayListItems}
            onSetCurrentList={onSetCurrentList}
            onDeleteList={onDeleteList}
          />
        ))}
      </ul>
    </div>
  );
}

export default Lists;