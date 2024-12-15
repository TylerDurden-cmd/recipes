import React from "react";
import { IRecipes } from "./types";

interface IRecipesContext {
    setApiRecipes: (apiRecipes: IRecipes[]) => void;
    apiRecipes: IRecipes[];
}

export const recipesContext = React.createContext<IRecipesContext>({ setApiRecipes: (apiRecipes: IRecipes[]) => { }, apiRecipes: [] });