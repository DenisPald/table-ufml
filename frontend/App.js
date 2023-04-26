import React from "react";
import {
  NativeBaseProvider,
  extendTheme,
  View,
  Box,
  ScrollView,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainPageBody from "./src/MainPageBody";
import Navbar from "./src/Navbar";
import GroupInfo from "./src/GroupInfo";

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
        <ScrollView _dark={{ bg: "muted.800" }} height="100%">
          <Box safeArea={true}>
            <Navbar />
            <View alignItems="center">
              <View _web={{ w: "70%" }} _android={{ w: "99%" }}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={MainPageBody} />
                  <Stack.Screen name="Group" component={GroupInfo} />
                </Stack.Navigator>
              </View>
            </View>
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
