import * as SecureStore from "expo-secure-store";

import { createContext, useState } from "react";
import { AuthValue } from "../types/AuthValue";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token: string) => {},
  logout: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>();

  function authenticate(token: string) {
    setAuthToken(token);
    SecureStore.setItemAsync("token", token);
  }

  function logout() {
    setAuthToken(null);
    SecureStore.deleteItemAsync("token");
  }

  const value: AuthValue = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
