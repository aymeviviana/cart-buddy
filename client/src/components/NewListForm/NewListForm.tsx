import type { AddListHandler, ClickHandler, DisplayListItemsHandler, TextInputHandler, SetCurrentListHandler, ListType, ErrorMessage, ButtonStyles, SubmitFormEvent } from "../../types/types";
import Button from "../Button/Button";
import { useState } from "react";
import { LISTS_ENDPOINT } from "../../constants";
import styles from './NewListForm.module.css';

type NewListFormProps = {
  onDisplayLists: ClickHandler;
  onAddList: AddListHandler
  onDisplayListItems: DisplayListItemsHandler;
  onSetCurrentList: SetCurrentListHandler;
};

function NewListForm({
  onDisplayLists,
  onAddList,
  onDisplayListItems,
  onSetCurrentList
}: NewListFormProps
) { 
  const [newListName, setNewListName] = useState("");
  
  async function handleSubmitNewList(event: SubmitFormEvent): Promise<void> { 
    event.preventDefault();

    const nextList = {
      name: newListName,
      items:[]
    };

    try {
      const response: Response = await fetch(LISTS_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(nextList),
        headers: {"Content-Type": "application/json; charset=utf-8"},
      });

      const data: ListType | ErrorMessage = await response.json();

      if (!response.ok && "message" in data) { 
        throw new Error(data.message);
      }
      
      if ("items" in data) { 
        onAddList(data);
        onSetCurrentList(data);
        onDisplayListItems();
      }
      
    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.log(error.message);
      }
    }
  }

  const handleNewListChange: TextInputHandler = (event) => setNewListName(event.target.value);

  const buttonStyles: ButtonStyles = {
    width: "30%",
  };

  return (
    <form
      className={styles.formWrapper}
      onSubmit={handleSubmitNewList}
    >
      <figure className={styles.nameWrapper}>
        <label>
          Name:
          <input
            type="text"
            placeholder="ex: Grocery List"
            value={newListName}
            onChange={handleNewListChange}
          />
        </label>
      </figure>
      <figure className={styles.buttons}>
        <input
          type="submit"
          value="Save"
        />

        <Button
          onClick={onDisplayLists}
          buttonStyles={buttonStyles}
        >
          Cancel
        </Button>
      </figure>
    </form>
  );
}

export default NewListForm;