import { Tabs } from "expo-router"
import React from "react"

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{ headerShown: false }} />
            <Tabs.Screen name="camera" options={{ headerShown: false }} />
        </Tabs>
    )
}

export default TabsLayout;