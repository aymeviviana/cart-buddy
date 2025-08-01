type ItemProps = {
  name: string;
  brand: string;
};

function Item({ name, brand }: ItemProps) { 
  return (
    <li>
      <div>
        <span>{brand}</span>
        {" --- "}
        <span>{name}</span>
      </div>
  </li>
  );
}

export default Item;