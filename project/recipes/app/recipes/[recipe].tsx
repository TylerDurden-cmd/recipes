import { IRecipes } from "@/types";
import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
const windowWidth = Dimensions.get("window").width;

const Recipe = () => {
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

                            <ScrollView>

                                <Image
                                    style={styles.imgRecipe}
                                    source={{
                                        uri: `${recipe.photoUrl}`,
                                    }}
                                />
                                <View style={{ alignItems: 'center' }}>
                                    <View style={styles.flexBox}>

                                        <View style={{ width: 150 }}>
                                            <Text>Preparation time</Text>
                                            <Text>{recipe.prepTime} min</Text>
                                        </View>
                                        <View style={{ width: 150 }}>
                                            <Text>Cooking time</Text>
                                            <Text>{recipe.cookTime} min</Text>
                                        </View>

                                    </View>

                                    <View style={styles.flexBox}>

                                        <View style={{ width: 150 }}>
                                            <Text>Servings</Text>
                                            <Text>{recipe.servings} servings</Text>
                                        </View>
                                        <View style={{ width: 150 }}>
                                            <Text>Calories</Text>
                                            <Text>{recipe.calories} calories</Text>
                                        </View>

                                    </View>

                                    <View style={styles.flexBox}>
                                        <View>
                                            <Text>
                                                {recipe.ingredients}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.flexBox}>
                                        <View>
                                            <Text>
                                                {recipe.directions}
                                            </Text>
                                        </View>
                                    </View>

                                </View>


                            </ScrollView>

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
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10,
        marginBottom: 20,
        marginTop: 5
    },

    imgRecipe: {
        width: windowWidth,
        height: 250,
        borderColor: "grey",
        borderStyle: "solid",
        borderWidth: 1
    }

})

export default Recipe