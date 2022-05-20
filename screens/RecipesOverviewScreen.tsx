import RecipesList from "../components/Recipes/RecipesList/RecipesList";
import { MEALS } from "../data/dummy-data";

function RecipesOverviewScreen() {
  return <RecipesList items={MEALS} />;
}

export default RecipesOverviewScreen;
