import "./navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faListUl, faRightFromBracket, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { BsFillCalendarFill } from "react-icons/bs";
import { useAuthContext } from "../../context/AuthContext";
import { logOut } from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, logOutUser, getLogOutStatus, resetAuthState } from "../../reducers/authSlice";
import { AppDispatch } from "../../store/store";
import { useEffect } from "react";

const Navbar = () => {
  // const { currentUser, setCurrentUser } = useAuthContext();

  const currentUser = useSelector(getCurrentUser);
  const logOutStatus = useSelector(getLogOutStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logOutUser());
    // logOut().then((res) => {
    //   if (res.status === 200) {
    //     // setCurrentUser(null);
    //   }
    // });
  };

  // useEffect(() => {
  //   if (logOutStatus === "succeeded") {
  //     console.log("SHOULD BE RESETTING THE STATE");
  //     dispatch(resetAuthState());
  //     navigate("/login");
  //   }
  // }, [logOutStatus]);

  let activeStyle = {
    textDecoration: "underline",
    color: "rgb(103, 73, 73)",
    textUnderlineOffset: "4px",
  };

  return (
    <div className="primary-nav">
      <div className="navbar-welcome-text">
        {currentUser?.email} ID: {currentUser?.id}
      </div>
      <div className="navbar-links-container">
        <NavLink className="navbar-link" to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <span className="nav-text">HOME</span>
          <FontAwesomeIcon icon={faHouse} className="nav-icon" />
        </NavLink>
        <NavLink
          className="navbar-link"
          to="/client-list"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <span className="nav-text">CLIENT LIST</span>
          <FontAwesomeIcon icon={faListUl} className="nav-icon" />
        </NavLink>

        <NavLink className="navbar-link" to="/calendar" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <span className="nav-text">CALENDAR</span>
          <BsFillCalendarFill className="nav-icon" />
        </NavLink>

        <NavLink className="navbar-link" to="/notes" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
          <span className="nav-text">NOTES</span>
          <CgNotes className="nav-icon" />
        </NavLink>

        <button className="sign-out-button" onClick={handleLogOut}>
          {/* <span>sign out</span> */}
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
