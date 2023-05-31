import { Button, Input, Text, VStack } from "native-base";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { IStudent } from "../../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import Navigation from "../../services/navigation";

const defaultValues = {} as IStudent;

const NewStudentScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues });

  const handleSubmitStudent: SubmitHandler<typeof defaultValues> = async (
    values
  ) => {
    Navigation.goBack();
    const oldersStudents = await AsyncStorage.getItem("@PPDM-STUDENTS");

    await AsyncStorage.setItem(
      "@PPDM-STUDENTS",
      JSON.stringify([
        ...JSON.parse(oldersStudents || "[]"),
        { ...values, created_at: new Date().toString(), id: uuid.v4() },
      ])
    );

    Toast.show({
      type: "success",
      text1: "Aluno cadastrado com sucesso!",
      text2: "Vamos treinar?",
    });
  };

  return (
    <VStack flex={1} mt={6} position={"relative"} safeAreaBottom px={4}>
      <VStack flex={1} alignItems={"flex-start"}>
        <Text fontWeight={600} fontSize={"2xl"} color={"black"}>
          Criação de novo aluno
        </Text>
        <Text fontWeight={400} color={"#576375"}>
          Lembre de cadastrar as informações junto com o aluno.
        </Text>

        <VStack mt={6} w={"100%"} space={2}>
          <Controller
            rules={{ required: true }}
            control={control}
            name={"name"}
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                isInvalid={!!fieldState.error}
                value={field.value}
                h={"56px"}
                placeholder="Nome"
                borderRadius={"12px"}
              />
            )}
          />

          <Controller
            rules={{ required: true }}
            control={control}
            name={"height"}
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                isInvalid={!!fieldState.error}
                value={field.value}
                h={"56px"}
                placeholder="Altura"
                borderRadius={"12px"}
              />
            )}
          />

          <Controller
            rules={{ required: true }}
            control={control}
            name={"weight"}
            render={({ field, fieldState }) => (
              <Input
                onChangeText={field.onChange}
                keyboardType={"number-pad"}
                isInvalid={!!fieldState.error}
                value={field.value}
                h={"56px"}
                placeholder="Peso"
                borderRadius={"12px"}
              />
            )}
          />
        </VStack>
      </VStack>

      <Button
        h={"56px"}
        borderRadius={"500px"}
        isLoading={isSubmitting}
        onPress={handleSubmit(handleSubmitStudent)}
      >
        Salvar
      </Button>
    </VStack>
  );
};

export default NewStudentScreen;
