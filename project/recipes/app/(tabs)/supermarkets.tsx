import FindLocation from "@/components/FindLocation";
import React from "react";
import { View, StyleSheet } from "react-native";

const SuperMarkets = () => {
    return (
        <View style={styles.container}>
            <FindLocation />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default SuperMarkets;