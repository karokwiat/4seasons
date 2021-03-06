import { Pressable, StyleSheet } from "react-native";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: any;
  color: any;
  size?: any;
  onPress: () => void;
};

const IconButton: FC<Props> = ({ icon, color, size, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
