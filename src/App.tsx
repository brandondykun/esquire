import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import AuthRoute from "./routes/AuthRoute";
import ClientListPage from "./pages/ClientListPage";
import HomePage from "./pages/HomePage";
import ClientInfoPage from "./pages/ClientInfoPage";
import AddClientPage from "./pages/AddClientPage";
import AddCasePage from "./pages/AddCasePage";
import CaseDetailsPage from "./pages/CaseDetailsPage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import ActivityPage from "./pages/ActivityPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store/store";
import { getLoginStatus, getCurrentUser, confirmLogin } from "./reducers/authSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loginStatus = useSelector(getLoginStatus);
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    dispatch(confirmLogin());
  }, []);

  return (
    <div className="App">
      {loginStatus === "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          {currentUser?.id && <Navbar />}
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* prettier-ignore */}
            <Route path="/" element={<AuthRoute><HomePage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/client-list" element={<AuthRoute><ClientListPage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/client/:clientId" element={<AuthRoute><ClientInfoPage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/add-client" element={<AuthRoute><AddClientPage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/add-case/:clientId" element={<AuthRoute><AddCasePage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/case/:clientId/:caseId" element={<AuthRoute><CaseDetailsPage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/calendar" element={<AuthRoute><CalendarPage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/notes" element={<AuthRoute><NotesPage /></AuthRoute>}/>
            {/* prettier-ignore */}
            <Route path="/activities/:clientId" element={<AuthRoute><ActivityPage /></AuthRoute>}/>
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
