import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DefaultTheme } from "../../../assets/styles/theme";
import IconButton from "../../UI/IconButton";

type Props = {
  data: string[];
  icon: string;
  onPress: (item: string) => void;
};

const List: FC<Props> = ({ data, icon, onPress }) => {
  return data.map((dataPoint) => (
    <View key={dataPoint} style={styles.listItem}>
      <Text style={styles.itemText}>{dataPoint}</Text>
      <IconButton
        icon={icon}
        color={DefaultTheme.colors.primary}
        size={24}
        onPress={() => onPress(dataPoint)}
      />
    </View>
  ));
};

export default List;

const styles = StyleSheet.create({
  listItem: {
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
  itemText: {
    width: "80%",
    color: DefaultTheme.colors.black,
    textAlign: "left",
    padding: 8,
  },
});
