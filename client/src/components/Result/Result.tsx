import Button from '../Button/Button';
import styles from './Result.module.css';
import type { ButtonStyles, ListType, ErrorMessage, DisplayListItemsHandler, UpdateListsHandler, SetCurrentListHandler } from '../../types/types';
import { apiUrlLists } from '../../constants';
import { truncateText } from '../../utils/itemHelpers';

type ResultProps = {
  barcode: string;
  name: string;
  brand: string;
  list: ListType | null;
  onDisplayListItems: DisplayListItemsHandler;
  onUpdateLists: UpdateListsHandler;
  onSetCurrentList: SetCurrentListHandler;
};

function Result({ barcode, name, brand, list, onDisplayListItems, onUpdateLists, onSetCurrentList }: ResultProps) { 
  const truncatedItemName: string = truncateText(name, 70);
  
  const addItemButton: ButtonStyles = {
    float: "right",
    width: "80px",
    height: "40px",
    fontSize: "18px",
  };
  
  async function handleSubmitAddItemToList(): Promise<void> { 
    const newItem = { barcode, brand, name };
    try {
      const response: Response = await fetch(`${apiUrlLists}/${list?._id}/items`, {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {"Content-Type": "application/json; charset=utf-8"},
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
        <p className={styles.itemName}>{`${truncatedItemName} ...`}</p>
        <Button
          onClick={handleSubmitAddItemToList}
          buttonStyles={addItemButton}
        >
          Add
        </Button>
      </div>
    </li>
  );
}

export default Result;