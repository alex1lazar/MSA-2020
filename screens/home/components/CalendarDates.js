import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../../../constants/colors";

import CalendarSingleDate from "./CalendarSingleDate";

const createNextDates = () => {
  const currentDate = new Date();
  var dates = [];
  for (var i = 0; i <= 5; i++) {
    const dateDay = (currentDate.getDate() + i).toString();
    const dateMonth = (currentDate.getMonth() + 1).toString();
    const date = { date: dateDay + "." + dateMonth };
    dates = [...dates, date];
  }
  return dates;
};

const CalendarDates = () => {
  const [currentActiveDate, setCurrentActiveDate] = useState("");
  const dates = createNextDates();

  useEffect(() => {
    // Get current date with day and month
    const today = new Date();
    const day = today.getUTCDate().toString();
    const month = (today.getUTCMonth() + 1).toString();

    setCurrentActiveDate(day + "." + month);
  }, []);

  const renderedDates = dates.map((date, i) => (
    <CalendarSingleDate
      setCurrentDate={(date) => setCurrentActiveDate(date.date)}
      date={date}
      style={currentActiveDate === date.date && styles.activeDay}
      key={i}
    />
  ));

  return <View style={styles.datesContainer}>{renderedDates}</View>;
};

const styles = StyleSheet.create({
  activeDay: {
    borderColor: Colors.secondaryLight,
  },

  datesContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});

export default CalendarDates;
