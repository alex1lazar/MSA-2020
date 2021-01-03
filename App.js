import React from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import reducers from "./store/reducers";
import { createReduxStore } from "./services/store";

import AddTask from "./screens/addTask";
import Focus from "./screens/focus";
import LoginPage from "./screens/auth/Login";
import SignupPage from "./screens/auth/Signup";
import Todo from "./screens/todo";

const store = createReduxStore(reducers);
const Stack = createStackNavigator();

//TODO: NAVBAR FOR SCREENS, REMOVE FROM EACH

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="Signup" component={SignupPage} />
          <Stack.Screen name="Login" component={LoginPage} /> */}
          <Stack.Screen
            name="Todo"
            component={Todo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddTask"
            component={AddTask}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Focus"
            component={Focus}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
