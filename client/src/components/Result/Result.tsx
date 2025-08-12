import Button from '../Button/Button';
import styles from './Result.module.css';
import type { ButtonStyles } from '../../types/types';

type ResultProps = {
  barcode: string;
  name: string;
  brand: string;
};

function truncateText(text: string, charLimit: number): string { 
  return text.slice(0, charLimit);
}

function Result({ name, brand }: ResultProps) { 
  const shortItemName: string = truncateText(name, 70);
  const addItemButton: ButtonStyles = {
    float: "right",
    width: "80px",
    height: "40px",
    fontSize: "18px",
  };
  
  return (
    <li className={styles.wrapper}>
      <div>
        <p className={styles.itemBrand}>{brand}</p>
        <p className={styles.itemName}>{`${shortItemName} ...`}</p>
        <Button
          onClick={() => console.log("Add item")}
          buttonStyles={addItemButton}
        >
          Add
        </Button>
      </div>
    </li>
  );
}

export default Result;