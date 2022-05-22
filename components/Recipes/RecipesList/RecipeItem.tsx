import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import RecipeDetails from "../RecipeDetails";
import { DefaultTheme } from "../../../assets/styles/theme";

function RecipeItem({
  id,
  title,
  imageUrl,
  duration,
  complexity,
  affordability,
}) {
  const navigation = useNavigation();

  function selectRecipeItemHandler() {
    navigation.navigate("RecipeDetail", {
      mealId: id,
    });
  }

  return (
    <View style={styles.recipeItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
        onPress={selectRecipeItemHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.duration}>{duration}min</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default RecipeItem;

const styles = StyleSheet.create({
  recipeItem: {
    position: "relative",
    margin: 9,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 4,
    shadowColor: DefaultTheme.colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 300,
  },
  title: {
    position: "absolute",
    bottom: 8,
    left: 8,
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: DefaultTheme.colors.background,
    textAlign: "left",
    width: 200,
    fontSize: 24,
    margin: 8,
    shadowColor: DefaultTheme.colors.black,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
  },
  duration: {
    position: "absolute",
    top: 6,
    right: 8,
    fontFamily: "Georgia",
    fontWeight: "bold",
    color: DefaultTheme.colors.background,
    textAlign: "right",
    fontSize: 18,
    margin: 8,
    shadowColor: DefaultTheme.colors.black,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
  },
});
