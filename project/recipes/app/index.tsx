import { Redirect } from "expo-router"
import React from "react"

const StartPage = () => {
    return <Redirect href={"/home"} />
}

export default StartPage;