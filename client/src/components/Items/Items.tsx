import type { ListType } from "../../types/types";
import Item from "../Item/Item";

type ItemsProps = {
  list: ListType | null;
};

function Items({ list }: ItemsProps) { 
  return (
    <ul>
      {list && list.items.map(({ barcode, name, brand }) => (
        <Item
          key={barcode}
          name={name}
          brand={brand}
        />))
      }
    </ul>
  );
}

export default Items;