import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import reducers from "./store/reducers";
import { createReduxStore } from "./services/store";

import AsyncStorage from "@react-native-community/async-storage";
import Firebase from "./config/Firebase";

import AddTask from "./screens/addTask";
import Focus from "./screens/focus";
import History from "./screens/history";
import Loading from "./screens/loading";
import LoginPage from "./screens/auth/Login";
import SignupPage from "./screens/auth/Signup";
import Statistics from "./screens/statistics";
import Todo from "./screens/todo";

const store = createReduxStore(reducers);
const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) AsyncStorage.setItem("loggedIn", true);
      setLoading(false);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {loading && (
            <Stack.Screen
              name="Loading"
              component={Loading}
              options={{ headerShown: false }}
            />
          )}

          <>
            <Stack.Screen
              name="Signup"
              component={SignupPage}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />

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
              name="Statistics"
              component={Statistics}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Focus"
              component={Focus}
              options={{ headerShown: false }}
            />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
