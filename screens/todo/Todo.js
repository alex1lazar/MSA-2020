import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from "react-native-elements";
import Firebase, { db } from "../../config/Firebase";

import Colors from "../../constants/colors";

import { getUserTasks, updateTasks } from "../../store/actions";

import CalendarDates from "./components/CalendarDates";
import Navbar from "../../core/components/Navbar";
import Task from "./components/Task";

const checkCurrentYear = (task) => {
  const currentYear = new Date().getFullYear();

  if (new Date(task.timestamp).getFullYear() === currentYear) {
    return true;
  }

  return false;
};

const Todo = (props) => {
  const { navigation } = props;
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
    .filter((task) => task.date === activeDate && checkCurrentYear(task))
    .map((task, i) => <Task task={task} key={i} />);

  return (
    <View style={styles.todoContainer}>
      <View style={styles.calendarContainer}>
        <Icon
          name="ios-log-out"
          type="ionicon"
          color={Colors.secondaryLight}
          size={32}
          onPress={() => {
            navigation.navigate("Signup");
            dispatch(updateTasks([]));
            Firebase.auth().signOut();
          }}
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

      <TouchableWithoutFeedback onPress={() => navigation.navigate("AddTask")}>
        <View onTouch style={styles.addTaskButton}>
          <Icon
            name="ios-add-circle"
            type="ionicon"
            size={52}
            color={Colors.text}
          />
        </View>
      </TouchableWithoutFeedback>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskButton: {
    marginTop: 10,
  },

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
