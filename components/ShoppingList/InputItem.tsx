import React, { FC } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { DefaultTheme } from "../../assets/styles/theme";
import { ShoppingItem } from "../../types/ShoppingItem";

type Props = {
  itemName: string;
  onPress: (itemName: string) => void;
  setItemName: (itemName: string) => void;
};

const InputItem: FC<Props> = ({ itemName, onPress, setItemName }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.addItemWrapper}
    >
      <TextInput
        style={styles.input}
        placeholder={"Add an item"}
        value={itemName}
        onChangeText={(text) => {
          setItemName(text);
        }}
      />
      <TouchableOpacity onPress={() => onPress(itemName)}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  addItemWrapper: {
    position: "absolute",
    bottom: 25,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: DefaultTheme.colors.background,
    borderRadius: 60,
    borderColor: DefaultTheme.colors.borderGrey,
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: DefaultTheme.colors.primary,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: DefaultTheme.colors.background,
    fontSize: 20,
  },
});

export default InputItem;
