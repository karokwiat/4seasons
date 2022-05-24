import RecipesList from "../components/Recipes/RecipesList/RecipesList";
import { RECIPES } from "../data/dummy-data";

function RecipesOverviewScreen() {
  return <RecipesList items={RECIPES} />;
}

export default RecipesOverviewScreen;
