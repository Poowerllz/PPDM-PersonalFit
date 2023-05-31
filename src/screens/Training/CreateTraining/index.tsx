import { Box, Button, HStack, Input, Text, VStack } from "native-base";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IStudent, ITraining } from "../../../types";
import * as LIcons from "../../../assets/lottie/allIcons";
import LottieView from "lottie-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Navigation from "../../../services/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";

type Props = {
  route: {
    params: IStudent;
  };
};

const defaultValues = {} as ITraining;

const CreateTrainingScreen: React.FC<any> = ({ route: { params } }: Props) => {
  const { id, name } = params;

  const { control, handleSubmit } = useForm({ defaultValues });

  const handleSubmitTraining: SubmitHandler<typeof defaultValues> = async (
    values
  ) => {
    Navigation.goBack();
    const olderTraining = await AsyncStorage.getItem("@PPDM-TRAININGS");

    await AsyncStorage.setItem(
      "@PPDM-TRAININGS",
      JSON.stringify([
        ...JSON.parse(olderTraining || "[]"),
        {
          ...values,
          created_at: new Date().toString(),
          id: uuid.v4(),
          student_id: id,
        },
      ])
    );

    Toast.show({
      type: "success",
      text1: "Treino cadastrado com sucesso!",
      text2: "A meta agora é validar.",
    });
  };

  return (
    <VStack flex={1} mt={6} position={"relative"} safeAreaBottom px={4}>
      <VStack flex={1} alignItems={"flex-start"}>
        <Text fontWeight={600} fontSize={"2xl"} color={"black"}>
          Criação de novo treino
        </Text>
        <Text fontWeight={400} color={"#576375"} fontSize={"sm"} mt={1}>
          Você está cadastrando um novo treino para o aluno {name}
        </Text>

        <Controller
          rules={{ required: true }}
          control={control}
          name={"name"}
          render={({ field, fieldState }) => (
            <Input
              onChangeText={field.onChange}
              isInvalid={!!fieldState.error}
              value={field.value}
              mt={6}
              h={"56px"}
              placeholder="Nome do treino"
              borderRadius={"12px"}
            />
          )}
        />

        <Text fontWeight={600} color={"black"} fontSize={"md"} mt={4}>
          Escolha o melhor ícone:
        </Text>

        <Controller
          rules={{ required: true }}
          control={control}
          name={"icon"}
          render={({ field, fieldState }) => (
            <HStack
              flex={1}
              mt={6}
              flexWrap={"wrap"}
              space={0}
              justifyContent={"center"}
            >
              {Object.keys(LIcons).map((key) => (
                <TouchableOpacity key={key} onPress={() => field.onChange(key)}>
                  <Box padding={1}>
                    <Box
                      padding={0.5}
                      borderWidth={"2px"}
                      borderColor={
                        !!fieldState.error
                          ? "#FF0000"
                          : field.value === key
                          ? "primary.200"
                          : "#DCE0E5"
                      }
                      borderRadius={"4px"}
                    >
                      <LottieView
                        autoPlay
                        loop
                        source={LIcons[key]}
                        style={{ width: 60, height: 60, alignSelf: "center" }}
                      />
                    </Box>
                  </Box>
                </TouchableOpacity>
              ))}
            </HStack>
          )}
        />
      </VStack>

      <Button
        h={"56px"}
        borderRadius={"500px"}
        onPress={handleSubmit(handleSubmitTraining)}
      >
        Salvar treino
      </Button>
    </VStack>
  );
};

export default CreateTrainingScreen;
