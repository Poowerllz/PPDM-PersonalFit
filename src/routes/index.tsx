import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./paths";
import Header from "../components/Header";
import { navigationRef } from "../services/navigation";
import { UserContext } from "../providers/contexts/UserContext";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";
import SplashScreen from "../screens/Splash";
import NewStudentScreen from "../screens/NewStudent";
import TrainingScreen from "../screens/Training";
import CreateTrainingScreen from "../screens/Training/CreateTraining";
import StartScreen from "../screens/Start";

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={Routes.splash}>
        {user.isLoading && (
          <Stack.Screen
            name={Routes.splash}
            component={SplashScreen}
            options={{
              header: () => <Header hideBack />,
              headerShown: false,
              contentStyle: { backgroundColor: "white" },
            }}
          />
        )}

        {!user.data && (
          <>
            <Stack.Screen
              name={Routes.start}
              component={StartScreen}
              options={{
                header: () => <Header hideBack title="Iniciar" />,
                headerShown: false,
                contentStyle: { backgroundColor: "white" },
              }}
            />

            <Stack.Screen
              name={Routes.login}
              component={LoginScreen}
              options={{
                header: () => <Header hideBack title="Iniciar" />,
                headerShown: true,
                contentStyle: { backgroundColor: "white" },
              }}
            />
          </>
        )}

        {user.data && (
          <Stack.Group>
            <Stack.Screen
              name={Routes.home}
              component={HomeScreen}
              options={{
                header: () => <Header hideBack />,
                headerShown: true,
                contentStyle: { backgroundColor: "white" },
              }}
            />

            <Stack.Screen
              name={Routes.newStudent}
              component={NewStudentScreen}
              options={{
                header: () => <Header title="Novo aluno" />,
                headerShown: true,
                contentStyle: { backgroundColor: "white" },
              }}
            />

            <Stack.Screen
              name={Routes.training}
              component={TrainingScreen}
              options={{
                header: () => <Header title="Treino" />,
                headerShown: true,
                contentStyle: { backgroundColor: "white" },
              }}
            />

            <Stack.Screen
              name={Routes.createNewTraining}
              component={CreateTrainingScreen}
              options={{
                header: () => <Header title="Criar novo treino" />,
                headerShown: true,
                contentStyle: { backgroundColor: "white" },
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
