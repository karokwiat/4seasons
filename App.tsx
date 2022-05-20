import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as SecureStore from "expo-secure-store";
import AppLoading from "expo-app-loading";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import IconButton from "./components/UI/IconButton";
import { DefaultTheme } from "./assets/styles/theme";
import { RootStackParamList } from "./types/RootStackParams";
import RecipesOverviewScreen from "./screens/RecipesOverviewScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import { store } from "./store/redux/store";
import FavoritesScreen from "./screens/FavoritesScreen";
import ShoppingListScreen from "./screens/ShoppingListScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="Recipes"
        component={RecipesOverviewScreen}
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: DefaultTheme.colors.background },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  // const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: DefaultTheme.colors.header },
        headerTintColor: "black",
        contentStyle: { backgroundColor: DefaultTheme.colors.background },
      }}
    >
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          title: "About the Meal",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await SecureStore.getItemAsync("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
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
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </AuthContextProvider>
  );
}
