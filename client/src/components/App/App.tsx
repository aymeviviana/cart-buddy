import { useState, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import Welcome from '../Welcome/Welcome';
import Lists from '../Lists/Lists';
import NewListForm from '../NewListForm/NewListForm';
import List from '../List/List';
import type { ClickHandler, AddListHandler, ListType, DisplayListItemsHandler, SetCurrentListHandler, ErrorMessage, DeleteListHandler } from '../../types/types';
import { ENDPOINT } from '../../constants';
import styles from './App.module.css';

function App() {
  const [isNewListForm, setIsNewListForm] = useState(false);
  const [isLists, setIsLists] = useState(false);
  const [lists, setLists] = useState<ListType[] | []>([]);

  const [isList, setIsList] = useState(false);
  const [list, setList] = useState<ListType | null>(null);

  async function fetchLists() { 
    try {
      const response: Response = await fetch(ENDPOINT);
      const data: ListType[] | [] | ErrorMessage = await response.json();
      
      if (!response.ok && "message" in data) {
        throw new Error(data.message);
      }
      
      if (Array.isArray(data)) { 
        setLists(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.log(error.message);
      }
    }
  }

  useEffect(() => { 
    fetchLists();
  }, []);
  
  const handleDisplayNewListForm: ClickHandler = () => { 
    setIsLists(false);
    setIsList(false);
    setIsNewListForm(true);
  };
  
  const handleDisplayLists: ClickHandler = () => { 
    setIsNewListForm(false);
    setIsList(false);
    setIsLists(true);
  };

  const handleAddList: AddListHandler = (list) => { 
    const newLists = [...lists, list];
    setLists(newLists);
  
  };

  const handleDisplayListItems: DisplayListItemsHandler= () => { 
    setIsNewListForm(false);
    setIsLists(false);
    setIsList(true);
  };

  const handleSetCurrentList: SetCurrentListHandler = (list) => { 
    setList(list);
  };

  const handleDeleteList: DeleteListHandler = (listId) => { 
    const newLists: ListType[] | [] = lists.filter(list => list._id !== listId);
    setLists(newLists);
  };

  return (
    <main className={styles.mainWrapper}>
      <Navigation
        onDisplayNewListForm={handleDisplayNewListForm}
        onDisplayLists={handleDisplayLists}
      />
    
      <section className={styles.listWrapper}>
        {!isLists && !isNewListForm && !isList &&
          <Welcome
            onDisplayNewListForm={handleDisplayNewListForm}
            onDisplayLists={handleDisplayLists}
          />}
        
        {isLists &&
          <Lists
            lists={lists}
            onDisplayListItems={handleDisplayListItems}
            onSetCurrentList={handleSetCurrentList}
            onDeleteList={handleDeleteList}
          />}
        
        {isNewListForm &&
          <NewListForm
            onDisplayLists={handleDisplayLists}
            onAddList={handleAddList}
            onDisplayListItems={handleDisplayListItems}
            onSetCurrentList={handleSetCurrentList}
          />
        }
        {isList &&
          <List
            list={list}
          />
        }
      </section>  
    </main>
  );
}

export default App
