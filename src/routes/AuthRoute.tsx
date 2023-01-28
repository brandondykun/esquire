import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

type Props = {
  children: JSX.Element;
};

const AuthRoute = ({ children }: Props) => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;
