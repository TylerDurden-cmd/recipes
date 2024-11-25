import { IRecipes } from "@/IRecipes";
import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { View, Text } from "react-native";

const Recipe = () => {
    console.log("hallo wereld")
    const { recipe } = useLocalSearchParams<{ recipe: string }>();
    const { apiRecipes, SetApiRecipes } = useContext(recipesContext);
    const FilteredRecipe: IRecipes[] = apiRecipes.filter((item) => item.id.toString() === recipe)

    return (
        <View>
            {FilteredRecipe.length > 0 ?

                <View>
                    {FilteredRecipe.map((recipe) =>
                        <View>
                            <Stack.Screen options={{ title: recipe.title }} />µ
                            <Text key={recipe.id}>{recipe.title}</Text>
                        </View>
                    )}
                </View>
                :
                <View>
                    <Text>no recipe found.</Text>
                </View>
            }
        </View>
    );
}

export default Recipe