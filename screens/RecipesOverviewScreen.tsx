import { FC } from "react";
import RecipesList from "../components/Recipes/RecipesList/RecipesList";
import { RECIPES } from "../data/dummy-data";

const RecipesOverviewScreen: FC = () => {
  return <RecipesList items={RECIPES} />;
};

export default RecipesOverviewScreen;
