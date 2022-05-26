import { FC, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import FlatButton from "../UI/FlatButton";
import AuthForm from "./AuthForm";
import { DefaultTheme } from "../../assets/styles/theme";
import { RootStackParamList } from "../../types/RootStackParams";
import { Credentials } from "../../types/Credentials";

type Props = {
  isLogin: boolean;
  onAuthenticate: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
};

const AuthContent: FC<Props> = ({ isLogin, onAuthenticate }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials: Credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? "Create a new user" : "Log in instead"}
          </FlatButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {},
  authContent: {
    marginTop: 180,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: DefaultTheme.colors.lightBlue,
    elevation: 2,
    shadowColor: DefaultTheme.colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  buttons: {
    marginTop: 8,
  },
});
