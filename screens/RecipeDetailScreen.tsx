import { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import IconButton from "../components/UI/IconButton";
import List from "../components/Recipes/RecipeDetail/List";
import Subtitle from "../components/Recipes/RecipeDetail/Subtitle";
import RecipeDetails from "../components/Recipes/RecipeDetails";
import { MEALS } from "../data/dummy-data";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
import { RootStackParamList } from "../types/RootStackParams";
import { DefaultTheme } from "../assets/styles/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

function RecipeDetailScreen({ route, navigation }: Props) {
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealIds.includes(mealId);

  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: mealId }));
    } else {
      dispatch(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "bookmark" : "bookmark-outline"}
            color="black"
            onPress={changeFavoriteStatusHandler}
            size={24}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  // let IngredientAddedToTheShoppingList = false;

  // const changeIngredientStatus = () => {
  //   IngredientAddedToTheShoppingList = !IngredientAddedToTheShoppingList;
  //   console.log(IngredientAddedToTheShoppingList);
  // };

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedMeal.title}</Text>
      </View>
      <RecipeDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} icon="add-circle" />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} icon="checkmark" />
        </View>
      </View>
    </ScrollView>
  );
}

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  titleContainer: {
    backgroundColor: DefaultTheme.colors.lightBlue,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: DefaultTheme.colors.black,
    fontFamily: "Georgia",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "90%",
  },
});
