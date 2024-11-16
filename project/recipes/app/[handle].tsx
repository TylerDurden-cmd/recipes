import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams } from "expo-router"
import { useContext } from "react";
import { View, Text } from "react-native"
import React from "react";

const Cuisines = () => {
    /* handler voor de router params*/
    const { handle } = useLocalSearchParams<{ handle: string }>();
    /* context recipes */
    const { apiRecipes, SetApiRecipes } = useContext(recipesContext);

    console.log(apiRecipes.map((recipe) => recipe.calories))
    return (
        <View>
            <Stack.Screen options={{ title: handle }} />

            {apiRecipes.map((recipe) =>
                <Text key={recipe.id}>
                    {recipe.course}
                </Text>
            )}
        </View>
    )
}

export default Cuisines