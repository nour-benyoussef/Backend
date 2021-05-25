import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
} from "react-native";
import * as Animatable from "react-native-animatable";

import { AntDesign } from "@expo/vector-icons";
import colors, { buttons } from "./vwcars";
const width = 20;
const SPACING = 20;
const animation = {
  0: { opacity: 0, translateX: 50 },
  1: { opacity: 1, translateX: 0 },
};

const CarsDetails = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AntDesign
        name="close"
        size={28}
        style={{
          padding: 12,
          position: "absolute",
          top: SPACING * 2,
          right: 0,
          zIndex: 2,
        }}
        color={"#333"}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.meta}>
        <Text style={styles.model} numberOfLines={1}>
          {item.model}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <ScrollView horizontal style={{ flexgro: 0 }}>
        {colors.map((color) => {
          return <View style={[styles.switch, { backgroundColor: color }]} />;
        })}
      </ScrollView>
      <Animatable.View
        useNativeDriver
        animation={animation}
        delay={300 + 1 * 200}
      >
        <Text>{item.description}</Text>
      </Animatable.View>
      <Animatable.View
        useNativeDriver
        animation={animation}
        delay={300 + 2 * 200}
      >
        <Text>{item.description}</Text>
      </Animatable.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 120 * 1.2,
    width: "80%",
    top: 120,
    left: 30,
    resizeMode: "contain",
  },
  meta: {
    position: "absolute",
    top: SPACING * 2,
    left: SPACING,
  },
  model: {
    fontSize: 32,
    fontWeight: "700",
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
  },
  switch: {
    width: 56,
    height: 56,
  },
});
export default CarsDetails;
