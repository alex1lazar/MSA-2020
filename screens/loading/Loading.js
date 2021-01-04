import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/colors";

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: Colors.background,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: Colors.text,
    fontSize: 30,
  },
});

export default Loading;
