import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../components/base/Icon";
import { UserContext } from "../../providers/contexts/UserContext";
import Routes from "../../routes/paths";
import Navigation from "../../services/navigation";
import { IFinishedDay, IStudent, ITraining } from "../../types";
import LottieView from "lottie-react-native";
import "moment/locale/pt";
import { GymEmpty } from "../../assets/lottie";

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState<{
    allStudents: IStudent[];
    students: IStudent[];
    lenFinished: number;
  }>();

  moment.locale("pt");

  useFocusEffect(() => {
    (async () => {
      const allFinisheds: string[] = JSON.parse(
        (await AsyncStorage.getItem("@PPDM-FINISHED-TRAININGS")) || "[]"
      )
        .filter((training: IFinishedDay) => {
          const data1 = moment(new Date(training.date), "YYYY-MM-DD");
          const data2 = moment(new Date(), "YYYY-MM-DD");

          return (
            data1.isSame(data2, "day") &&
            data1.isSame(data2, "month") &&
            data1.isSame(data2, "year")
          );
        })
        .map((training: ITraining) => training.student_id);

      const oldersStudents = await AsyncStorage.getItem("@PPDM-STUDENTS");
      setStudents({
        lenFinished: allFinisheds.length,
        students: JSON.parse(oldersStudents || "[]").filter(
          (student) => !allFinisheds.includes(student.id)
        ),
        allStudents: JSON.parse(oldersStudents || "[]"),
      });
    })();
  });

  const tabs = [
    {
      name: `Pendentes (${students?.students.length})`,
      value: students?.students,
    },
    {
      name: "Todos os alunos",
      value: students?.allStudents,
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <VStack flex={1} position={"relative"} mt={6}>
      {students?.students && (
        <>
          <VStack px={4}>
            <Text fontWeight={600} color={"black"} fontSize={"2xl"}>
              Olá, {user.data.name}
            </Text>
            <Text color={"#576375"} fontWeight={400} fontSize={"sm"} mt={1}>
              Você já finalizou hoje {students.lenFinished} treinos!
            </Text>

            <HStack
              alignItems={"center"}
              mt={10}
              w={"100%"}
              justifyContent={"space-between"}
            >
              <HStack>
                <Text color={"black"} fontWeight={600} fontSize={"2xl"}>
                  Alunos
                </Text>
              </HStack>

              <TouchableOpacity
                onPress={() => Navigation.navigate(Routes.newStudent)}
              >
                <HStack
                  alignItems={"center"}
                  p={2}
                  background={"primary.200"}
                  borderRadius={"500px"}
                  space={1}
                >
                  <Icon name={"plus"} color={"#FFFFFF"} />

                  <Text fontWeight={500} color={"#FFFFFF"}>
                    Novo aluno
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
          </VStack>

          <HStack
            mt={6}
            borderBottomWidth={"1px"}
            w={"100%"}
            borderBottomColor={"#F2F4F7"}
            px={4}
          >
            {tabs.map((tab, index) => (
              <VStack
                w={"50%"}
                alignItems={"center"}
                borderBottomWidth={"2px"}
                borderBottomColor={
                  index === tabIndex ? "primary.200" : "transparent"
                }
              >
                <TouchableOpacity
                  style={{ paddingBottom: 8 }}
                  onPress={() => setTabIndex(index)}
                >
                  <Text color={"black"} fontWeight={500} fontSize={"md"}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              </VStack>
            ))}
          </HStack>

          {students.students.length >= 1 ? (
            <ScrollView px={4}>
              {tabs[tabIndex].value.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    tabIndex === 0 &&
                    Navigation.navigate(Routes.training, { ...item })
                  }
                >
                  <HStack
                    py={4}
                    borderBottomColor={"#DCE0E5"}
                    borderBottomWidth={"1px"}
                  >
                    <HStack flex={1} alignItems={"center"} space={1}>
                      <Center
                        width={"40px"}
                        height={"40px"}
                        borderRadius={"500px"}
                        background={"primary.100"}
                        mr={2}
                      >
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={"Imagem do estudante"}
                            width={"100%"}
                            height={"100%"}
                            borderRadius={"500px"}
                          />
                        ) : (
                          <Icon name={"user"} color={"#264673"} />
                        )}
                      </Center>
                      <VStack flex={1}>
                        <Text color={"black"} fontWeight={500} fontSize={"md"}>
                          {item.name}
                        </Text>
                        <Text color={"#576375"} fontWeight={400}>
                          Aluno criado em:{" "}
                          {moment(new Date(item.created_at))
                            .format("DD/MMMM")
                            .toString()}
                        </Text>
                      </VStack>
                      {tabIndex === 0 && <Icon name={"angle-right"} />}
                    </HStack>
                  </HStack>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Center flex={1} px={4}>
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
                  Nenhum aluno por aqui
                </Text>
                <Text color={"#576375"} fontWeight={400} textAlign={"center"}>
                  Cadastre novos alunos para visualizar as pendências de treinos
                </Text>
                <TouchableOpacity
                  onPress={() => Navigation.navigate(Routes.newStudent)}
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
                      Novo aluno
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            </Center>
          )}
        </>
      )}
    </VStack>
  );
};

export default HomeScreen;
