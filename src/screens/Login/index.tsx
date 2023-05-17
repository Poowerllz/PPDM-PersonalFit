import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  VStack,
} from "native-base";
import React from "react";

const LoginScreen = () => {
  return (
    <VStack flex={1} position={"relative"} safeArea px={4} py={4}>
      <VStack flex={1}>
        <Text fontWeight={600} fontSize={"2xl"}>
          Digite abaixo seu nome
        </Text>

        <Input mt={6} h={"56px"} placeholder="Nome" borderRadius={"12px"} />
      </VStack>

      <Button h={"56px"} borderRadius={"500px"}>
        Continuar
      </Button>
    </VStack>
  );
};

export default LoginScreen;
