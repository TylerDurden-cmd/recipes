import { Tabs } from "expo-router"
import React from "react"
import { FontAwesome } from "@expo/vector-icons";

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="camera" size={size} color={color} />
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;