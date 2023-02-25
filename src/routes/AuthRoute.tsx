import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { getCurrentUser } from "../reducers/authSlice";

type Props = {
  children: JSX.Element;
};

const AuthRoute = ({ children }: Props) => {
  // const { currentUser } = useAuthContext();

  const currentUser = useSelector(getCurrentUser);

  if (!currentUser.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthRoute;
