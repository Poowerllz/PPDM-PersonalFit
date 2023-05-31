import { Button, Input, Text, VStack } from "native-base";
import React, { useContext } from "react";
import { UserContext } from "../../providers/contexts/UserContext";
import { IUser } from "../../types";
import { useForm, Controller } from "react-hook-form";

const LoginScreen = () => {
  const { setUser } = useContext(UserContext);
  const { control, handleSubmit } = useForm({
    defaultValues: { name: "" } as IUser,
  });

  return (
    <VStack flex={1} mt={6} position={"relative"} safeAreaBottom px={4}>
      <VStack flex={1} alignItems={"flex-start"}>
        <Text fontWeight={600} fontSize={"2xl"} color={"black"}>
          Digite abaixo seu nome
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
              placeholder="Nome"
              borderRadius={"12px"}
            />
          )}
        />
      </VStack>

      <Button h={"56px"} borderRadius={"500px"} onPress={handleSubmit(setUser)}>
        Continuar
      </Button>
    </VStack>
  );
};

export default LoginScreen;
