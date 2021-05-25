import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import data from "../Screen/locations";
import { tutorial2SPec } from "./theme";
const { ITEM_WIDTH, ITEM_HEIGHT, RADIUS, SPACING, FULL_SIZE } = tutorial2SPec;
export default function TravelList() {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.2, 1],
          });
          return (
            <TouchableOpacity onPress={() => {}} style={styles.itemContainer}>
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  { overflow: "hidden", borderRadius: RADIUS },
                ]}
              >
                <Animated.Image
                  source={{ uri: item.image }}
                  style={[
                    StyleSheet.absoluteFillObject,
                    { resizeMode: "cover", transform: [{ scale }] },
                  ]}
                />
              </View>
              <Animated.Text
                style={[styles.location, { transform: [{ translateX }] }]}
              >
                {item.location}
              </Animated.Text>
              <View style={styles.days}>
                <Text style={styles.dayValue}>{item.numberOfDays}</Text>
                <Text style={styles.daysLabel}>days</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH + 5,
    height: ITEM_HEIGHT / 2,
    margin: SPACING,
    marginVertical: -3,
  },
  location: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: SPACING,
    left: SPACING,
  },
  days: {
    position: "absolute",
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "tomato",
    alignItems: "center",
  },
  dayValue: {
    fontWeight: "800",
    color: "#fff",
    fontSize: 18,
  },
  daysLabel: {
    color: "#fff",
    fontSize: 10,
  },
});
