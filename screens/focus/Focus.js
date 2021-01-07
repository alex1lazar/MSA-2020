import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Vibration,
} from "react-native";
import { Button } from "react-native-elements";
import colors from "../../constants/colors";
import Colors from "../../constants/colors";

import Navbar from "../../core/components/Navbar";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width * 0.42;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;
const timers = [25, 50, 90];

const Focus = (props) => {
  const { navigation } = props;

  const scrollX = useRef(new Animated.Value(0)).current;
  const [intervalRef, setIntervalRef] = useState();
  const [startTimer, setStartTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [pause, setPause] = useState(false);
  const [index, setIndex] = useState(0);
  const [actualSeconds, setActualSeconds] = useState(0);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setIndex(index);
    });
  });

  const timerFunction = () => {
    // Set the date we're counting down to
    if (actualSeconds > 0)
      var countDownDate = new Date().getTime() + actualSeconds * 1000;
    else var countDownDate = new Date().getTime() + timers[index] * 60000;

    // Update the count down every 1 second
    setIntervalRef(
      setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"

        if (hours) {
          setActualSeconds(hours * 3600 + minutes * 60 + seconds);
          setTimeLeft(hours + "h " + minutes + "m " + seconds + "s ");
        } else {
          setActualSeconds(minutes * 60 + seconds);
          setTimeLeft(minutes + "m " + seconds + "s ");
        }

        // If the count down is over, write some text
        if (distance < 0) {
          clearInterval(x);
          setStartTimer(false);
          Vibration.vibrate(10 * 1000); // 10 seconds
        }
      }, 1000)
    );
  };

  useEffect(() => {
    if (startTimer) {
      timerFunction();
    }
  }, [startTimer]);

  return (
    <View style={styles.focusContainer}>
      <Text style={styles.heading}>Start a focus session</Text>

      <View style={{ paddingTop: 200 }}>
        {!startTimer ? (
          <Animated.FlatList
            data={timers}
            keyExtractor={(item) => item.toString()}
            horizontal
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            showsHorizontalScrollIndicator={false}
            snapToInterval={ITEM_SIZE}
            decelerationRate="slow"
            pagingEnabled
            contentContainerStyle={{
              paddingHorizontal: ITEM_SPACING,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    width: ITEM_SIZE * 2.3,
                    marginRight: "-180px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Animated.Text style={[styles.text]}>{item}</Animated.Text>
                </View>
              );
            }}
          />
        ) : (
          <View>
            <Text style={styles.timeLeft}>{timeLeft}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {startTimer ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              title="Cancel"
              buttonStyle={styles.cancelButton}
              onPress={() => {
                setTimeLeft("");
                setStartTimer(false);
                clearInterval(intervalRef);
                setActualSeconds(0);
              }}
            />

            <Button
              title={pause ? "Resume" : "Pause"}
              buttonStyle={styles.pauseButton}
              onPress={() => {
                if (pause === false) {
                  setPause(true);
                  clearInterval(intervalRef);
                } else {
                  setPause(false);
                  timerFunction();
                }
              }}
            />
          </View>
        ) : (
          <Button
            title="Focus"
            buttonStyle={styles.focusButton}
            onPress={() => setStartTimer(true)}
          />
        )}
      </View>

      <Navbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  focusButton: {
    backgroundColor: Colors.secondaryLight,
    borderRadius: "20px",
    width: 150,
  },

  focusContainer: {
    minHeight: "100vh",
    padding: 10,
    backgroundColor: Colors.background,
  },

  heading: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 20,
  },

  buttonContainer: {
    position: "fixed",
    bottom: 100,
    left: "50%",
    transform: "translateX(-50%)",
  },

  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: "Menlo",
    color: "#fff",
    fontWeight: "900",
  },

  timeLeft: {
    color: "#fff",
    fontSize: 48,
    textAlign: "center",
  },

  cancelButton: {
    backgroundColor: "transparent",
    width: 120,
    marginRight: 10,
  },

  pauseButton: {
    backgroundColor: "#111e1e",
    borderRadius: "20px",
    width: 120,
    marginLeft: 10,
  },
});

export default Focus;
