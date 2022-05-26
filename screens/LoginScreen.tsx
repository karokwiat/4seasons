import { FC, useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/context/auth-context";
import { login, refreshToken } from "../util/auth";

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
      // const token: string = await login(email, password);
      let userData: { token: string; userName: string; refreshToken: string } =
        await login(email, password);
      const data = { token: userData.token, userName: userData.userName };
      authCtx.authenticate(data);

      setTimeout(() => {
        async function whatever() {
          const newUserData = await refreshToken(userData);
          userData.token = newUserData.token;
          userData.refreshToken = newUserData.refreshToken;
          console.log(userData);
        }
        whatever();
      }, 60);
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
