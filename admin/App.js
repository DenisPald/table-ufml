import React from "react";
import {
  Text,
  NativeBaseProvider,
  extendTheme,
  ScrollView,
  Center,
} from "native-base";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./src/LoginPage";
import Dashboard from "./src/Dashboard";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const theme = extendTheme({ config });
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <ScrollView bg="muted.800" height="100%" display="flex">
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        </ScrollView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
