export interface Item { 
  barcode: string;
  name: string;
  brand: string;
}

export interface ListType { 
  _id: string; 
  name: string;
  items: Item[] | [];
}

export interface ErrorMessage { 
  message: string;
}

export interface ListId {
  _id: string;
}

export interface ButtonStyles { 
  [key: string]: string;
}

export type ClickHandler = () => void;
export type AddListHandler = (list: ListType) => void;
export type FormSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => void;
export type TextInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type DisplayListItemsHandler = () => void;
export type SetCurrentListHandler = (list: ListType) => void;
export type DeleteListHandler = (listId: string) => void;


