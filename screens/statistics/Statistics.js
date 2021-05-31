import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { PieChart } from "react-native-chart-kit";

import Colors from "../../constants/colors";

import Navbar from "../../core/components/Navbar";

const dateFrom = new Date().setHours(0, 0, 0, 0);
const dateTo = new Date(
  new Date().getTime() + 7 * 24 * 60 * 60 * 1000
).setHours(0, 0, 0, 0);
const screenWidth = Dimensions.get("screen").width;

const checkTaskIsInCurrentWeek = (task) => {
  if (task.timestamp >= dateFrom && task.timestamp < dateTo) {
    return true;
  }

  return false;
};

const checkTaskNotCompleted = (task) => {
  if (task.timestamp < dateFrom) {
    return true;
  }

  return false;
};

const percentageOfTotal = (total, current) => {
  return (current * 100) / total;
};

const Statistics = (props) => {
  const { navigation } = props;

  const tasks = useSelector((state) => state.profile.tasks);

  const completedTasks = tasks.filter((task) => task.checked);
  const inProgressTasks = tasks.filter(
    (task) => checkTaskIsInCurrentWeek(task) && !task.checked
  );
  const notCompletedTasks = tasks.filter(
    (task) => checkTaskNotCompleted(task) && !task.checked
  );

  const importantTasks = tasks.filter((task) => task.priority === "important");
  const highPriorityTasks = tasks.filter((task) => task.priority === "high");
  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === "medium"
  );
  const lowPriorityTasks = tasks.filter((task) => task.priority === "low");

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  const completionData = [
    {
      name: "Completed",
      number: percentageOfTotal(tasks.length, completedTasks.length),
      color: "green",
      legendFontColor: "green",
      legendFontSize: 15,
    },
    {
      name: "In progress",
      number: percentageOfTotal(tasks.length, inProgressTasks.length),
      color: "yellow",
      legendFontColor: "yellow",
      legendFontSize: 15,
    },
    {
      name: "Not completed",
      number: percentageOfTotal(tasks.length, notCompletedTasks.length),
      color: "red",
      legendFontColor: "red",
      legendFontSize: 15,
    },
  ];

  const priorityData = [
    {
      name: "Important",
      number: importantTasks.length,
      color: "#c51117",
      legendFontColor: "#c51117",
      legendFontSize: 16,
    },
    {
      name: "High priority",
      number: highPriorityTasks.length,
      color: "#dfdf3f",
      legendFontColor: "#dfdf3f",
      legendFontSize: 16,
    },
    {
      name: "Medium priority",
      number: mediumPriorityTasks.length,
      color: "#22cde1",
      legendFontColor: "#22cde1",
      legendFontSize: 16,
    },
    {
      name: "Low priority",
      number: lowPriorityTasks.length,
      color: "#929292",
      legendFontColor: "#929292",
      legendFontSize: 16,
    },
  ];

  return (
    <View style={styles.statisticsContainer}>
      <Text style={styles.completionText}>Completion statistics</Text>
      <PieChart
        width={screenWidth - 20}
        height={220}
        backgroundColor="transparent"
        chartConfig={chartConfig}
        accessor={"number"}
        data={completionData}
      />

      <Text style={styles.priorityText}>Priority statistics</Text>
      <PieChart
        width={screenWidth - 10}
        height={220}
        backgroundColor="transparent"
        chartConfig={chartConfig}
        accessor={"number"}
        absolute
        data={priorityData}
      />

      <Text style={styles.totalText}>Total created tasks: {tasks.length}</Text>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  completionText: {
    color: "#fff",
    fontFamily: "Menlo",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },

  priorityText: {
    color: "#fff",
    fontFamily: "Menlo",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
  },

  totalText: {
    color: "#fff",
    fontFamily: "Menlo",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 40,
    paddingBottom: 10,
  },

  statisticsContainer: {
    padding: 10,
    backgroundColor: Colors.background,
    minHeight: "100vh",
  },
});

export default Statistics;
