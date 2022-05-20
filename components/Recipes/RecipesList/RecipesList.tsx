import { View, FlatList, StyleSheet } from "react-native";

import RecipeItem from "./RecipeItem";

function RecipesList({ items }) {
  function renderRecipeItem(itemData) {
    const item = itemData.item;

    const recipeItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <RecipeItem {...recipeItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderRecipeItem}
      />
    </View>
  );
}

export default RecipesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
