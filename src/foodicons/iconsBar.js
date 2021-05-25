import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import TravelList from "../Screen/TravelList";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import categoriesData from "./categorieData/categoriesData";
import { FlatList } from "react-native-gesture-handler";
import CarsList from "../Screens/CarsList";

const { width } = Dimensions.get("window");
const CARD_HEIGHT = (width * 1564) / 974;
const snapToOffsets = [0, CARD_HEIGHT];

export default function iconsBar() {
  const renderCategoryItem = ({ item }) => {
    return (
      <View style={styles.categoriesItemWrapper}>
        <Image source={item.image} style={[styles.categoryItemImage]} />
      </View>
    );
  };
  return (
    <View style={styles.categoriesWrapper}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        snapToEnd={false}
        decelerationRate="fast"
      >
        <View style={styles.categorieslistWrapper}>
          <FlatList
            data={categoriesData}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TravelList />
        <CarsList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  categoriesWrapper: {
    marginTop: 90,
  },

  categorieslistWrapper: {
    paddingTop: 15,
    paddingBottom: 20,
    height: 120,
    overflow: "hidden",
  },
  categoriesItemWrapper: {
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    marginRight: 20,
    borderRadius: 60 / 2,
    shadowColor: "#000",
    shadowRadius: 10,
    shadowOpacity: 0.4,
    shadowColor: "#4e91fd",
    shadowOffset: { width: 10, height: 10 },
    elevation: 6,
  },
  categoryItemImage: {
    width: 40,
    height: 40,
    marginTop: 10,
    alignSelf: "center",
    marginHorizontal: 20,
  },
  categoryItemTitle: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    paddingBottom: 20,
  },
});
