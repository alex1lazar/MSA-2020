import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  SectionList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../constants/colors";

import Navbar from "../../core/components/Navbar";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = width * 0.42;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;
const timers = [25, 50, 90];

const Focus = (props) => {
  const { navigation } = props;

  const scrollX = useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = useState(timers[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      const index = Math.round(value / width);
      setIndex(index);
      setDuration(timers[index]);
      console.log(timers[index], index);
    });
  });

  return (
    <View style={styles.focusContainer}>
      {/* <View style={styles.grid}>
        <Text style={styles.heading}>Start a focus session</Text> */}

      <View
        style={{
          position: "absolute",
          top: height / 3.3,
          left: 0,
          right: 0,
          flex: 1,
        }}
      >
        <Text style={styles.text}>{duration}</Text>
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
          onMomentumScrollEnd={(ev) => {
            setDuration(timers[index]);
          }}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: ITEM_SPACING,
          }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: ITEM_SIZE * 1.7,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Animated.Text style={[styles.text]}>{item}</Animated.Text>
              </View>
            );
          }}
        />
      </View>

      <Button title="Focus" buttonStyle={styles.focusButton} />
      {/* </View> */}
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

  grid: {
    height: "85%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: ITEM_SIZE * 0.8,
    fontFamily: "Menlo",
    color: "#fff",
    fontWeight: "900",
  },
});

export default Focus;
// import React, { useEffect, useState, useRef, useCallback } from "react";

// import {
//   Vibration,
//   StatusBar,
//   TextInput,
//   Dimensions,
//   Animated,
//   TouchableOpacity,
//   FlatList,
//   Text,
//   View,
//   StyleSheet,
// } from "react-native";

// const { width, height } = Dimensions.get("window");
// const colors = {
//   black: "#323F4E",
//   red: "#F76A6A",
//   text: "#ffffff",
// };

// const timers = [25, 50, 90];
// const ITEM_SIZE = width * 0.42;
// const ITEM_SPACING = (width - ITEM_SIZE) / 2;

// export default function Focus() {
//   const scrollX = useRef(new Animated.Value(0)).current;
//   const [duration, setDuration] = useState(timers[0]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     scrollX.addListener(({ value }) => {
//       const index = Math.round(value / width);
//       setIndex(index);
//       setDuration(timers[index]);
//       console.log(timers[index], index);
//     });
//   });

//   return (
//     <View style={styles.container}>
//       <StatusBar hidden />
//       <Animated.View
//         style={[
//           StyleSheet.absoluteFill,
//           {
//             height,
//             width,
//             backgroundColor: colors.black,
//           },
//         ]}
//       />
//       <Animated.View
//         style={[
//           StyleSheet.absoluteFillObject,
//           {
//             justifyContent: "flex-end",
//             alignItems: "center",
//             paddingBottom: 100,
//           },
//         ]}
//       >
//         <TouchableOpacity>
//           <View style={styles.roundButton} />
//         </TouchableOpacity>
//       </Animated.View>
//       <View
//         style={{
//           position: "absolute",
//           top: height / 3.3,
//           left: 0,
//           right: 0,
//           flex: 1,
//         }}
//       >
//         <Text style={styles.text}>{duration}</Text>
//         <Animated.FlatList
//           data={timers}
//           keyExtractor={(item) => item.toString()}
//           horizontal
//           bounces={false}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { x: scrollX } } }],
//             { useNativeDriver: true }
//           )}
//           showsHorizontalScrollIndicator={false}
//           snapToInterval={ITEM_SIZE}
//           decelerationRate="slow"
//           pagingEnabled
//           onMomentumScrollEnd={(ev) => {
//             setDuration(timers[index]);
//           }}
//           style={{ flexGrow: 0 }}
//           contentContainerStyle={{
//             paddingHorizontal: ITEM_SPACING,
//           }}
//           renderItem={({ item, index }) => {
//             return (
//               <View
//                 style={{
//                   width: ITEM_SIZE * 1.7,
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//               >
//                 <Animated.Text style={[styles.text]}>{item}</Animated.Text>
//               </View>
//             );
//           }}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.black,
//   },
//   roundButton: {
//     width: 80,
//     height: 80,
//     borderRadius: 80,
//     backgroundColor: colors.red,
//   },
//   text: {
//     fontSize: ITEM_SIZE * 0.8,
//     fontFamily: "Menlo",
//     color: colors.text,
//     fontWeight: "900",
//   },
// });
