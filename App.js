import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { createReduxStore } from "./services/store";

import reducers from "./store/reducers";
import Colors from "./constants/colors";

import Home from "./screens/home";

const store = createReduxStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Home />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: Colors.background,
  },
});
