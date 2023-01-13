import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faListUl,
  faRightFromBracket,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="primary-nav">
      <div className="navbar-welcome-text">Welcome, Gillian Perez, Esq.</div>
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
          {/* <span>Client List</span> */}
          <FontAwesomeIcon icon={faCalendarDays} />
        </Link>

        <button className="sign-out-button">
          {/* <span>sign out</span> */}
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
