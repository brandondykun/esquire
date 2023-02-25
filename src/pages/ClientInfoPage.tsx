import "./clientInfoPage.scss";
import useClient from "../hooks/useClient";
import { useParams } from "react-router-dom";
import useContactInfo from "../hooks/useContactInfo";
import Button from "../components/Button/Button";
// import { Link } from "react-router-dom";
// import ActivityFilter from "../components/ActivityFilter";
import ActivityList from "../components/ActivityList/ActivityList";
// import CaseListSideBar from "../components/CaseListSidebar";
import useCases from "../hooks/useCases";
import CaseList from "../components/CaseList";
import AddCaseModal from "../modals/addCaseModal/AddCaseModal";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import EditClientNameModal from "../modals/editClientNameModal/EditClientNameModal";
import useClientAddress from "../hooks/useClientAddress";
import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../reducers/clientsSlice";
import { getActiveClient, setActiveClient } from "../reducers/clientSlice";

type Param = {
  clientId: string;
};

const ClientInfoPage = () => {
  let { clientId } = useParams<Param>();

  const dispatch = useDispatch();

  const clients = useSelector(getClients);
  const client = clients.find((client) => client.id === Number(clientId));
  const activeClient = useSelector(getActiveClient);

  useEffect(() => {
    dispatch(setActiveClient(client));
  }, [clientId]);

  const [showAddCaseModal, setShowAddCaseModal] = useState(false);
  const [showContactEditModal, setShowContactEditModal] = useState(false);
  const [showNameEditModal, setShowNameEditModal] = useState(false);
  const [showAddressEditModal, setShowAddressEditModal] = useState(false);

  const id: number = Number(clientId);

  const { loading, cases, setCases, error } = useCases(clientId);

  const { nameLoading, clientName, nameError } = useClient(id, showNameEditModal);

  const { addressLoading, address, addressError } = useClientAddress(clientId, showAddressEditModal);

  const { contactLoading, contactInfo, contactError } = useContactInfo(id, showContactEditModal);

  const handleAddressEdit = () => {
    console.log("HANDLE ADDRESS EDIT");
  };

  const handleNameEdit = () => {
    setShowNameEditModal(true);
  };

  const handleContactEdit = () => {
    console.log("HANDLE CONTACT EDIT");
  };

  return (
    <div className="page-container client-info-page">
      <div className="client-info-page-col-1">
        <div className="client-info-name-container">
          {activeClient === null ? (
            <div>Loading Name...</div>
          ) : (
            <div className="name-container">
              <div>{activeClient?.firstName}</div>
              <div>{activeClient?.middleName}</div>
              <div>{activeClient?.lastName}</div>
              <button onClick={handleNameEdit} className="client-info-edit-button">
                <AiOutlineEdit />
              </button>
            </div>
          )}
          {nameError && <div>{nameError}</div>}
        </div>
        <div className="client-info-contact-container">
          {contactLoading ? (
            <div>Loading Contact Info...</div>
          ) : (
            <div className="contact-info-container">
              <button onClick={handleContactEdit}>
                <AiOutlineEdit />
              </button>
              <div className="contact-info-label">Phone</div>
              <div className="contact-info-text">{contactInfo?.phone}</div>
              <div className="contact-info-label">Email</div>
              <div className="contact-info-text">{contactInfo?.email}</div>
            </div>
          )}
          {contactError && <div>{contactError}</div>}
        </div>
        <div className="client-info-address-container">
          <div className="contact-info-label">Address</div>
          {addressLoading ? (
            <div>Loading Address...</div>
          ) : (
            <div className="address-container">
              <div>
                {address?.street}, {address?.city}, {address?.state},{address?.zip}
                <button onClick={handleAddressEdit}>
                  <AiOutlineEdit />
                </button>
              </div>
            </div>
          )}
          {addressError && <div>{addressError}</div>}
        </div>
        <Button
          type="button"
          text="EDIT INFO"
          width="95%"
          margin="1rem auto 0 auto"
          onClick={() => console.log("CLICKED")}
        />
      </div>
      <div className="client-info-page-col-2">
        <ActivityList setShowAddCaseModal={setShowAddCaseModal} />
      </div>
      <div className="client-info-page-col-3">
        <CaseList cases={cases} classNamePrefix="client-info" />
      </div>
      <AddCaseModal show={showAddCaseModal} setShow={setShowAddCaseModal} setCases={setCases} cases={cases} />
      <EditClientNameModal
        show={showNameEditModal}
        setShow={setShowNameEditModal}
        firstName={clientName?.firstName}
        middleName={clientName?.middleName}
        lastName={clientName?.lastName}
      />
    </div>
  );
};

export default ClientInfoPage;
