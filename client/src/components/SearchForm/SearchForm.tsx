import { useState } from 'react';
import type { DisplayListItemsHandler, ErrorMessage, Item, SubmitFormEvent } from '../../types/types';
import styles from './SearchForm.module.css';
import Results from '../Results/Results';
import { apiUrlSearch } from '../../constants';


type SearchFormProps = {
  onDisplayListItems: DisplayListItemsHandler;
};

const data: Item[] = [
  {
    barcode: "AAA",
    name: "Oat Milk",
    brand: "Oatly"
  }, 
  {
    barcode: "BBB",
    name: "Penne Pasta",
    brand: "Barilla"
  }, 
  {
    barcode: "CCC",
    name: "Crunchy Peanut Butter",
    brand: "Jiff"
  },
];

function SearchForm({ onDisplayListItems }: SearchFormProps) { 
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Item[] | []>(data);
  
  async function handleSubmitSearch(event: SubmitFormEvent): Promise<void> {
    event.preventDefault();

    try {
      const response: Response = await fetch(`${apiUrlSearch}/${query}`);
      const data: Item[] | [] | ErrorMessage = await response.json();

      if (!response.ok && "message" in data) { 
        throw new Error(data.message);
      }

      if (Array.isArray(data)) { 
        setResults(data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) { 
        console.log(error.message);
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

      {results.length > 0 &&
        <Results
          results={results}
        />
      }
    </div>
  );
}

export default SearchForm;