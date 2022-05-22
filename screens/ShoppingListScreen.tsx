import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import { DefaultTheme } from "../assets/styles/theme";
import InputItem from "../components/ShoppingList/InputItem";

import Item from "../components/ShoppingList/Item";
import {
  deleteShoppingItem,
  getShoppingItems,
  storeShoppingItem,
} from "../util/http";
import { AuthContext } from "../store/context/auth-context";
import { ShoppingItem } from "../types/ShoppingItem";

function ShoppingListScreen() {
  const [itemName, setItemName] = useState<string>();
  const [item, setItem] = useState<ShoppingItem>();
  const [itemsList, setItemsList] = useState<ShoppingItem[]>([]);

  const authCtx = useContext(AuthContext);
  const token: string = authCtx.token;

  useEffect(() => {
    async function getSavedItems(token: string) {
      const savedItems = await getShoppingItems(token);
      console.log(savedItems);
      setItemsList(savedItems);
    }
    getSavedItems(token);
  }, [token]);

  const handleAddItem = async () => {
    Keyboard.dismiss();
    const id = await storeShoppingItem(item, token);
    const newItem: ShoppingItem = { ...item, id: id };
    setItemsList([...itemsList, newItem]);
    setItemName(null);
    setItem(null);
  };

  const completeItem = async (index: number, itemId: string) => {
    let itemsCopy = [...itemsList];
    itemsCopy.splice(index, 1);
    setItemsList(itemsCopy);

    await deleteShoppingItem(token, itemId);
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Items */}
        <View style={styles.itemsWrapper}>
          {/* <Text style={styles.sectionTitle}>Shopping List</Text> */}
          <View style={styles.items}>
            {/* This is where the items will go! */}
            {itemsList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    completeItem(index, item.id);
                  }}
                >
                  <Item text={item.item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Add an item */}
      <InputItem
        itemName={itemName}
        onPress={handleAddItem}
        setItemName={setItemName}
        setItem={setItem}
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
    // paddingTop: 10,
    paddingHorizontal: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 20,
  },
});
