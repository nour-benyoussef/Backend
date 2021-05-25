import React from "react";

import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Text,
  SafeAreaView,
} from "react-native";
import vwcars from "./vwcars";
//import { SafeAreaView } from "react-native-safe-are-context";
import { SharedElement } from "react-navigation-shared-element";
const Item_SIZE = 120;
const BG_COLOR = "#C1CEE077";
const SPACING = 10;
const width = 20;
export default function ({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden />
      <FlatList
        data={vwcars}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ padding: SPACING }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CarsDetails", { item });
              }}
            >
              <View style={styles.item}>
                <View>
                  <SharedElement id={`item.${item.key}.model`}>
                    <Text style={styles.model}>{item.model}</Text>
                  </SharedElement>
                  <SharedElement id={`item.${item.key}.description`}>
                    <Text style={styles.description}>{item.description}</Text>
                  </SharedElement>
                </View>
              </View>

              <View>
                <SharedElement id={`item.${item.key}.image`}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    height: Item_SIZE,
    borderRadius: 12,
    marginBottom: SPACING,
    padding: SPACING,
    backgroundColor: BG_COLOR,
    overflow: "hidden",
  },
  model: {
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    fontSize: 12,
    opacity: 0.7,
  },
  image: {
    height: Item_SIZE * 1.2,
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: "-40%",
    resizeMode: "center",
  },
});
