import * as SecureStore from "expo-secure-store";

import { createContext, useState } from "react";
import { AuthValue } from "../../types/AuthValue";

export const AuthContext = createContext({
  token: "",
  userName: "",
  isAuthenticated: false,
  authenticate: (data: { token: string; userName: string }) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>();
  const [userName, setUserName] = useState<string | null>();

  function authenticate(data: { token: string; userName: string }) {
    setAuthToken(data.token);
    setUserName(data.userName);
    SecureStore.setItemAsync("token", data.token);
    SecureStore.setItemAsync("userName", data.userName);
  }

  function logout() {
    setAuthToken(null);
    setUserName(null);
    SecureStore.deleteItemAsync("token");
    SecureStore.deleteItemAsync("userName");
  }

  const value: AuthValue = {
    token: authToken,
    userName: userName,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
