import React, { useContext, useState } from "react";
import { IUser } from "../../../types";

export type UserContextProps = {
  user?: {};
  setUser: (user: IUser) => void;
};

export const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps
);

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
