import type { ListType, DisplayListItemsHandler, UpdateListsHandler, SetCurrentListHandler } from "../../types/types";
import Item from "../Item/Item";
import styles from './Items.module.css';

type ItemsProps = {
  list: ListType | null;
  onDisplayListItems: DisplayListItemsHandler;
  onUpdateLists: UpdateListsHandler;
  onSetCurrentList: SetCurrentListHandler;
};

function Items({ list, onDisplayListItems, onUpdateLists, onSetCurrentList }: ItemsProps) {
  return (
    <div className={styles.wrapper}>
      <ul>
        {list && list.items.map(({ barcode, name, brand }) => (
          <Item
            key={barcode}
            listId={list._id}
            name={name}
            brand={brand}
            barcode={barcode}
            onDisplayListItems={onDisplayListItems}
            onUpdateLists={onUpdateLists}
            onSetCurrentList={onSetCurrentList}
          />))
        }
      </ul>
    </div>  
  );
}

export default Items;