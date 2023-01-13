import { Link } from "react-router-dom";
import useClients from "../hooks/useClients";
import { Client } from "../types";
import CaseListSideBar from "../components/CaseListSidebar";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

type ClientNameType = {
  first: string;
  last: string;
};

const ClientListPage = () => {
  const { clients, error, loading } = useClients();

  const navigate = useNavigate();

  const [filteredClients, setFilteredClients] = useState<Client[] | undefined>(
    []
  );
  const [inputValue, setInputValue] = useState("");

  const [activeClient, setActiveClient] = useState<number | undefined>(
    undefined
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value !== "") {
      const filtered = clients?.filter((c) => {
        return (
          c.firstName.toLowerCase().startsWith(value.toLowerCase()) ||
          c.lastName.toLowerCase().startsWith(value.toLowerCase())
        );
      });
      setFilteredClients(filtered);
    }
  };

  const handleClearClick = () => {
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="page-container">
      <div className="client-list-page">
        <div
          className="client-list-container"
          onClick={() => setActiveClient(undefined)}
        >
          <button
            type="button"
            className="add-client-button"
            onClick={() => navigate("/add-client")}
          >
            ADD CLIENT
          </button>
          <h1 className="client-page-title">CLIENT LIST</h1>
          <div className="name-input-button-container">
            <input
              className="client-filter-input"
              type="text"
              onChange={handleInputChange}
              value={inputValue}
              placeholder="filter clients..."
              autoFocus
              ref={inputRef}
            />
            <button
              type="button"
              onClick={handleClearClick}
              className={`name-input-clear-button ${
                inputValue !== "" ? "show" : ""
              }`}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
          <div className="client-list-list">
            {loading ? (
              <div>Loading list....</div>
            ) : inputValue === "" ? (
              clients?.map((client: Client) => {
                return (
                  <div
                    className={`client-list-item ${
                      activeClient === client.id ? "active-client" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveClient(client.id);
                    }}
                    key={client.id}
                  >
                    <div>
                      {client.lastName}, {client.firstName}
                    </div>
                    <Link className="details-link" to={`/client/${client.id}`}>
                      details
                    </Link>
                  </div>
                );
              })
            ) : filteredClients && filteredClients.length > 0 ? (
              filteredClients?.map((client: Client) => {
                return (
                  <div
                    className={`client-list-item ${
                      activeClient === client.id ? "active-client" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveClient(client.id);
                    }}
                    key={client.id}
                  >
                    <div>
                      {client.lastName}, {client.firstName}
                    </div>
                    <Link className="details-link" to={`/client/${client.id}`}>
                      details
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="client-list-no-matches-text">No Matches</div>
            )}
          </div>
          {error && <div>Error: {error}</div>}
        </div>

        <CaseListSideBar id={activeClient} />
      </div>
    </div>
  );
};

export default ClientListPage;
