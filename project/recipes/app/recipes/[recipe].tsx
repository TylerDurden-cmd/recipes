import { IRecipes } from "@/types";
import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;

const Recipe = () => {
    const { recipe } = useLocalSearchParams<{ recipe: string }>();
    const { apiRecipes, SetApiRecipes } = useContext(recipesContext);
    const FilteredRecipe: IRecipes[] = apiRecipes.filter((item) => item.id.toString() === recipe)

    // Image cache to store URIs dynamically
    const [imageCache, setImageCache] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadPictures = async () => {
            const newImageCache: Record<string, string> = {};
            for (let recipe of FilteredRecipe) {
                const storedImage = await AsyncStorage.getItem(`photo: [${recipe.id}]`);
                if (storedImage) {
                    newImageCache[recipe.id] = storedImage;
                }
            }


            setImageCache(newImageCache);
        };

        loadPictures();
    }, [FilteredRecipe]);

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
                                        uri: `${recipe.photoUrl ? recipe.photoUrl : `data:image/jpg;base64,${imageCache[recipe.id]}`}`,
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