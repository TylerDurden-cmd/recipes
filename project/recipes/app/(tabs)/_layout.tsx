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

            <Tabs.Screen
                name="create"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="plus" size={size} color={color} />
                }}
            />

            <Tabs.Screen
                name="supermarkets"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="map" size={size} color={color} />,
                    title: "Supermarkets"
                }}
            />

            <Tabs.Screen
                name="shoppingList"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="list" size={size} color={color} />,
                    title: "shopping List"
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
                    title: "profile"
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;