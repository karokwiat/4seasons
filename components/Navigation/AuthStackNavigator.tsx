import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../../screens/LoginScreen";
import SignupScreen from "../../screens/SignupScreen";
import { DefaultTheme } from "../../assets/styles/theme";
import { RootStackParamList } from "../../types/RootStackParams";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStackNavigator() {
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

export default AuthStackNavigator;
