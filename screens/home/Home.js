import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Firebase from "../../config/Firebase";

export default function Home({ navigation }) {
  const handleSignout = () => {
    Firebase.auth().signOut();
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleSignout}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
