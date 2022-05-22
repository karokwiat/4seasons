import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DefaultTheme } from "../../assets/styles/theme";

type Props = {
  text: string;
};

const Item: FC<Props> = ({ text }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      {/* <View style={styles.circular}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: DefaultTheme.colors.background,
    borderRadius: 60,
    borderColor: DefaultTheme.colors.borderGrey,
    borderWidth: 1,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
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
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: DefaultTheme.colors.primary,
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Item;
