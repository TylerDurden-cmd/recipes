import { IRecipes } from "@/types";
import { recipesContext } from "@/recipesContext";
import { Redirect, Stack } from "expo-router";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  const [apiRecipes, SetApiRecipes] = useState<IRecipes[]>([]);
  return (
    <>
      <recipesContext.Provider value={{ apiRecipes: apiRecipes, SetApiRecipes: SetApiRecipes }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: true, title: 'recipes' }} />
        </Stack>
      </recipesContext.Provider>
      <StatusBar style="dark" />
    </>

  );
}

export default RootLayout;