import { FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DefaultTheme } from "../../../assets/styles/theme";
import IconButton from "../../UI/IconButton";

type Props = {
  step: string;
  icon: string;
};

const Step: FC<Props> = ({ step, icon }) => {
  const [uncompleted, setUncompleted] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={uncompleted ? styles.itemText : styles.itemTextCompleted}>
        {step}
      </Text>
      <IconButton
        icon={icon}
        color={DefaultTheme.colors.primary}
        size={24}
        onPress={() => {
          setUncompleted(!uncompleted);
        }}
      />
    </View>
  );
};

export default Step;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTextCompleted: {
    width: "80%",
    color: DefaultTheme.colors.black,
    textAlign: "left",
    padding: 8,
    opacity: 0.5,
  },
  itemText: {
    width: "80%",
    color: DefaultTheme.colors.black,
    textAlign: "left",
    padding: 8,
  },
});
