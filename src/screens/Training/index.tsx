import moment from "moment";
import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../components/base/Icon";
import { IFinishedDay, IStudent, ITraining } from "../../types";
import "moment/locale/pt";
import { GymEmpty } from "../../assets/lottie";
import LottieView from "lottie-react-native";
import Navigation from "../../services/navigation";
import Routes from "../../routes/paths";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LIcons from "../../assets/lottie/allIcons";
import uuid from "react-native-uuid";

type Props = {
  route: {
    params: IStudent;
  };
};

moment.locale("pt");

const TrainingScreen: React.FC<any> = ({ route: { params } }: Props) => {
  const [trainings, setTrainings] = useState<ITraining[]>();
  const [completedTrainings, setCompletedTrainings] = useState<string[]>([]);

  const { name, image_url, height, weight, id } = params;

  useFocusEffect(() => {
    (async () => {
      const allTrainings: ITraining[] = JSON.parse(
        (await AsyncStorage.getItem("@PPDM-TRAININGS")) || "[]"
      );

      const studentTrainings = allTrainings.filter(
        (training) =>
          training?.student_id === id &&
          training.weekDay === new Date().getDay()
      );

      if (studentTrainings.length >= 1) {
        setTrainings(studentTrainings);
      }
    })();
  });

  const handleSubmitDay = async () => {
    const allFinisheds: ITraining[] = JSON.parse(
      (await AsyncStorage.getItem("@PPDM-FINISHED-TRAININGS")) || "[]"
    );

    await AsyncStorage.setItem(
      "@PPDM-FINISHED-TRAININGS",
      JSON.stringify([
        ...allFinisheds,
        {
          id: uuid.v4(),
          student_id: id,
          date: new Date().toString(),
          trainings: completedTrainings,
        } as IFinishedDay,
      ])
    );

    Navigation.navigate(Routes.home);
  };

  return (
    <VStack flex={1} position={"relative"} mt={6} px={4}>
      <VStack flex={1}>
        <Text color={"black"} fontWeight={600} fontSize={"2xl"} mb={4}>
          {moment().format("dddd")}
        </Text>

        <HStack w={"100%"} alignItems={"center"}>
          <HStack w={"100%"} flex={1} alignItems={"center"} space={1}>
            <Center
              width={"40px"}
              height={"40px"}
              borderRadius={"500px"}
              background={"primary.100"}
              mr={2}
            >
              {image_url ? (
                <Image
                  src={image_url}
                  alt={"Imagem do estudante"}
                  width={"100%"}
                  height={"100%"}
                  borderRadius={"500px"}
                />
              ) : (
                <Icon name={"user"} color={"#264673"} />
              )}
            </Center>
            <VStack>
              <Text color={"black"} fontWeight={500} fontSize={"md"}>
                {name}
              </Text>
              <Text color={"#576375"} fontWeight={400}>
                {height} - {weight}kg
              </Text>
            </VStack>
          </HStack>

          <TouchableOpacity onPress={() => {}}>
            <HStack
              alignItems={"center"}
              p={2}
              background={"primary.200"}
              borderRadius={"500px"}
              space={1}
            >
              <Text fontWeight={500} color={"#FFFFFF"}>
                Gerenciar treinos
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        <Text color={"black"} fontWeight={500} fontSize={"lg"} mt={10}>
          Treinos de hoje:
        </Text>
        {trainings && trainings.length >= 1 ? (
          <ScrollView>
            <VStack w={"100%"} space={2}>
              {trainings.map((training) => (
                <TouchableOpacity
                  key={training.id}
                  onPress={() => {
                    if (completedTrainings.includes(training.id)) {
                      setCompletedTrainings(
                        completedTrainings.filter((tr) => tr !== training.id)
                      );
                    } else {
                      setCompletedTrainings([
                        ...completedTrainings,
                        training.id,
                      ]);
                    }
                  }}
                >
                  <HStack
                    alignItems={"center"}
                    py={2}
                    borderBottomWidth={"1px"}
                    borderBottomColor={"#DCE0E5"}
                    justifyContent={"space-between"}
                    mr={2}
                  >
                    <HStack alignItems={"center"}>
                      <LottieView
                        autoPlay
                        loop
                        source={LIcons[training.icon]}
                        style={{ width: 100, height: 100, alignSelf: "center" }}
                      />
                      <VStack ml={2}>
                        <Text color={"black"} fontWeight={500} fontSize={"md"}>
                          {training.name}
                        </Text>
                        <Text color={"#576375"} fontWeight={400}>
                          Criado em:{" "}
                          {moment(new Date(training.created_at))
                            .format("DD/MMMM")
                            .toString()}
                        </Text>
                      </VStack>
                    </HStack>

                    <Icon
                      name={
                        completedTrainings.includes(training.id)
                          ? "check"
                          : "times"
                      }
                      color={
                        completedTrainings.includes(training.id)
                          ? "#218225"
                          : "#9B1208"
                      }
                    />
                  </HStack>
                </TouchableOpacity>
              ))}
            </VStack>

            <Box py={1} mb={4}>
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate(Routes.createNewTraining, { ...params })
                }
              >
                <HStack
                  mt={6}
                  alignSelf={"center"}
                  alignItems={"center"}
                  p={2}
                  background={"primary.200"}
                  borderRadius={"500px"}
                  space={1}
                >
                  <Icon name={"plus"} color={"#FFFFFF"} />
                  <Text fontWeight={500} color={"#FFFFFF"}>
                    Adicionar novos treinos
                  </Text>
                </HStack>
              </TouchableOpacity>
            </Box>
          </ScrollView>
        ) : (
          <Center flex={1}>
            <VStack>
              <LottieView
                autoPlay
                loop
                source={GymEmpty}
                style={{ width: 200, height: 200, alignSelf: "center" }}
              />
              <Text
                mt={4}
                color={"black"}
                fontWeight={600}
                fontSize={"lg"}
                textAlign={"center"}
              >
                Nenhum treino cadastrado ainda
              </Text>
              <Text color={"#576375"} fontWeight={400} textAlign={"center"}>
                Novos treinos aparecerão aqui!
              </Text>
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate(Routes.createNewTraining, { ...params })
                }
              >
                <HStack
                  mt={6}
                  alignSelf={"center"}
                  alignItems={"center"}
                  p={2}
                  background={"primary.200"}
                  borderRadius={"500px"}
                  space={1}
                >
                  <Icon name={"plus"} color={"#FFFFFF"} />
                  <Text fontWeight={500} color={"#FFFFFF"}>
                    Adicionar novo treino
                  </Text>
                </HStack>
              </TouchableOpacity>
            </VStack>
          </Center>
        )}
      </VStack>
      <Box w={"100%"} background={"white"} py={3}>
        <Button
          h={"56px"}
          borderRadius={"500px"}
          isDisabled={!completedTrainings || completedTrainings.length < 1}
          onPress={handleSubmitDay}
        >
          Finalizar dia
        </Button>
      </Box>
    </VStack>
  );
};

export default TrainingScreen;
