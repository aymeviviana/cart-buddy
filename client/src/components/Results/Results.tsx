import type { DisplayListItemsHandler, Item, SetCurrentListHandler, UpdateListsHandler } from '../../types/types';
import styles from './Results.module.css';
import Result from '../Result/Result';
import type { ListType } from '../../types/types';

type ResultsProps = {
  results: Item[] | [];
  list: ListType | null;
  onDisplayListItems: DisplayListItemsHandler;
  onUpdateLists: UpdateListsHandler;
  onSetCurrentList: SetCurrentListHandler;
};

function Results({ results, list, onDisplayListItems, onUpdateLists, onSetCurrentList}: ResultsProps) { 
  return (
    <div className={styles.wrapper}>
      <ul>
        {results.map(({ barcode, name, brand}) => (
          <Result
            key={barcode}
            barcode={barcode}
            name={name}
            brand={brand}
            list={list}
            onUpdateLists={onUpdateLists}
            onSetCurrentList={onSetCurrentList}
            onDisplayListItems={onDisplayListItems}
          />
        ))}
      </ul>
    </div>
  );
}

export default Results;