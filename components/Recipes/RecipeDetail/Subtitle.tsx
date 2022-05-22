import { View, Text, StyleSheet } from "react-native";
import { DefaultTheme } from "../../../assets/styles/theme";

function Subtitle({ children }) {
  return (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitle}>{children}</Text>
    </View>
  );
}

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: "Georgia",
    color: DefaultTheme.colors.black,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  subtitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    // borderBottomColor: DefaultTheme.colors.borderGrey,
    // borderBottomWidth: 1,
  },
});
