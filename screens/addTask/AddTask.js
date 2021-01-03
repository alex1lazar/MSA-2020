import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/colors";

import Navbar from "../../core/components/Navbar";

const AddTask = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.addTaskContainer}>
      <Text>Add Task</Text>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskContainer: {
    backgroundColor: Colors.background,
    minHeight: "100vh",
    padding: 10,
  },
});

export default AddTask;
