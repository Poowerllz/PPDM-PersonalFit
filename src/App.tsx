import { StatusBar } from "expo-status-bar";
import { Center, NativeBaseProvider, Text, VStack } from "native-base";
import React from "react";
import StartScreen from "./screens/Start";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";

export default function App() {
  return (
    <NativeBaseProvider>
      {/*       <StartScreen /> */}
      {/*   <LoginScreen /> */}
      <HomeScreen />
    </NativeBaseProvider>
  );
}
