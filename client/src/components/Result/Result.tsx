import styles from './Result.module.css';

type ResultProps = {
  barcode: string;
  name: string;
  brand: string;
};

function Result({ barcode, name, brand }: ResultProps) { 
  return (
    <li className={styles.wrapper}>
      {`${brand} - ${name} - ${barcode}`}
    </li>
  );
}

export default Result;