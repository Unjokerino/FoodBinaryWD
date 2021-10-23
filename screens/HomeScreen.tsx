import React, { useState } from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import Search from "../assets/Icons/Search";
import CategoryCard from "../components/CategoryCard";
import PromoCard from "../components/PromoCard";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import Typography from "../constants/Typography";
import { Text } from "../components/Themed";
import FoodCard from "../components/FoodCard";

const mockCategories = ["Популярное", "Супы", "Завтраки", "Бургеры"];
const mockFoodItems = [
  {
    image: "https://www.moi-povar.ru/upload/iblock/598/IMG_3622.jpg",
    name: "Суп фасолевый",
    weight: 400,
    price: 150,
  },
  {
    image: "https://recipes.av.ru//media/recipes/102065_picture_7TfI08J.jpg",
    name: "Суп сырный",
    weight: 450,
    price: 250,
  },
];

export default function HomeScreen() {
  const [currentCategoryIndex, setSurrentCategoryIndex] = useState(0);
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Search />
          <TextInput
            placeholder={"Начните поиск здесь"}
            selectionColor={"#000"}
            placeholderTextColor={"#D2D2D2"}
            style={styles.textInput}
          />
        </View>
        <View style={styles.categoryContainer}>
          <ScrollView
            style={{ marginHorizontal: -Layout.horizontalSpacing }}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: Layout.horizontalSpacing,
            }}
          >
            {mockCategories.map((categorie, index) => (
              <CategoryCard
                isActive={index === currentCategoryIndex}
                title={categorie}
                onPress={() => {
                  setSurrentCategoryIndex(index);
                }}
              />
            ))}
          </ScrollView>
          <View style={styles.promoContainer}>
            <ScrollView
              style={{ marginHorizontal: -Layout.horizontalSpacing }}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: Layout.horizontalSpacing,
              }}
            >
              <PromoCard />
            </ScrollView>
          </View>
          <View style={styles.titleRow}>
            <Text style={Typography.h1}>Блюда дня</Text>
            <Text style={Typography.h3}>Каталог</Text>
          </View>
          <View style={styles.foodItemContainer}>
            {mockFoodItems.map((foodItem) => (
              <FoodCard {...foodItem} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Layout.spacing.xLarge,
    paddingHorizontal: Layout.horizontalSpacing,
    backgroundColor: Colors.light.background,
    paddingBottom: 100,
  },
  foodItemContainer: {
    marginTop: Layout.spacing.medium,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Layout.spacing.xxLarge,
  },
  categoryContainer: {
    marginTop: Layout.spacing.xxLarge,
  },
  promoContainer: {
    marginTop: Layout.spacing.xLarge,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingLeft: Layout.spacing.large,
  },
});
