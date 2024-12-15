import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View, TextInput, Button, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { IRecipes } from "@/types";
import { recipesContext } from "@/recipesContext";

const CreateRecipe = () => {
    const [recipe, setRecipe] = useState<IRecipes>({
        id: 0,
        title: "",
        course: "",
        cuisine: "American", // Default cuisine
        mainIngredient: "",
        description: "",
        source: "",
        url: "",
        urlHost: "",
        prepTime: 0,
        cookTime: 0,
        totalTime: 0,
        servings: 0,
        yield: 0,
        ingredients: "",
        directions: "",
        tags: "",
        rating: "",
        publicUrl: "",
        photoUrl: "",
        private: "",
        nutritionalScoreGeneric: "",
        calories: 0,
        fat: "",
        cholesterol: "",
        sodium: "",
        sugar: "",
        carbohydrate: "",
        fiber: "",
        protein: "",
        cost: "",
    });

    const [photoUri, setPhotoUri] = useState<string>("");
    const { apiRecipes, SetApiRecipes } = useContext(recipesContext);

    const nextId = apiRecipes.reduce((max, r) => (r.id > max ? r.id : max), 0) + 1;

    useEffect(() => {
        const loadPhoto = async () => {
            const photo = await AsyncStorage.getItem(`photo: [${nextId}]`);
            if (photo) {
                setPhotoUri(`data:image/jpg;base64,${photo}`);
            }
        };
        loadPhoto();
    }, []);

    const handleInputChange = (field: keyof IRecipes, value: string | number) => {
        setRecipe((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSaveRecipe = async () => {
        try {
            const newRecipe = { ...recipe, id: nextId };
            // Add the new recipe to the context
            SetApiRecipes([...apiRecipes, newRecipe]);
            // Perform API request
            const response = await fetch("https://sampleapis.assimilate.be/recipes/recipes", {
                method: "POST",
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNDUyOUBhcC5iZSIsImlhdCI6MTczMzczMzE4NX0.NehBWu50jIABqPVEYtjOCLeXbOeNjftJe1wNN7Cu7Vk`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newRecipe),
            });

            if (response.ok) {
                Alert.alert("Success", "Recipe saved successfully!");
            } else {
                Alert.alert("Error", "Failed to save recipe. Please try again.");
            }
        } catch (error) {
            console.error("Error saving recipe:", error);
            Alert.alert("Error", "An unexpected error occurred.");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Image
                        style={styles.imagePreview}
                        source={{ uri: photoUri || undefined }}
                    />
                    <TextInput
                        placeholder="Recipe Name"
                        style={styles.input}
                        placeholderTextColor="#888"
                        value={recipe.title}
                        onChangeText={(text) => handleInputChange("title", text)}
                    />
                    <TextInput
                        placeholder="Preparation Time (mins)"
                        style={styles.input}
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("prepTime", Number(text))}
                    />
                    <TextInput
                        placeholder="Cooking Time (mins)"
                        style={styles.input}
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("cookTime", Number(text))}
                    />
                    <TextInput
                        placeholder="Calories"
                        style={styles.input}
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("calories", Number(text))}
                    />
                    <TextInput
                        placeholder="Servings"
                        style={styles.input}
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        onChangeText={(text) => handleInputChange("servings", Number(text))}
                    />
                    <TextInput
                        placeholder="Cuisine"
                        style={styles.input}
                        placeholderTextColor="#888"
                        value={recipe.cuisine}
                        onChangeText={(text) => handleInputChange("cuisine", text)}
                    />
                    <TextInput
                        placeholder="Ingredients"
                        style={[styles.input, styles.textArea]}
                        placeholderTextColor="#888"
                        value={recipe.ingredients}
                        multiline
                        onChangeText={(text) => handleInputChange("ingredients", text)}
                    />
                    <TextInput
                        placeholder="Directions"
                        style={[styles.input, styles.textArea]}
                        placeholderTextColor="#888"
                        value={recipe.directions}
                        multiline
                        onChangeText={(text) => handleInputChange("directions", text)}
                    />
                    <Button title="Save Recipe" color="#6200ea" onPress={handleSaveRecipe} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    scrollContent: {
        padding: 20,
        alignItems: "center",
    },
    imagePreview: {
        width: "100%",
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#eaeaea",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: "top",
    },
});

export default CreateRecipe;
