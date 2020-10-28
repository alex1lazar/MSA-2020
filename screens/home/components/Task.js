import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";

import Colors from "../../../constants/colors";

const Task = () => {
  return (
    <View>
      <CheckBox
        title="Task 1"
        checked={false}
        textStyle={styles.text}
        containerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#c51117",
    borderWidth: 0,
    borderBottomWidth: 2,
    backgroundColor: "transparent",
    padding: 15,

    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 25,
    color: Colors.text,
    marginLeft: 30,
  },
});

export default Task;
