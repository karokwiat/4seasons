import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { DefaultTheme } from "../assets/styles/theme";

import RecipesList from "../components/Recipes/RecipesList/RecipesList";
import { MEALS } from "../data/dummy-data";

function FavoritesScreen() {
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite recipes yet.</Text>
      </View>
    );
  }

  return <RecipesList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: DefaultTheme.colors.background,
  },
  text: {
    fontSize: 18,
    fontFamily: DefaultTheme.fontFamily.boldHeaders,
    color: DefaultTheme.colors.black,
  },
});
