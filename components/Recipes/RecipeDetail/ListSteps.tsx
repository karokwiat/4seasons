import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { DefaultTheme } from "../../../assets/styles/theme";
import Step from "./Step";

type Props = {
  data: string[];
  icon: string;
};

const ListSteps: FC<Props> = ({ data, icon }) => {
  return data.map((step) => (
    <View key={step} style={styles.listItem}>
      <Step step={step} icon={icon} />
    </View>
  ));
};

export default ListSteps;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: DefaultTheme.colors.lightGrey,
  },
});
