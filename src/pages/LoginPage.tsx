import "./loginPage.scss";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";
import { Tabs, TabNavBar, TabNav, TabContent } from "../components/Tabs/Tabs";

const LoginPage = () => {
  return (
    <div className="page-container">
      <div className="login-page-title">Welcome to Esquire</div>
      <div className="login-form-container">
        <Tabs className="login-tabs">
          <TabNavBar>
            <TabNav index={0} label="Log In" />
            <TabNav index={1} label="Register" />
          </TabNavBar>
          <TabContent index={0}>
            <LoginForm />
          </TabContent>
          <TabContent index={1}>
            <RegisterForm />
          </TabContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
