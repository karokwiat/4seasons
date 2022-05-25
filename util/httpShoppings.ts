import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { ShoppingItem } from "../types/ShoppingItem";

const BACKEND_URL =
  "https://cook-app-b49c2-default-rtdb.europe-west1.firebasedatabase.app/";

export const useGetShoppingItems = (token: string, userName: string) => {
  const fetchShoppingItems = async () => {
    return await axios.get(
      `${BACKEND_URL}${userName}shoppings.json?auth=${token}`
    );
  };

  const { isLoading, isError, data, error } = useQuery(
    "shoppingItems",
    fetchShoppingItems
  );
  let shoppingItems: ShoppingItem[] = [];
  for (const key in data?.data) {
    const shoppingItem = data?.data[key];
    shoppingItems.push({ id: key, item: shoppingItem.item });
  }
  return { isLoading, isError, shoppingItems, error };
};

export const usePostShoppingItem = (token: string, userName: string) => {
  return useMutation((newShoppingItem: ShoppingItem) => {
    return axios.post(
      `${BACKEND_URL}${userName}shoppings.json?auth=${token}`,
      newShoppingItem
    );
  });
};

export const useDeleteShoppingItem = (token: string, userName: string) => {
  return useMutation((id: string) => {
    return axios.delete(
      `${BACKEND_URL}${userName}shoppings/${id}.json?auth=${token}`
    );
  });
};

// export const storeShoppingItem = async (
//   shoppingItem: { item: string },
//   token: string
// ) => {
//   const response = await axios.post(
//     BACKEND_URL + "shoppings.json?auth=" + token,
//     shoppingItem
//   );
//   const id = response.data.name;
//   return id;
// };

// export const getShoppingItems = async (token: string) => {
//   const response = await axios.get(
//     BACKEND_URL + "shoppings.json?auth=" + token
//   );

//   const shoppingItems = [];

//   for (const key in response.data) {
//     const shoppingItemObj = {
//       id: key,
//       item: response.data[key].item,
//     };
//     shoppingItems.push(shoppingItemObj);
//   }
//   return shoppingItems;
// };

// export const updateShoppingItem = (
//   token: string,
//   id: string,
//   item: ShoppingItem
// ) => {
//   return axios.put(BACKEND_URL + `/shoppings/${id}.json?auth=` + token, item);
// };

// export const deleteShoppingItem = (token: string, id: string) => {
//   return axios.delete(BACKEND_URL + `/shoppings/${id}.json?auth=` + token);
// };
