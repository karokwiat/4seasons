import { FC } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { DefaultTheme } from "../../assets/styles/theme";

type Props = {
  label?: string;
  keyboardType?: any;
  secure?: any;
  onUpdateValue?: any;
  value?: string;
  isInvalid?: boolean;
};

const Input: FC<Props> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        //autoCapitalize={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: DefaultTheme.colors.black,
    marginBottom: 4,
  },
  labelInvalid: {
    color: DefaultTheme.colors.primary,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: DefaultTheme.colors.background,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: DefaultTheme.colors.background,
  },
});
