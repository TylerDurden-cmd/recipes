import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import {
    requestForegroundPermissionsAsync,
    LocationObject,
    getCurrentPositionAsync,
} from "expo-location";
import MapView, { Marker } from "react-native-maps";

const FindLocation = () => {
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            let { status } = await requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const SuperMarkets = [
        {
            id: 1,
            name: "Carrefour",
            location: {
                latitude: 51.21903259928931,
                longitude: 4.402797373521116,
            },
        },
        {
            id: 2,
            name: "Delhaize",
            location: {
                latitude: 51.18562064626452,
                longitude: 4.386203813408179,
            },
        },
        {
            id: 3,
            name: "Lidl",
            location: {
                latitude: 51.14623421177145,
                longitude: 4.438427584170441,
            },
        },
        {
            id: 4,
            name: "Aldi",
            location: {
                latitude: 51.24411107516268,
                longitude: 4.444606141154232,
            },
        },
        {
            id: 5,
            name: "Colruyt",
            location: {
                latitude: 51.1064860389011,
                longitude: 4.372816062146383,
            },
        },
    ]

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: location?.coords.latitude || 0,
                    longitude: location?.coords.longitude || 0,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                <Marker
                    key={0}
                    coordinate={{
                        latitude: location?.coords.latitude || 0,
                        longitude: location?.coords.longitude || 0,
                    }}
                    title="your location">
                </Marker>
                {SuperMarkets.map((supermarket) => (
                    <Marker
                        key={supermarket.id}
                        coordinate={supermarket.location}
                        title={supermarket.name}
                        pinColor="orange"
                    />
                ))}

            </MapView>

        </View>
    );
};
//hide-start
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    }
});
export default FindLocation;
