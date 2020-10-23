import * as React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.titleText}>Log into your X account</Text>
        <Text style={styles.subtitleText}>Email</Text>
        <View style={styles.inputText}>
          <TextInput
            placeholder="e.g. x@mail.com"
            placeholderTextColor="#9A9A9A"
            onChangeText={(text) => setEmail(email)}
          />
        </View>

        <Text style={styles.subtitleText}>Password</Text>
        <View style={styles.inputText}>
          <TextInput
            secureTextEntry
            placeholder="more than 7 characters"
            placeholderTextColor="#9A9A9A"
            onChangeText={(text) => setPassword(password)}
          />
        </View>

        <View style={styles.button}>
          <Button
            onPress={() => Alert.alert("nice")}
            title="LOGIN"
            color="#A53F2B"
          />
        </View>
      </View>
    </View>
  );
};

export default Loginpage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#020D0D",
    height: "100%",
    alignItems: "center",
  },
  loginContainer: {
    color: "#fff",
    flex: 1,
    alignItems: "left",
    paddingTop: 25,
    width: "80%",
  },
  titleText: {
    color: "#fff",
    opacity: 87,
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 8,
  },
  subtitleText: {
    paddingTop: 24,
    paddingBottom: 16,
    fontSize: 16,
    fontWeight: "medium",
    color: "#fff",
    opacity: 87,
  },
  inputText: {
    color: "#fff",
    opacity: 87,
    paddingBottom: 4,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  button: {
    paddingTop: 24,
    // borderRadius: 24,
  },
});
