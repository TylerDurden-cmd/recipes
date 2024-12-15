import { IRecipes } from "@/types";
import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Recipe = () => {
    const { recipe } = useLocalSearchParams<{ recipe: string }>();
    const { apiRecipes } = useContext(recipesContext);
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
        <View style={styles.container}>
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
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    flexBox: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    imgRecipe: {
        width: "90%",
        height: 250,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginVertical: 20,
        alignSelf: "center",
    },
    noRecipeText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#999",
        marginTop: 50,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
        textAlign: "center",
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 22,
        color: "#555",
        textAlign: "left",
        marginVertical: 5,
    },
    recipeContainer: {
        padding: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    ingredientsContainer: {
        padding: 15,
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    directionsContainer: {
        padding: 15,
        backgroundColor: "#f7f7f7",
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
    }
});


export default Recipe