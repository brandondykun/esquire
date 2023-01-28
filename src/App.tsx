import "./App.scss";
import ClientListPage from "./pages/ClientListPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClientInfoPage from "./pages/ClientInfoPage";
import Navbar from "./components/Navbar";
import AddClientPage from "./pages/AddClientPage";
import AddCasePage from "./pages/AddCasePage";
import CaseDetailsPage from "./pages/CaseDetailsPage";
import CalendarPage from "./pages/CalendarPage";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import ActivityPage from "./pages/ActivityPage";
import AuthRoute from "./routes/AuthRoute";
import RegisterPage from "./pages/RegisterPage";
import { whoAmI } from "./api/apiCalls";
import { useEffect, useState } from "react";
import { useAuthContext } from "./context/AuthContext";

const App = () => {
  const [authLoading, setAuthLoading] = useState(true);
  const { currentUser, setCurrentUser } = useAuthContext();

  useEffect(() => {
    console.log("SENDING WHO AM I");
    whoAmI()
      .then((res) => {
        console.log("WHO AM I RESPONSE: ", res);
        if (res.status === 200) {
          setCurrentUser(res.data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => setAuthLoading(false));
  }, []);

  return (
    <div className="App">
      {authLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

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

            {/* <Route path="/client/:clientId" element={<ClientInfoPage />} /> */}
            {/* <Route path="/add-client" element={<AddClientPage />} /> */}
            {/* <Route path="/add-case/:clientId" element={<AddCasePage />} /> */}
            {/* <Route path="/case/:clientId/:caseId" element={<CaseDetailsPage />} /> */}
            {/* <Route path="/calendar" element={<CalendarPage />} /> */}
            {/* <Route path="/notes" element={<NotesPage />} /> */}
            {/* <Route path="/activities/:clientId" element={<ActivityPage />} /> */}
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
