import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Routes from "./paths";
import Header from "../components/Header";
import { navigationRef } from "../services/navigation";
import { UserContext } from "../providers/contexts/UserContext";
import HomeScreen from "../screens/Home";
import LoginScreen from "../screens/Login";

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const { user } = useContext(UserContext);

  console.log("-->", user);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={Routes.login}>
        {!user && (
          <Stack.Screen
            name={Routes.login}
            component={LoginScreen}
            options={{
              header: () => <Header hideBack title="Iniciar" />,
              headerShown: true,
              contentStyle: { backgroundColor: "white" },
            }}
          />
        )}

        {user && (
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
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
