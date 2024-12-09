import React from "react";
import { IRecipes } from "./types";

interface IRecipesContext {
    SetApiRecipes: (apiRecipes: IRecipes[]) => void;
    apiRecipes: IRecipes[];
}

export const recipesContext = React.createContext<IRecipesContext>({ SetApiRecipes: (apiRecipes: IRecipes[]) => { }, apiRecipes: [] });