import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC } from "react";

import { DefaultTheme } from "../../assets/styles/theme";
import { RootStackParamList } from "../../types/RootStackParams";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthenticatedStackNavigator: FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: DefaultTheme.colors.background },
        headerTintColor: DefaultTheme.colors.black,
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
    </Stack.Navigator>
  );
};

export default AuthenticatedStackNavigator;
