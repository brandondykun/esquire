import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faListUl,
  faRightFromBracket,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { BsFillCalendarFill } from "react-icons/bs";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useAuthContext();

  const navigate = useNavigate();

  const handleLogOut = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div className="primary-nav">
      <div className="navbar-welcome-text">
        Welcome, {currentUser?.username} esquire. ID: {currentUser?.id}
      </div>
      <div className="navbar-links-container">
        <Link className="navbar-link" to="/">
          {/* <span>Home</span> */}
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link className="navbar-link" to="/client-list">
          {/* <span>Client List</span> */}
          <FontAwesomeIcon icon={faListUl} />
        </Link>

        <Link className="navbar-link" to="/calendar">
          {/* <span>Calendar</span> */}
          <BsFillCalendarFill />
        </Link>

        <Link className="navbar-link" to="/notes">
          {/* <span>Notes</span> */}
          <CgNotes />
        </Link>

        <button className="sign-out-button" onClick={handleLogOut}>
          {/* <span>sign out</span> */}
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
