import { Pressable, StyleSheet, Text, View } from "react-native";
import { FC } from "react";

import { DefaultTheme } from "../../assets/styles/theme";

type Props = {
  children: any;
  onPress: () => void;
};

const FlatButton: FC<Props> = ({ children, onPress }) => {
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

export default FlatButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: "center",
    color: DefaultTheme.colors.black,
  },
});
