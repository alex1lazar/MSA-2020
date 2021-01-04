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
    position: "fixed",
    bottom: 15,
    left: "50%",
    transform: "translateX(-50%)",
    borderRadius: "10px",
    padding: 15,
    width: "85%",
  },

  errorBoxText: {
    color: "#fff",
    fontSize: ".9rem",
  },
});

export default ErrorBox;
