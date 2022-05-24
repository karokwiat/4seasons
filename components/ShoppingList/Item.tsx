import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DefaultTheme } from "../../assets/styles/theme";

type Props = {
  text: string;
};

const Item: FC<Props> = ({ text }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.item}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: DefaultTheme.colors.lightGrey,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 8,
  },
  square: {
    width: 12,
    height: 12,
    borderColor: DefaultTheme.colors.primary,
    borderWidth: 2,
    borderRadius: 15,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "90%",
  },
});

export default Item;
