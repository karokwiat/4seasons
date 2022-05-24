import { useContext, useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQueryClient } from "react-query";

import IconButton from "../components/UI/IconButton";
import List from "../components/Recipes/RecipeDetail/List";
import Subtitle from "../components/Recipes/RecipeDetail/Subtitle";
import RecipeDetails from "../components/Recipes/RecipeDetails";
import { MEALS } from "../data/dummy-data";
import { addFavorite, removeFavorite } from "../store/redux/favorites";
import { RootStackParamList } from "../types/RootStackParams";
import { DefaultTheme } from "../assets/styles/theme";
import { usePostShoppingItem } from "../util/http";
import { ShoppingItem } from "../types/ShoppingItem";
import { AuthContext } from "../store/context/auth-context";
import ListSteps from "../components/Recipes/RecipeDetail/ListSteps";

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
          <List
            data={selectedMeal.ingredients}
            icon="add-circle"
            onPress={handleAddIngredient}
          />
          <Subtitle>Steps</Subtitle>
          <ListSteps data={selectedMeal.steps} icon="checkmark" />
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
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: DefaultTheme.colors.black,
    fontFamily: DefaultTheme.fontFamily.regularHeaders,
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
