import { Box, Center, HStack, Icon, Image, Text, VStack } from "native-base";
import startScreenImage from "../../assets/images/start_screen_image.png";
import React from "react";

const StartScreen = () => {
  return (
    <VStack flex={1} position={"relative"}>
      <Image
        alt={"Uma mulher fazendo esportes na academia."}
        source={startScreenImage}
        style={{ width: "100%", height: "100%" }}
        position={"absolute"}
      />

      <VStack safeArea flex={1} justifyContent={"flex-end"} px={4} py={4}>
        <Text color={"white"} fontWeight={600} fontSize={"3xl"}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
        <Text color={"white"} fontWeight={400} fontSize={"md"} mt={1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae
          eleifend eu eleifend ac vel elit malesuada fames. Semper luctus
          volutpat tempor arcu.
        </Text>

        <HStack
          borderWidth={"1px"}
          borderRadius={"500px"}
          borderColor={"white"}
          padding={"16px"}
          alignItems={"center"}
          background={"rgba(255, 255, 255, 0.1)"}
          width={"100%"}
          position={"relative"}
          mt={4}
        >
          <Center flex={1}>
            <Text color={"white"} fontWeight={600} fontSize={"lg"}>
              Começar
            </Text>
          </Center>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default StartScreen;
