import { recipesContext } from "@/recipesContext";
import { Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable } from "react-native"
import React from "react";
import { IRecipes } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cuisines = () => {
    const { cuisine } = useLocalSearchParams<{ cuisine: string }>();
    const { apiRecipes } = useContext(recipesContext);

    // Filter recipes by cuisine
    const recipesOfCuisines: IRecipes[] = apiRecipes.filter((item) => item.cuisine === cuisine);

    const router = useRouter();

    // Image cache to store URIs dynamically
    const [imageCache, setImageCache] = useState<Record<string, string>>({});

    useEffect(() => {
        const loadPictures = async () => {
            const newImageCache: Record<string, string> = {};

            for (const recipe of recipesOfCuisines) {
                const storedImage = await AsyncStorage.getItem(`photo: [${recipe.id}]`);
                if (storedImage) {
                    newImageCache[recipe.id] = storedImage;
                }
            }

            setImageCache(newImageCache);
        };

        loadPictures();
    }, [recipesOfCuisines]);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: cuisine }} />

            <FlatList
                data={recipesOfCuisines}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push({ pathname: "/recipes/[recipe]", params: { recipe: item.id } })}
                        style={styles.item}
                    >
                        <Image
                            style={styles.imageItem}
                            source={{
                                uri: `${item.photoUrl ? item.photoUrl : `data:image/jpg;base64,${imageCache[item.id]}`}`,
                            }}
                            resizeMode="cover"
                        />
                        <Text>{item.title}</Text>
                    </Pressable>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",

    },
    item: {
        flexDirection: "column",
        alignItems: "center",
        width: 370,
        minHeight: 200,
        maxHeight: 300,
        borderWidth: 1,
        margin: 10,
        borderRadius: 25,
        overflow: "hidden",
    },
    imageItem: {
        width: "100%",
        height: 150,
    },
});

export default Cuisines;