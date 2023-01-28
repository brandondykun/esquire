import "./loginPage.scss";
import { useState } from "react";
import Button from "../components/Button";
import CustomTextInput from "../components/CustomTextInput";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { login } from "../api/apiCalls";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");

  const [loginErrorText, setLoginErrorText] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);

  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

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
    setLoginLoading(true);
    login({ email: username, password })
      .then((res) => {
        if (res.status === 200) {
          setCurrentUser(res.data);
          navigate("/");
          return;
        }
        setLoginErrorText("Invalid credentials.");
      })
      .catch((err) => {
        console.error("LOGIN ERR: ", err.message);
        setLoginErrorText("There was an issue logging you in.");
      })
      .finally(() => setLoginLoading(false));
  };

  return (
    <div className="page-container">
      <div className="login-page-title">LOG IN</div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <CustomTextInput
            id="username"
            label="USERNAME"
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
          <Button type="submit" text="SUBMIT" loading={loginLoading} />
          <div className="login-error-text-container">{loginErrorText}</div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
