import styles from './ListLink.module.css';
import type { ListType, DisplayListItemsHandler, SetCurrentListHandler, ListId, ErrorMessage, DeleteListHandler } from '../../types/types';
import { ENDPOINT } from '../../constants';

type ListLinkProps = {
  list: ListType;
  onDisplayListItems: DisplayListItemsHandler;
  onSetCurrentList: SetCurrentListHandler;
  onDeleteList: DeleteListHandler;
};

function ListLink({ list, onDisplayListItems, onSetCurrentList, onDeleteList }: ListLinkProps) { 
  
  function handleDisplayList(list: ListType): void { 
    onSetCurrentList(list);
    onDisplayListItems();
  }

  async function handleSubmitDeleteList(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response: Response = await fetch(`${ENDPOINT}/${list._id}`, {
        method: "DELETE",
      });

      const data: ListId | ErrorMessage = await response.json();

      if (!response.ok && "message" in data) { 
        throw new Error(data.message);
      }

      if ("_id" in data) { 
        onDeleteList(data._id);
      }

    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.log(error.message);
      }
    }
  }

  return (
    <li
      className={styles.listWrapper}
      onClick={() => handleDisplayList(list)}
    >
      <a>
        {list.name}
      </a>
      <img
        className={styles.delete}
        src="./src/assets/trash-can-50.png"
        onClick={(event) => handleSubmitDeleteList(event)}
      />
    </li>
  );
}


export default ListLink;