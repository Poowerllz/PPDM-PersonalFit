import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { Center, HStack, Image, ScrollView, Text, VStack } from "native-base";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "../../components/base/Icon";
import { UserContext } from "../../providers/contexts/UserContext";
import Routes from "../../routes/paths";
import Navigation from "../../services/navigation";
import { IFinishedDay, IStudent } from "../../types";
import "moment/locale/pt";

const HomeScreen = () => {
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState<{
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
        .map((training) => training.student_id);

      const oldersStudents = await AsyncStorage.getItem("@PPDM-STUDENTS");
      setStudents({
        lenFinished: allFinisheds.length,
        students: JSON.parse(oldersStudents || "[]").filter(
          (student) => !allFinisheds.includes(student.id)
        ),
      });
    })();
  });

  return (
    <VStack flex={1} position={"relative"} mt={6} px={4}>
      {students?.students && (
        <>
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
              <Text color={"#576375"} fontWeight={600} fontSize={"lg"}>
                ({students.students.length})
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

          <ScrollView>
            {students.students.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
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

                    <Icon name={"angle-right"} />
                  </HStack>
                </HStack>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </VStack>
  );
};

export default HomeScreen;
