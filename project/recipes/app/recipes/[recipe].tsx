import { IRecipes } from "@/IRecipes";
import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const Recipe = () => {
    console.log("hal")
    const { recipe } = useLocalSearchParams<{ recipe: string }>();
    const { apiRecipes, SetApiRecipes } = useContext(recipesContext);
    const FilteredRecipe: IRecipes[] = apiRecipes.filter((item) => item.id.toString() === recipe)

    return (
        <View>
            {FilteredRecipe.length > 0 ?

                <View>
                    {FilteredRecipe.map((recipe) =>
                        <View>
                            <Stack.Screen options={{ title: recipe.title }} />
                            <View style={styles.flexBox}>
                                <Image
                                    style={styles.imgRecipe}
                                    source={{
                                        uri: `${recipe.photoUrl}`,
                                    }}
                                />
                            </View>
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

const styles = StyleSheet.create({

    flexBox: {
        flex: 1,
        flexGrow: 1
    },

    imgRecipe: {
        width: 200,
        height: 200

    }

})

export default Recipe