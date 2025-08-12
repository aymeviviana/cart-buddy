import { useState } from 'react';
import type { DisplayListItemsHandler, ErrorMessage, Item, SubmitFormEvent } from '../../types/types';
import styles from './SearchForm.module.css';
import Results from '../Results/Results';
import { apiUrlSearch } from '../../constants';
import Message from '../Message/Message';


type SearchFormProps = {
  onDisplayListItems: DisplayListItemsHandler;
};

function SearchForm({ onDisplayListItems }: SearchFormProps) { 
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Item[] | []>([]);
  const [loadingStatus, setLoadingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isValidQuery = (query: string): boolean => query.trim().length > 0;
  
  async function handleSubmitSearch(event: SubmitFormEvent): Promise<void> {
    event.preventDefault();

    if (!isValidQuery(query)) { 
      setLoadingStatus('error');
      setErrorMessage('Please make sure your search contains at least one character.');
      return;
    }
    
    setLoadingStatus('loading');

    try {
      const response: Response = await fetch(`${apiUrlSearch}/${query}`);
      const data: Item[] | [] | ErrorMessage = await response.json();

      if (!response.ok && "message" in data) { 
        throw new Error(data.message);
      }

      if (Array.isArray(data)) { 
        setLoadingStatus('success');
        setResults(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) { 
        setLoadingStatus('error');
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
        <img
          className={styles.backButton}
          src="./src/assets/arrow-left-50.png"
          alt="back arrow"
          onClick={onDisplayListItems}
        />
      <form
        onSubmit={handleSubmitSearch}
      >
        <h1 className={styles.header}>Search Items</h1>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <input
          type="submit"
          value="Search"
        />
      </form>

      {loadingStatus === 'idle' &&
        <Message
          message={'Type an item name and click search =)'}
        />
      }

      {loadingStatus === 'loading' &&
        <Message
          message={'Searching....'}
        />
      }

      {loadingStatus === 'success' &&
        <Results
          results={results}
        />
      }

      {loadingStatus === 'error' && 
        <Message
          message={errorMessage}
        />
      }
    </div>
  );
}

export default SearchForm;