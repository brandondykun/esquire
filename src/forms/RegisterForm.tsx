import { useState } from "react";
import Button from "../components/Button";
import CustomTextInput from "../components/CustomTextInput";
import { registerUser } from "../api/apiCalls";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameErrorText, setUsernameErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState("");

  const [loginErrorText, setLoginErrorText] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);

  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUsernameErrorText("");
    setPasswordErrorText("");
    setConfirmPasswordErrorText("");
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

    if (!confirmPassword) {
      setConfirmPasswordErrorText("Please enter a confirmation password.");
      error = true;
    }

    if (error) {
      console.log("ERROR");
      setLoginErrorText("Please complete all fields.");
      return;
    } else if (password !== confirmPassword) {
      setLoginErrorText("Passwords do not match.");
      return;
    }

    const newUserData = { email: username, password };
    setRegisterLoading(true);
    registerUser(newUserData)
      .then((res) => {
        console.log("REGISTER RES: ", res);
        if (res.status === 201) {
          const dbUser = res.data;
          console.log("DB USER: ", dbUser);
          setCurrentUser({ id: dbUser.id, username: dbUser.username });
          navigate("/");
          return;
        } else if (res.status >= 400) {
          console.log("ERROR RES: ", res);
          setLoginErrorText(res.data.error);
        }
      })
      .catch((err) => {
        console.error("LOGIN ERR: ", err.message);
        setLoginErrorText("There was an issue registering your account.");
      })
      .finally(() => setRegisterLoading(false));
  };
  return (
    <>
      <div className="login-form-title">Register</div>
      <form onSubmit={handleSubmit} className="login-form">
        <CustomTextInput
          id="register-username"
          label="EMAIL"
          value={username}
          valid={!usernameErrorText}
          validationText={usernameErrorText}
          onChange={(e) => setUsername(e.target.value)}
        />

        <CustomTextInput
          id="register-password"
          label="PASSWORD"
          type="password"
          value={password}
          valid={!passwordErrorText}
          validationText={passwordErrorText}
          onChange={(e) => setPassword(e.target.value)}
        />

        <CustomTextInput
          id="confirm-password"
          label="CONFIRM PASSWORD"
          type="password"
          value={confirmPassword}
          valid={!confirmPasswordErrorText}
          validationText={confirmPasswordErrorText}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" text="REGISTER" loading={registerLoading} />
        <div className="login-error-text-container">{loginErrorText}</div>
      </form>
    </>
  );
};

export default RegisterForm;
