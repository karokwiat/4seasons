import React, { useState, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { useQueryClient } from "react-query";

import { DefaultTheme } from "../assets/styles/theme";
import InputItem from "../components/ShoppingList/InputItem";
import Item from "../components/ShoppingList/Item";
import {
  useDeleteShoppingItem,
  useGetShoppingItems,
  usePostShoppingItem,
} from "../util/http";
import { AuthContext } from "../store/context/auth-context";
import { ShoppingItem } from "../types/ShoppingItem";

function ShoppingListScreen() {
  const [itemName, setItemName] = useState<string>();
  // const [item, setItem] = useState<ShoppingItem>();
  // const [itemsList, setItemsList] = useState<ShoppingItem[]>([]);

  const authCtx = useContext(AuthContext);
  const token: string = authCtx.token;

  const queryClient = useQueryClient();

  const { isLoading, isError, shoppingItems, error } =
    useGetShoppingItems(token);

  const { mutate: createShoppingItem } = usePostShoppingItem(token);
  const { mutate: deleteShoppingItem } = useDeleteShoppingItem(token);

  const handleAddItem = (itemName: string) => {
    const shoppingItem: ShoppingItem = { item: itemName };
    createShoppingItem(shoppingItem, {
      onSuccess: () => queryClient.invalidateQueries("shoppingItems"),
    });
    setItemName(null);
  };

  const handleDeleteItem = (item: ShoppingItem) => {
    const id: string = item.id;
    deleteShoppingItem(id, {
      onSuccess: () => queryClient.invalidateQueries("shoppingItems"),
    });
  };

  // useEffect(() => {
  //   async function getSavedItems(token: string) {
  //     const savedItems = await getShoppingItems(token);
  //     console.log(savedItems);
  //     setItemsList(savedItems);
  //   }
  //   getSavedItems(token);
  // }, [token]);
  // useEffect(() => {
  //   setItemsList(shoppingItems);
  // }, []);

  // console.log(shoppingItems);

  // const handleAddItem = async () => {
  //   Keyboard.dismiss();
  //   const id = await storeShoppingItem(item, token);
  //   const newItem: ShoppingItem = { ...item, id: id };
  //   setItemsList([...itemsList, newItem]);
  //   setItemName(null);
  //   setItem(null);
  // };

  // const completeItem = async (index: number, itemId: string) => {
  //   let itemsCopy = [...itemsList];
  //   itemsCopy.splice(index, 1);
  //   setItemsList(itemsCopy);

  //   await deleteShoppingItem(token, itemId);
  // };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.itemsWrapper}>
          <View style={styles.items}>
            {shoppingItems.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    handleDeleteItem(item);
                  }}
                >
                  <Item text={item.item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <InputItem
        itemName={itemName}
        onPress={handleAddItem}
        setItemName={setItemName}
      />
    </View>
  );
}

export default ShoppingListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  itemsWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
  },
});
