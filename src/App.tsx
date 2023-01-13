import "./App.css";
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

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/client-list" element={<ClientListPage />} />
        <Route path="/client/:clientId" element={<ClientInfoPage />} />
        <Route path="/add-client" element={<AddClientPage />} />
        <Route path="/add-case/:clientId" element={<AddCasePage />} />
        <Route path="/case/:clientId/:caseId" element={<CaseDetailsPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </div>
  );
};

export default App;
