import { Item } from "./CreateItem.dto.js";

export interface CreateListDto { 
  name: string;
  items: Item[] | []
}