import { NativeBaseProvider, VStack } from "native-base";
import React from "react";
import AppRoutes from "./routes";
import theme from "./theme";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import UserContextProvider from "./providers/contexts/UserContext";
import Toast from "react-native-toast-message";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <VStack flex={1} safeAreaBottom>
        <UserContextProvider>
          <Toast />
          <AppRoutes />
        </UserContextProvider>
      </VStack>
    </NativeBaseProvider>
  );
}
