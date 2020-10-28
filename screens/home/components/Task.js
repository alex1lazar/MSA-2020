import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox, Icon } from "react-native-elements";

import Colors from "../../../constants/colors";

const Task = (props) => {
  const { task } = props;
  const [checkedTask, setCheckedTask] = useState(false);

  return (
    <View
      style={{
        ...styles.taskContainer,
        ...priorityStyles(task.priority).borderColor,
      }}
    >
      <CheckBox
        title={task.title}
        checked={checkedTask}
        onPress={() => setCheckedTask(!checkedTask)}
        textStyle={styles.text}
        containerStyle={styles.checkbox}
        uncheckedColor="#106c6f"
        checkedColor="#106c6f"
      />

      <View>
        <Icon
          name="timer"
          color={Colors.secondary}
          size={44}
          color={Colors.secondaryLight}
        />
      </View>
    </View>
  );
};

const priorityStyles = (priority) =>
  StyleSheet.create({
    borderColor: {
      borderBottomColor:
        priority === "low"
          ? "#929292"
          : priority === "medium"
          ? "#22cde1"
          : priority === "high"
          ? "#dfdf3f"
          : "#c51117",
    },
  });

const styles = StyleSheet.create({
  low: {
    borderBottomColor: "#929292",
  },

  medium: {
    borderBottomColor: "#22cde1",
  },

  high: {
    borderBottomColor: "#dfdf3f",
  },

  urgent: {
    borderBottomColor: "#c51117",
  },

  checkbox: {
    borderWidth: 0,
    backgroundColor: "transparent",
    flexGrow: 1,
  },

  text: {
    fontSize: 25,
    color: Colors.text,
    marginLeft: 30,
    maxWidth: 190,
  },

  taskContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderBottomWidth: 2,
    backgroundColor: "#021111",
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Task;
