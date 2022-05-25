import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { QueryClient, QueryClientProvider } from "react-query";

import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import { store } from "./store/redux/store";
import AuthStackNavigator from "./components/Navigation/AuthStackNavigator";
import AuthenticatedStackNavigator from "./components/Navigation/AuthenticatedStackNavigator";

const queryClient = new QueryClient();

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStackNavigator />}
      {authCtx.isAuthenticated && <AuthenticatedStackNavigator />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStore.getItemAsync("token");
      const storedName = await SecureStore.getItemAsync("userName");

      if (storedToken && storedName) {
        authCtx.authenticate({ token: storedToken, userName: storedName });
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Georgia: require("./assets/styles/fonts/Georgia.ttf"),
    GeorgiaBold: require("./assets/styles/fonts/georgiab.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Root />
        </QueryClientProvider>
      </Provider>
    </AuthContextProvider>
  );
}
