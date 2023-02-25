import { useEffect, useState } from "react";
import Button from "../components/Button";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { login } from "../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../reducers/authSlice";
import { AppDispatch } from "../store/store";
import { getLoginStatus, getLoginError } from "../reducers/authSlice";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [loginErrorText, setLoginErrorText] = useState("");

  // const [loginLoading, setLoginLoading] = useState(false);

  // const { currentUser, setCurrentUser } = useAuthContext();

  const dispatch = useDispatch<AppDispatch>();
  const loginStatus = useSelector(getLoginStatus);
  const loginError = useSelector(getLoginError);

  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === "succeeded") {
      dispatch(resetAuthState());
      navigate("/");
    }
  }, [loginStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUsernameErrorText("");
    setPasswordErrorText("");
    setLoginErrorText("");

    let error = false;

    if (!username) {
      setUsernameErrorText("Please enter a username.");
      error = true;
    }

    if (!password) {
      setPasswordErrorText("Please enter a password.");
      error = true;
    }

    if (error) {
      console.log("ERROR");
      setLoginErrorText("Please complete all fields.");
      return;
    }
    // This is a mock login
    // setLoginLoading(true);
    dispatch(loginUser({ email: username, password }));
    // login({ email: username, password })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setCurrentUser(res.data);
    //       navigate("/");
    //       return;
    //     }
    //     setLoginErrorText("Invalid credentials.");
    //   })
    //   .catch((err) => {
    //     console.error("LOGIN ERR: ", err.message);
    //     setLoginErrorText("There was an issue logging you in.");
    //   })
    //   .finally(() => setLoginLoading(false));
  };
  return (
    <>
      <div className="login-form-title">Log In</div>
      <form onSubmit={handleSubmit} className="login-form">
        <CustomTextInput
          id="username"
          label="EMAIL"
          value={username}
          valid={!usernameErrorText}
          validationText={usernameErrorText}
          onChange={(e) => setUsername(e.target.value)}
        />

        <CustomTextInput
          id="password"
          label="PASSWORD"
          type="password"
          value={password}
          valid={!passwordErrorText}
          validationText={passwordErrorText}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" text="LOG IN" loading={loginStatus === "loading" ? true : false} />
        <div className="login-error-text-container">{loginError}</div>
      </form>
    </>
  );
};

export default LoginForm;
