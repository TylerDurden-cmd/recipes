import React, { useState } from "react"
import { FlatList, View, Text, TextInput, Button, ScrollView, Pressable, StyleSheet } from "react-native"
import { IShoppingList } from "@/types";
import { FontAwesome } from "@expo/vector-icons";

const List = () => {
    const [shoppingList, setShoppingList] = useState<IShoppingList[]>([]);
    const [ingredients, setIngredients] = useState<string>("");

    const addIngredients = () => {
        if (ingredients) {
            if (shoppingList.length < 60) {
                setShoppingList([
                    ...shoppingList,
                    {
                        id: shoppingList.length + 1,
                        ingredients,
                    },
                ]);
                setIngredients("");
            } else {
                alert("You can only have 60 items in your shopping list");
            }
        }
    }

    const deleteIngredients = (id: number) => {
        const UpdatedList = shoppingList.filter((item) => item.id !== id);
        setShoppingList(UpdatedList);
    };

    return (
        <View style={styles.container}>
            <View>
                <TextInput
                    style={{ marginTop: 10, height: 40, borderColor: 'gray', borderWidth: 1 }}
                    placeholder="Add ingredients"
                    placeholderTextColor={"black"}
                    value={ingredients}
                    onChangeText={setIngredients}
                />
                <Button title="Add" color={"green"} disabled={false} onPress={addIngredients} />
            </View>
            <FlatList
                style={{ marginTop: 20 }}
                data={shoppingList}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.title} >{item.id}. {item.ingredients}</Text>
                        <Pressable
                            onPress={() => {
                                deleteIngredients(item.id);
                            }}
                        >
                            <FontAwesome name='trash' size={20} color={"black"} />
                        </Pressable>
                    </View>
                )}
                keyExtractor={shoppingList => shoppingList.id.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: "lightgray",
    },
    title: {
        fontSize: 20,
    },
})

export default List;