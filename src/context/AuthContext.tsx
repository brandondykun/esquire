import { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../reducers/authSlice";

type AuthContextType = {
  currentUser: CurrentUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
};

const AuthContext = createContext<AuthContextType>(null!);

type Props = {
  children: React.ReactNode;
};

type CurrentUser = {
  id: number | null;
  email: string | null;
};

const AuthProvider = ({ children }: Props) => {
  const user = useSelector(getCurrentUser);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(user);

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
