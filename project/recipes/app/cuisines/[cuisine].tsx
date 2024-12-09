import { recipesContext } from "@/recipesContext";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"
import { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable } from "react-native"
import React from "react";
import { IRecipes } from "@/types";

const Cuisines = () => {
    /* handler voor de router params*/
    const { cuisine } = useLocalSearchParams<{ cuisine: string }>();
    /* context recipes */
    const { apiRecipes, SetApiRecipes } = useContext(recipesContext);

    const recipesOfCuisines: IRecipes[] = apiRecipes.filter((item) => item.cuisine === cuisine)

    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: cuisine }} />

            <FlatList
                data={recipesOfCuisines}
                renderItem={((item) =>
                    <Pressable onPress={() => { router.push({ pathname: "/recipes/[recipe]", params: { recipe: item.item.id } }) }} style={styles.item}>
                        <Image
                            style={styles.imageItem}
                            source={{
                                uri: `${item.item.photoUrl}`,
                            }}
                        />
                        <Text>
                            {item.item.title}
                        </Text>
                    </Pressable>
                )}
                keyExtractor={item => item.id.toString()}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "center",
    },
    item: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: 370,
        minHeight: 200,
        maxHeight: 300,
        borderWidth: 1,
        borderStyle: 'solid',
        margin: 10,
        borderRadius: 25,

    },
    imageItem: {
        width: 370,
        height: 150,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        marginBottom: 10
    }
})

export default Cuisines