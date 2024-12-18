import { Button, Image, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { IImagePicker } from '@/types';
import React from 'react';


export default function ImagePickerFunction({ image, setImage }: IImagePicker) {

    const PickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {image && (
                <Image
                    source={typeof image === 'string' ? { uri: image } : image}
                    style={styles.image}
                />
            )}
            <Button title="Add profile picture" onPress={PickImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'gray',
        marginTop: 20,
    },
});
