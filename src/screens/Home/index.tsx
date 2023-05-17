import { FlatList, HStack, Image, Text, VStack } from "native-base";
import React from "react";

const HomeScreen = () => {
  const students = [
    {
      image_url: "https://i.ibb.co/W6LBh5G/download-1.jpg",
      name: "Jane Cooper",
    },
    {
      image_url: "https://i.ibb.co/KGdjgM4/download-3.jpg",
      name: "Wade Warren",
    },
    {
      image_url: "https://i.ibb.co/fqb3K5R/download-2.jpg",
      name: "Esther Howard",
    },
  ];

  return (
    <VStack flex={1} position={"relative"} safeArea px={4} py={4}>
      <Text fontWeight={600} fontSize={"2xl"}>
        Olá, João Pedro
      </Text>
      <Text fontWeight={400} fontSize={"sm"} mt={1}>
        Você já finalizou hoje 18 treinos!
      </Text>

      <Text mt={10} fontWeight={600} fontSize={"2xl"}>
        Alunos
      </Text>

      <FlatList
        data={students}
        renderItem={({ item }) => (
          <HStack
            py={4}
            borderBottomColor={"#DCE0E5"}
            borderBottomWidth={"1px"}
          >
            <HStack flex={1} alignItems={"center"} space={1}>
              <Image
                src={item.image_url}
                alt={"Imagem do estudante"}
                width={"40px"}
                height={"40px"}
                borderRadius={"500px"}
              />
              <Text fontWeight={500} fontSize={"md"}>
                {item.name}
              </Text>
            </HStack>
          </HStack>
        )}
      />
    </VStack>
  );
};

export default HomeScreen;
