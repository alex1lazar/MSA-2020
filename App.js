import React from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import reducers from "./store/reducers";
import { createReduxStore } from "./services/store";

import LoginPage from "./screens/auth/Login";
import SignupPage from "./screens/auth/Signup";
import Home from "./screens/home";

const store = createReduxStore(reducers);
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Signup" component={SignupPage} />
          <Stack.Screen name="Login" component={LoginPage} /> */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
