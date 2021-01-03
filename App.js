import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./screens/auth/Login";
import SignupPage from "./screens/auth/Signup";
import Home from "./screens/home";

import reducer from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signup" component={SignupPage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
