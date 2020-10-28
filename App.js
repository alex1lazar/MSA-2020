import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "./constants/colors";

import Home from "./screens/home";

export default function App() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
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
