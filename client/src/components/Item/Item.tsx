import { apiUrlLists } from "../../constants";
import type { ErrorMessage, ListType, DisplayListItemsHandler, UpdateListsHandler, SetCurrentListHandler } from "../../types/types";
import { truncateText } from "../../utils/itemHelpers";
import Button from "../Button/Button";
import styles from './Item.module.css';

type ItemProps = {
  listId: string,
  name: string;
  brand: string;
  barcode: string;
  onDisplayListItems: DisplayListItemsHandler;
  onUpdateLists: UpdateListsHandler;
  onSetCurrentList: SetCurrentListHandler;
};

function Item({ listId, name, brand, barcode, onDisplayListItems, onUpdateLists, onSetCurrentList }: ItemProps) {
  const truncatedItemName = truncateText(name, 70);
  
  const removeButton = {
    width: '60px',
    height: '30px',
    fontSize: '14px',
    float: "right",
  };
  
  async function handleDeleteItemFromList(): Promise<void> {
    try {
      const response: Response = await fetch(`${apiUrlLists}/${listId}/items/${barcode}`, {
        method: "DELETE"
      });

      const data: ListType | ErrorMessage = await response.json();

      if (!response.ok && "message" in data) { 
        throw new Error(data.message);
      }
  
      if ("items" in data) { 
        onUpdateLists(data);
        onSetCurrentList(data);
        onDisplayListItems();
      }
    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.log(error.message);
      }
    }
  }

  return (
    <li className={styles.wrapper}>
      <div>
        <p className={styles.itemBrand}>{brand}</p>
        <p className={styles.itemName}>{`${truncatedItemName}...`}</p>
        <Button
          onClick={handleDeleteItemFromList}
          buttonStyles={removeButton}
        >
          Remove
        </Button>
      </div>
  </li>
  );
}

export default Item;