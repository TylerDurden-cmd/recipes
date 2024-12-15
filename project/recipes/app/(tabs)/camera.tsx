import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useContext, useRef } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import PhotoPreviewSection from '@/components/PhotoPreviewSection';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { recipesContext } from '@/recipesContext';

export default function CameraComponent() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<any>(null);
    const cameraRef = useRef<CameraView | null>(null);
    const { apiRecipes } = useContext(recipesContext);
    const nextId = apiRecipes.reduce((max, r) => (r.id > max ? r.id : max), 0) + 1;

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }


    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function ToggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const HandleTakePhoto = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 1,
                base64: true,
                exif: false
            };

            const takedPhoto = await cameraRef.current.takePictureAsync(options);

            setPhoto(takedPhoto)
        }

    };

    const HandleRetakePhoto = () => setPhoto(null);

    const SavePhoto = async () => {
        await AsyncStorage.setItem(`photo: [${nextId}]`, photo.base64)
        /* console.log(await AsyncStorage.getItem(`photo: [${nextId}]`)) */
        router.push("/create")
    }

    if (photo) {
        return <PhotoPreviewSection photo={photo} handleRetakePhoto={HandleRetakePhoto} SavePhoto={SavePhoto} />
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={ToggleCameraFacing}>
                        <FontAwesome name='retweet' size={40} color={"black"} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={HandleTakePhoto}>
                        <FontAwesome name='camera' size={40} color={"black"} />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
