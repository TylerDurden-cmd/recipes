import { IRecipes } from "@/IRecipes";
import { recipesContext } from "@/recipesContext";
import { Stack } from "expo-router";
import React, { useContext, useState } from "react";

const RootLayout = () => {
  const [apiRecipes, SetApiRecipes] = useState<IRecipes[]>([]);
  return (
    <recipesContext.Provider value={{ apiRecipes: apiRecipes, SetApiRecipes: SetApiRecipes }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </recipesContext.Provider>
  );
}

export default RootLayout;