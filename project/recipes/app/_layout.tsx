import { recipesContext } from "@/recipesContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <recipesContext.Provider value={{ apiRecipes: apiRecipes, SetApiRecipes: SetApiRecipes }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
      </Stack>
    </recipesContext.Provider>
  );
}

export default RootLayout;