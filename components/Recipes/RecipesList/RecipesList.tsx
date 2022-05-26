import { FC } from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";

import { DefaultTheme } from "../../../assets/styles/theme";
import Recipe from "../../../models/recipe";
import RecipeItem from "./RecipeItem";

type Props = {
  items: Recipe[];
};

const RecipesList: FC<Props> = ({ items }) => {
  const renderRecipeItem: ListRenderItem<Recipe> = ({ item }) => {
    const recipeItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <RecipeItem {...recipeItemProps} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
      />
    </View>
  );
};

export default RecipesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: DefaultTheme.colors.background,
  },
});
