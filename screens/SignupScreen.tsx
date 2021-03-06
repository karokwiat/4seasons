import { FC, useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/context/auth-context";
import { createUser } from "../util/auth";

type Props = {
  props?: string;
};

const SingupScreen: FC<Props> = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsAuthenticating(true);
    try {
      const userData: { token: string; userName: string } = await createUser(
        email,
        password
      );
      authCtx.authenticate(userData);

      setTimeout(() => {
        authCtx.logout();
        Alert.alert("You're being logged out.", "Please login again.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }, 3600000);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create user, please check your input and try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} isLogin={false} />;
};

export default SingupScreen;
