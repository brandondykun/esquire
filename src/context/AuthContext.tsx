import { useState, useEffect, useContext } from "react";
import { createContext } from "react";

type AuthContextType = {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

const AuthContext = createContext<AuthContextType>(null!);

type Props = {
  children: React.ReactNode;
};

type CurrentUser = {
  id: number;
  email: string;
};

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  return { currentUser, setCurrentUser };
};

export default AuthProvider;
