import { FC, useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/context/auth-context";
import { login } from "../util/auth";

type Props = {
  props?: string;
};

const LoginScreen: FC<Props> = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    setIsAuthenticating(true);
    try {
      const userData: { token: string; userName: string } = await login(
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
        "Authentication failed!",
        "Could not log you in. Please check your credentials or try again later!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
};

export default LoginScreen;
