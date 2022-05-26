import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DefaultTheme } from "../../../assets/styles/theme";

type Props = {
  children: React.ReactNode;
};

const Subtitle: FC<Props> = ({ children }) => {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
};

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: DefaultTheme.fontFamily.boldHeaders,
    color: DefaultTheme.colors.black,
    fontSize: 18,
    textAlign: "left",
  },
  subtitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
  },
});
