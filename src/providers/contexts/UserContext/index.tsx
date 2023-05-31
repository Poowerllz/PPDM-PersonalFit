import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { IUser } from "../../../types";

export type UserContextProps = {
  user?: { isLoading: boolean; data?: IUser };
  setUser: (user: IUser) => Promise<void>;
};

export const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps
);

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<{ isLoading: boolean; data?: IUser }>({
    isLoading: true,
  });

  useEffect(() => {
    (async () => {
      const lastUser = await AsyncStorage.getItem("@PPDM-USER");

      if (lastUser) {
        setUser({ isLoading: false, data: JSON.parse(lastUser) });
        return;
      }

      setUser({ isLoading: false });
    })();
  }, []);

  const handleSetUser = async (user: IUser) => {
    await AsyncStorage.setItem("@PPDM-USER", JSON.stringify(user));
    setUser({ isLoading: false, data: user });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: handleSetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context) return context;

  throw new Error("useUserContext must be used within a UserContextProvider.");
};

export default UserContextProvider;
