import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { DefaultTheme } from "../assets/styles/theme";

import RecipesList from "../components/Recipes/RecipesList/RecipesList";
import { RECIPES } from "../data/dummy-data";
import { RootState } from "../store/redux/store";

const FavoritesScreen: FC = () => {
  const favoriteRecipeIds = useSelector(
    (state: RootState) => state.favoriteRecipes.ids
  );

  const favoriteRecipes = RECIPES.filter((recipe) =>
    favoriteRecipeIds.includes(recipe.id)
  );

  if (favoriteRecipes.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite recipes yet.</Text>
      </View>
    );
  }

  return <RecipesList items={favoriteRecipes} />;
};

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
