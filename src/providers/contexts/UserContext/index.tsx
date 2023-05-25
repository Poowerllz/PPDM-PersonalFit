import React, {useContext, useState} from 'react';
import Image from '../../../database/models/Image';
import School from '../../../database/models/School';
import Session from '../../../database/models/Session';
import Teacher from '../../../database/models/Teacher';
import {IUser} from '../../../types';

export type UserContextProps = {
  user?: {};
};

export const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps,
);

interface Props {
  children: React.ReactNode;
}

const UserContextProvider = ({children}: Props) => {
  const [user, setUser] = useState<IUser>();

  return (
    <UserContext.Provider
      value={{
        user,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context) return context;

  throw new Error('useUserContext must be used within a UserContextProvider.');
};

export default UserContextProvider;
