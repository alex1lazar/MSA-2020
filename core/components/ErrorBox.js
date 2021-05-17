import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorBox = ({ error }) => {
  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorBoxText}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBox: {
    backgroundColor: "#ff4444",
    position: "absolute",
    bottom: 15,
    borderRadius: 10,
    padding: 15,
    width: "85%",
  },

  errorBoxText: {
    color: "#fff",
    fontSize: 10,
  },
});

export default ErrorBox;
