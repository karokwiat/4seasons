import axios from "axios";
import { ShoppingItem } from "../types/ShoppingItem";

const BACKEND_URL =
  "https://cook-app-b49c2-default-rtdb.europe-west1.firebasedatabase.app/";

export const storeShoppingItem = async (
  shoppingItem: { item: string },
  token: string
) => {
  const response = await axios.post(
    BACKEND_URL + "shoppings.json?auth=" + token,
    shoppingItem
  );
  const id = response.data.name;
  return id;
};

export const getShoppingItems = async (token: string) => {
  const response = await axios.get(
    BACKEND_URL + "shoppings.json?auth=" + token
  );

  const shoppingItems = [];

  for (const key in response.data) {
    const shoppingItemObj = {
      id: key,
      item: response.data[key].item,
    };
    shoppingItems.push(shoppingItemObj);
  }
  return shoppingItems;
};

// export const updateShoppingItem = (
//   token: string,
//   id: string,
//   item: ShoppingItem
// ) => {
//   return axios.put(BACKEND_URL + `/shoppings/${id}.json?auth=` + token, item);
// };

export const deleteShoppingItem = (token: string, id: string) => {
  return axios.delete(BACKEND_URL + `/shoppings/${id}.json?auth=` + token);
};
