import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, VStack } from "native-base";
import React from "react";

export default function App() {
  return (
    <NativeBaseProvider>
      <VStack flex={1}>
        <Text>Hello world</Text>
      </VStack>
    </NativeBaseProvider>
  );
}
