import { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { AuthContext } from "../../store/context/auth-context";
import IconButton from "../../components/UI/IconButton";
import { DefaultTheme } from "../../assets/styles/theme";
import RecipeDetailScreen from "../../screens/RecipeDetailScreen";
import ShoppingListScreen from "../../screens/ShoppingListScreen";
import RecipesStackNavigator from "./RecipesStackNavigator";
import FavoriteStackNavigator from "./FavoritesStackNavigator";

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerTintColor: DefaultTheme.colors.black,
        tabBarActiveTintColor: DefaultTheme.colors.primary,
        tabBarInactiveTintColor: DefaultTheme.colors.inactive,
        headerTitleStyle: {
          fontFamily: DefaultTheme.fontFamily.boldHeaders,
          fontSize: 20,
        },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="exit-outline"
            color={tintColor}
            size={24}
            onPress={authCtx.logout}
          />
        ),
      }}
    >
      <BottomTab.Screen
        name="RecipeStack"
        component={RecipesStackNavigator}
        options={{
          title: "Recipes",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FavoritesStack"
        component={FavoriteStackNavigator}
        options={{
          title: "My favorites",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ShoppingList"
        component={ShoppingListScreen}
        options={{
          title: "Shopping List",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
