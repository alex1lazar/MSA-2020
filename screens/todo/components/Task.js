import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";
import { db } from "../../../config/Firebase";

import { updateTasks } from "../../../store/actions";

import Colors from "../../../constants/colors";

const Task = (props) => {
  const { task } = props;
  const tasks = useSelector((state) => state.profile.tasks).filter(
    (t) => t.date === task.date
  );
  const dispatch = useDispatch();

  const checkTask = () => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === task.id) {
        const updatedSubtasks = t.subtasks.map((subtask) => ({
          ...subtask,
          checked: !task.checked,
        }));
        return { ...task, checked: !task.checked, subtasks: updatedSubtasks };
      } else return t;
    });
    dispatch(updateTasks(updatedTasks));
    db.collection("tasks")
      .doc(task.id)
      .set(updatedTasks.filter((t) => t.id === task.id)[0]);
  };

  const checkSubtask = (subtaskId) => {
    if (task.checked === false) {
      const updatedTasks = tasks.map((t) => {
        if (t.id === task.id) {
          const updatedSubtasks = t.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) {
              return { ...subtask, checked: !subtask.checked };
            } else return subtask;
          });

          return { ...task, subtasks: updatedSubtasks };
        } else return t;
      });

      dispatch(updateTasks(updatedTasks));
      db.collection("tasks")
        .doc(task.id)
        .set(updatedTasks.filter((t) => t.id === task.id)[0]);
    } else return;
  };

  const renderedSubtasks = task.subtasks?.map((subtask, i) => {
    return (
      <CheckBox
        key={i}
        size={16}
        title={subtask.name}
        onPress={() => checkSubtask(subtask.id)}
        checked={subtask.checked}
        uncheckedColor="#106c6f"
        checkedColor="#106c6f"
        containerStyle={styles.subtask}
        textStyle={styles.subtaskText}
      />
    );
  });

  return (
    <View style={[styles.mainPanel, priorityStyles(task.priority).borderColor]}>
      <View style={styles.taskContainer}>
        <CheckBox
          title={task.name}
          checked={task.checked}
          onPress={checkTask}
          uncheckedColor="#106c6f"
          checkedColor="#106c6f"
          textStyle={styles.text}
          containerStyle={styles.task}
        />
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
    fontSize: 20,
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
