import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox, Icon } from "react-native-elements";

import Colors from "../../../constants/colors";

const Task = (props) => {
  const { task } = props;
  const [checkedTask, setCheckedTask] = useState(false);

  const renderedSubtasks = task.subtasks?.map((subtask, i) => {
    return (
      <CheckBox
        key={i}
        size={16}
        title={subtask.name}
        checked={subtask.checked}
        uncheckedColor="#106c6f"
        checkedColor="#106c6f"
        containerStyle={styles.subtask}
        textStyle={styles.subtaskText}
      />
    );
  });

  return (
    <View
      style={{
        ...styles.mainPanel,
        ...priorityStyles(task.priority).borderColor,
      }}
    >
      <View style={styles.taskContainer}>
        <CheckBox
          title={task.name}
          checked={checkedTask}
          onPress={() => setCheckedTask(!checkedTask)}
          textStyle={styles.text}
          containerStyle={styles.task}
          uncheckedColor="#106c6f"
          checkedColor="#106c6f"
        />

        <Icon name="timer" size={44} color={Colors.secondaryLight} />
      </View>

      <View>{renderedSubtasks}</View>
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
  mainPanel: {
    backgroundColor: "#021111",
    borderBottomWidth: 2,
    borderRadius: 15,
    paddingTop: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  subtask: {
    borderWidth: 0,
    backgroundColor: "transparent",
    marginLeft: 50,
    paddingVertical: 3,
  },

  subtaskText: {
    color: Colors.text,
    fontSize: 15,
  },

  task: {
    borderWidth: 0,
    backgroundColor: "transparent",
    flexGrow: 1,
    paddingBottom: 4,
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
  },
});

export default Task;
