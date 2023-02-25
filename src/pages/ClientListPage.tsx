import "./clientListPage.scss";
import { Link, useNavigate } from "react-router-dom";
import useClients from "../hooks/useClients";
import { Client } from "../types";
import CaseListSideBar from "../components/CaseListSidebar";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import AddClientModal from "../modals/addClientModal/AddClientModal";
import { useSelector, useDispatch } from "react-redux";
import { getClients, getClientsStatus, getClientsError } from "../reducers/clientsSlice";
import { AppDispatch } from "../store/store";
import { fetchClientsById } from "../reducers/clientsSlice";
import { getCurrentUser } from "../reducers/authSlice";

type ClientNameType = {
  first: string;
  last: string;
};

const ClientListPage = () => {
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // const {} = useClients(showAddClientModal);

  const currentUser = useSelector(getCurrentUser);

  const clients = useSelector(getClients);
  const error = useSelector(getClientsError);
  const status = useSelector(getClientsStatus);

  useEffect(() => {
    if (currentUser.id) {
      dispatch(fetchClientsById(currentUser.id));
    }
  }, []);

  const [filteredClients, setFilteredClients] = useState<Client[] | undefined>([]);
  const [inputValue, setInputValue] = useState("");

  const [activeClient, setActiveClient] = useState<number | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value !== "") {
      const filtered = clients?.filter((c) => {
        return (
          c.firstName.toLowerCase().includes(value.toLowerCase()) ||
          c.lastName.toLowerCase().includes(value.toLowerCase())
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
        <div className="client-list-container" onClick={() => setActiveClient(undefined)}>
          <div className="add-client-button-container">
            <button type="button" className="add-client-button" onClick={() => setShowAddClientModal(true)}>
              ADD CLIENT
            </button>
          </div>
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
              className={`name-input-clear-button ${inputValue !== "" ? "show" : ""}`}
            >
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          </div>
          <div className="client-list-list">
            <div className="client-list-header">
              <div>Name</div>
              <div>Cases</div>
              <div>Details</div>
            </div>
            {status === "loading" ? (
              <div>Loading list....</div>
            ) : inputValue === "" ? (
              clients?.map((client: Client) => {
                return (
                  <div
                    className={`client-list-item ${activeClient === client.id ? "active-client" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveClient(client.id);
                    }}
                    key={client.id}
                  >
                    <div>
                      {client.lastName}, {client.firstName}
                    </div>
                    <div>{client.caseCount}</div>
                    <div className="client-details-link">
                      <Link className="details-link" to={`/client/${client.id}`}>
                        view details
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : filteredClients && filteredClients.length > 0 ? (
              filteredClients?.map((client: Client) => {
                return (
                  <div
                    className={`client-list-item ${activeClient === client.id ? "active-client" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveClient(client.id);
                    }}
                    key={client.id}
                  >
                    <div>
                      {client.lastName}, {client.firstName}
                    </div>
                    <div>{client.caseCount}</div>
                    <div className="client-details-link">
                      <Link className="details-link" to={`/client/${client.id}`}>
                        view details
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="client-list-no-matches-text">No Matches</div>
            )}
          </div>
          {error && <div>{error}</div>}
        </div>

        <CaseListSideBar id={activeClient} />
        <AddClientModal show={showAddClientModal} setShow={setShowAddClientModal} />
      </div>
    </div>
  );
};

export default ClientListPage;
