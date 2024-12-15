import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import ImagePickerFunction from "@/components/ImagePicker";

// Import the default image using require
const noUserImage = require('@/assets/images/noUser.jpg');

const Profile = () => {
    const [image, setImage] = useState<string | null>(noUserImage);
    const [update, setUpdate] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [savedName, setSavedName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [savedEmail, setSavedEmail] = useState<string>('');
    const [age, setAge] = useState<number>(0);
    const [savedAge, setSavedAge] = useState<number>(0);

    const SaveData = () => {
        setSavedName(name);
        setSavedEmail(email);
        setSavedAge(age);
        setUpdate(!update);
        { !update && Alert.alert("Profile Updated", "Your profile has been updated successfully."); }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView style={styles.container}>
                <View style={styles.imgContainer}>
                    <ImagePickerFunction setImage={setImage} image={image} />
                </View>
                {!update && (
                    <View style={styles.textFieldContainer}>
                        <TextInput
                            placeholder="Name"
                            placeholderTextColor="#888"
                            style={styles.input}
                            onChangeText={(text) => setName(text)}
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#888"
                            style={styles.input}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            placeholder="Age"
                            placeholderTextColor="#888"
                            style={styles.input}
                            keyboardType="numeric"
                            onChangeText={(text) => setAge(Number(text))}
                        />
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={SaveData}
                    >
                        <Text style={styles.buttonText}>{update ? "Update" : "Save"}</Text>
                    </Pressable>
                </View>
                {update && (
                    <View style={styles.textFieldContainer}>
                        <Text style={styles.name}>{savedName}</Text>
                        <Text style={styles.email}>{savedEmail}</Text>
                        <Text style={styles.age}>{savedAge}</Text>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    textFieldContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    email: {
        fontSize: 18,
        color: 'gray',
        marginBottom: 10,
    },
    age: {
        fontSize: 18,
        color: 'gray',
    },
    buttonContainer: {
        alignItems: 'center',
    },
    imgContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default Profile;