import { Pressable, StyleSheet, Text, View } from "react-native";
import { FC } from "react";

import { DefaultTheme } from "../../assets/styles/theme";

type Props = {
  children: any;
  onPress: () => void;
};

const Button: FC<Props> = ({ children, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: DefaultTheme.colors.header,
    elevation: 2,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: DefaultTheme.colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
});
