import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Icon, Input } from "react-native-elements";
import { sub } from "react-native-reanimated";

import Colors from "../../constants/colors";

import Navbar from "../../core/components/Navbar";

const AddTask = (props) => {
  const { navigation } = props;
  const [taskName, setTaskName] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [currentSubtask, setCurrentSubtask] = useState("");

  const renderedSubtasks = subtasks.map((subtask, index) => (
    <View key={index} style={styles.subtaskItem}>
      <Text style={styles.subtaskText}>&bull;&nbsp;{subtask.name}</Text>
      <Icon
        size={20}
        type="ionicon"
        name="ios-remove"
        color="#fff"
        onPress={() =>
          setSubtasks(subtasks.filter((st) => st.name !== subtask.name))
        }
      />
    </View>
  ));

  return (
    <View style={styles.addTaskContainer}>
      <Text style={styles.title}>Add task</Text>

      <View>
        <Input
          placeholder="What do you want to accomplish?"
          onChangeText={(value) => setTaskName(value)}
          inputStyle={styles.input}
        />
      </View>

      <View style={styles.subtasksContainer}>
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
                setSubtasks([...subtasks, { name: currentSubtask }]);
                setCurrentSubtask("");
              }}
            />
          }
        />
      </View>

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

  label: {
    color: "#fff",
    marginTop: 24,
    fontSize: 18,
  },

  input: {
    color: Colors.text,
    outlineColor: "transparent",
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

  subtasksContainer: {
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
