import { useContext, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "react-query";

import IconButton from "../components/UI/IconButton";
import List from "../components/Recipes/RecipeDetail/List";
import Subtitle from "../components/Recipes/RecipeDetail/Subtitle";
import { RECIPES } from "../data/dummy-data";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
import { RootStackParamList } from "../types/RootStackParams";
import { DefaultTheme } from "../assets/styles/theme";
import { usePostShoppingItem } from "../util/http";
import { ShoppingItem } from "../types/ShoppingItem";
import { AuthContext } from "../store/context/auth-context";
import ListSteps from "../components/Recipes/RecipeDetail/ListSteps";

type Props = NativeStackScreenProps<RootStackParamList, "Favorites">;

function RecipeDetailScreen({ route, navigation }: Props) {
  const favoriteRecipeId = useSelector((state) => state.favoriteRecipes.ids);
  const dispatch = useDispatch();

  const recipeId = route.params.recipeId;
  const selectedRecipe = RECIPES.find((recipe) => recipe.id === recipeId);

  const recipeIsFavorite = favoriteRecipeId.includes(recipeId);

  const changeFavoriteStatusHandler = () => {
    if (recipeIsFavorite) {
      dispatch(removeFavorite({ id: recipeId }));
    } else {
      dispatch(addFavorite({ id: recipeId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={recipeIsFavorite ? "bookmark" : "bookmark-outline"}
            color="black"
            onPress={changeFavoriteStatusHandler}
            size={24}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  const queryClient = useQueryClient();

  const authCtx = useContext(AuthContext);
  const token: string = authCtx.token;

  const { mutate: createShoppingItem } = usePostShoppingItem(token);

  const handleAddIngredient = (ingredient: string) => {
    const shoppingItem: ShoppingItem = { item: ingredient };
    createShoppingItem(shoppingItem, {
      onSuccess: () => queryClient.invalidateQueries("shoppingItems"),
    });
  };

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedRecipe.imageUrl }} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{selectedRecipe.title}</Text>
      </View>
      <View style={styles.authorContainer}>
        <Text style={styles.authorLink}>Author: {selectedRecipe.author}</Text>
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <View style={styles.subtitleContainer}>
            <Subtitle>Ingredients</Subtitle>
            <View style={styles.servingsContainer}>
              <Text style={styles.servings}>{selectedRecipe.serving}</Text>
              <Text style={styles.text}>servings</Text>
            </View>
          </View>
          <List
            data={selectedRecipe.ingredients}
            icon="add-circle"
            onPress={handleAddIngredient}
          />
          <Subtitle>Steps</Subtitle>
          <ListSteps data={selectedRecipe.steps} icon="checkmark" />
        </View>
      </View>
    </ScrollView>
  );
}

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {},
  image: {
    width: "100%",
    height: 350,
  },
  titleContainer: {
    backgroundColor: DefaultTheme.colors.lightBlue,
    padding: 12,
  },
  title: {
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: DefaultTheme.colors.black,
    fontFamily: DefaultTheme.fontFamily.boldHeaders,
  },
  listOuterContainer: {
    alignItems: "center",
    paddingTop: 25,
  },
  listContainer: {
    width: "90%",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  servingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  servings: {
    color: DefaultTheme.colors.black,
    fontFamily: DefaultTheme.fontFamily.boldHeaders,
    fontSize: 18,
    textAlign: "left",
    paddingTop: 8,
    paddingRight: 5,
  },
  text: {
    color: DefaultTheme.colors.black,
    paddingTop: 12,
    paddingRight: 15,
  },
  authorContainer: {
    width: "100%",
    height: 25,
    paddingTop: 8,
  },
  authorLink: {
    textAlign: "center",
    color: DefaultTheme.colors.linkGrey,
  },
});
