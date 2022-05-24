import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthContext } from "../../store/context/auth-context";
import IconButton from "../UI/IconButton";
import { DefaultTheme } from "../../assets/styles/theme";
import { RootStackParamList } from "../../types/RootStackParams";
import RecipesOverviewScreen from "../../screens/RecipesOverviewScreen";
import RecipeDetailScreen from "../../screens/RecipeDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function RecipesStackNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: DefaultTheme.colors.black,
        contentStyle: { backgroundColor: DefaultTheme.colors.background },
        headerTitleStyle: {
          fontFamily: DefaultTheme.fontFamily.boldHeaders,
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="RecipesOverview"
        component={RecipesOverviewScreen}
        options={{
          title: "Recipes",
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit-outline"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          title: "Let's cook it!",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RecipesStackNavigator;
