import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import Firebase, { db } from "../../config/Firebase";

import Colors from "../../constants/colors";

import { getUserTasks } from "../../store/actions";

import CalendarDates from "./components/CalendarDates";
import Navbar from "../../core/components/Navbar";
import Task from "./components/Task";

const Todo = (props) => {
  const tasks = useSelector((state) => state.profile.tasks);
  const activeDate = useSelector((state) => state.profile.selectedDate);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("tasks")
      .where("username", "==", Firebase.auth().currentUser.email)
      .get()
      .then((data) =>
        data.docs.map((doc) => dispatch(getUserTasks(doc.data())))
      );
  }, []);

  const renderedTasks = tasks
    .filter((task) => task.date === activeDate)
    .map((task, i) => <Task task={task} key={i} />);

  return (
    <View style={styles.todoContainer}>
      <View style={styles.calendarContainer}>
        <Icon
          name="calendar"
          type="evilicon"
          color={Colors.secondaryLight}
          size={44}
        />

        <CalendarDates />
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
