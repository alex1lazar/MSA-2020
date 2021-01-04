import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Button, Icon, Input } from "react-native-elements";
import uuid from "react-native-uuid";

import Colors from "../../constants/colors";

import { updateTasks } from "../../store/actions";

const AddTask = (props) => {
  const { navigation } = props;

  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.profile.selectedDate);
  const tasks = useSelector((state) => state.profile.tasks);

  const [task, setTask] = useState({
    name: "",
    id: uuid.v4(),
    date: selectedDate,
    priority: "important",
    subtasks: [],
    checked: false,
  });
  const [currentSubtask, setCurrentSubtask] = useState("");

  const renderedSubtasks = task.subtasks.map((subtask, index) => (
    <View key={index} style={styles.subtaskItem}>
      <Text style={styles.subtaskText}>&bull;&nbsp;{subtask.name}</Text>
      <Icon
        size={20}
        type="ionicon"
        name="ios-remove"
        color="#fff"
        onPress={() =>
          setTask({
            ...task,
            subtasks: task.subtasks.filter((st) => st.name !== subtask.name),
          })
        }
      />
    </View>
  ));

  const renderedFlags = [
    { color: "#c51117", priority: "important" },
    { color: "#dfdf3f", priority: "high" },
    { color: "#22cde1", priority: "medium" },
    { color: "#929292", priority: "low" },
  ].map((flag, i) => (
    <Icon
      key={i}
      type="ionicon"
      name="ios-flag"
      size={32}
      color={flag.color}
      style={[
        flag.priority === task.priority && styles.flagBackground,
        styles.flag,
      ]}
      onPress={() => setTask({ ...task, priority: flag.priority })}
    />
  ));

  return (
    <View style={styles.addTaskContainer}>
      <Text style={styles.title}>Add task</Text>

      <View style={styles.columnContainer}>
        <View>
          <Input
            placeholder="What do you want to accomplish?"
            onChangeText={(value) => setTask({ ...task, name: value })}
            inputStyle={styles.input}
          />

          <View style={styles.paddingContainer}>
            <Text style={styles.label}>Can you chunk it?</Text>

            {renderedSubtasks}
          </View>

          <View>
            <Input
              placeholder="Add subtask"
              inputStyle={[styles.input, styles.subtaskInput]}
              onChangeText={(value) => setCurrentSubtask(value)}
              value={currentSubtask}
              rightIcon={
                <Icon
                  type="ionicon"
                  name="ios-add"
                  size={40}
                  color="#fff"
                  onPress={() => {
                    setTask({
                      ...task,
                      subtasks: [
                        ...task.subtasks,
                        { name: currentSubtask, checked: false, id: uuid.v4() },
                      ],
                    });
                    setCurrentSubtask("");
                  }}
                />
              }
            />
          </View>

          <View style={styles.paddingContainer}>
            <Text style={styles.label}>How important is it?</Text>

            <View style={styles.flagsContainer}>{renderedFlags}</View>
          </View>
        </View>

        <View style={[styles.paddingContainer, styles.buttons]}>
          <Button
            title="Cancel"
            type="clear"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate("Todo")}
          />
          <Button
            title="Save"
            buttonStyle={[styles.button, styles.saveButton]}
            onPress={() => {
              dispatch(updateTasks(task));
              navigation.navigate("Todo");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskContainer: {
    backgroundColor: Colors.background,
    minHeight: "100vh",
    padding: 10,
  },

  button: {
    borderRadius: "20px",
    minWidth: 100,
  },

  buttonText: {
    color: "#fff",
  },

  buttons: {
    marginTop: 24,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  columnContainer: {
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 35,
  },

  saveButton: {
    backgroundColor: Colors.secondaryLight,
  },

  label: {
    color: "#fff",
    marginTop: 24,
    fontSize: 18,
  },
  flag: {
    borderRadius: "4px",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  flagBackground: {
    backgroundColor: "rgba(102, 100, 101, .6)",
  },

  flagsContainer: {
    marginTop: 16,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  input: {
    color: Colors.text,
    outlineWidth: 0,
    paddingHorizontal: 5,
  },

  subtaskInput: {
    fontSize: 14,
  },

  subtaskItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  subtaskText: {
    color: Colors.text,
    fontSize: 16,
    paddingVertical: 6,
    marginRight: 16,
  },

  paddingContainer: {
    paddingHorizontal: 10,
  },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: 32,
    marginBottom: 18,
  },
});

export default AddTask;
