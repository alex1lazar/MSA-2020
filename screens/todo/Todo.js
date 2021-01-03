import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import Firebase from "../../config/Firebase";

import { updateTasks } from "../../store/actions";

import Colors from "../../constants/colors";

import CalendarDates from "./components/CalendarDates";
import Navbar from "../../core/components/Navbar";
import Task from "./components/Task";

const tasksData = [
  {
    id: "1",
    date: "3.1",
    name: "Task1",
    checked: false,
    priority: "high",
    subtasks: [
      { id: "1", name: "Subtask 1", checked: false },
      { id: "2", name: "Subtask 2", checked: false },
    ],
  },
  { id: "2", date: "4.1", name: "Task2", checked: false, priority: "low" },
  { id: "3", date: "3.1", name: "Task3", checked: false, priority: "medium" },
];

const Todo = (props) => {
  const tasks = useSelector((state) => state.profile.tasks);
  const [activeDate, setActiveDate] = useState("");
  const dispatch = useDispatch();

  const renderedTasks = tasks
    .filter((task) => task.date === activeDate)
    .map((task, i) => <Task task={task} key={i} />);

  useEffect(() => {
    dispatch(updateTasks(tasksData));
  }, []);

  return (
    <View style={styles.todoContainer}>
      <View style={styles.calendarContainer}>
        <Icon
          name="calendar"
          type="evilicon"
          color={Colors.secondaryLight}
          size={44}
        />

        <CalendarDates setActiveDate={(date) => setActiveDate(date)} />
      </View>

      {renderedTasks.length ? (
        <View style={styles.tasksContainer}>{renderedTasks}</View>
      ) : (
        <Text style={styles.noTasksText}>
          You don't have any tasks assigned to this day.
        </Text>
      )}

      <Navbar navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 24,
    marginBottom: 24,
    width: "100%",
  },

  noTasksText: {
    color: Colors.text,
    fontSize: 20,
    textAlign: "center",
  },

  todoContainer: {
    padding: 10,
    backgroundColor: Colors.background,
    minHeight: "100vh",
  },
});

export default Todo;
