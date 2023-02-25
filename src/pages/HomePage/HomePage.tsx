import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="page-container">
      <div className="homepage-container">
        <div className="homepage-options-list">
          <h1 className="homepage-title">HOME</h1>
          <Link to="/client-list" className="homepage-link">
            client list
          </Link>
          <Link to="/calendar" className="homepage-link">
            calendar
          </Link>
          <Link to="/notes" className="homepage-link">
            general notes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
