import React, { useState } from "react";
import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { IRouter } from "@/types";
import ImagePickerFunction from "@/components/ImagePicker";

const profile = ({ router }: IRouter) => {
    const noUserImage = require('@/assets/images/noUser.jpg');
    const [image, setImage] = useState<string | null>(noUserImage);
    const [update, setUpdate] = useState<boolean>(false);
    return (
        <View style={styles.container}>
            <ImagePickerFunction setImage={setImage} image={image} />
            {update && (
                <View style={styles.textFieldContainer}>
                    <Text style={styles.name}>
                        Joachim
                    </Text>
                    <Text style={styles.email}>
                        joachim.adomako@student.ap.be
                    </Text>
                    <Text>
                        age: 21
                    </Text>
                </View>
            )}
            <Pressable
                style={styles.button}
                onPress={() => setUpdate(!update)}>
                <Text style={styles.buttonText}>update </Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    textFieldContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        marginBottom: 20,
    },
    email: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 20,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default profile;