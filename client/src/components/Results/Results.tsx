import type { Item } from '../../types/types';
import styles from './Results.module.css';
import Result from '../Result/Result';

type ResultsProps = {
  results: Item[] | [];
};

function Results({ results }: ResultsProps) { 
  return (
    <div className={styles.wrapper}>
      <ul>
        {results.map(({ barcode, name, brand}) => (
          <Result
            key={barcode}
            barcode={barcode}
            name={name}
            brand={brand}
          />
        ))}
      </ul>
    </div>
  );
}

export default Results;