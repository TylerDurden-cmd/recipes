import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams } from "expo-router"
import { useContext } from "react";
import { View, Text } from "react-native"
import React from "react";
import { IRecipes } from "@/IRecipes";

const Cuisines = () => {
    /* handler voor de router params*/
    const { handle } = useLocalSearchParams<{ handle: string }>();
    /* context recipes */
    const { apiRecipes, SetApiRecipes } = useContext(recipesContext);

    const recipesOfCuisines: IRecipes[] = apiRecipes.filter((item) => item.cuisine === handle)

    console.log(apiRecipes.map((recipe) => recipe.calories))
    return (
        <View>
            <Stack.Screen options={{ title: handle }} />

            {recipesOfCuisines.map((recipe) =>
                <Text key={recipe.id}>
                    {`${recipe.title}\n`}
                </Text>
            )}
        </View>
    )
}

export default Cuisines