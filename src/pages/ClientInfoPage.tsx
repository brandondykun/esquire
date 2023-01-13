import useClient from "../hooks/useClient";
import { useNavigate, useParams } from "react-router-dom";
import useContactInfo from "../hooks/useContactInfo";
import Button from "../components/Button";

type Param = {
  clientId: string;
};

const ClientInfoPage = () => {
  let { clientId } = useParams<Param>();

  const navigate = useNavigate();

  const id: number = Number(clientId);

  const {
    addressLoading,
    nameLoading,
    clientName,
    address,
    nameError,
    addressError,
  } = useClient({ id });

  const { contactLoading, contactInfo, contactError } = useContactInfo({ id });

  return (
    <div className="page-container">
      <div className="client-info-page">
        <div className="client-info-name-container">
          <h2>Name</h2>
          {nameLoading ? (
            <div>Loading Name...</div>
          ) : (
            <div className="name-container">
              <div>{clientName?.firstName}</div>
              <div>{clientName?.middleName}</div>
              <div>{clientName?.lastName}</div>
            </div>
          )}
          {nameError && <div>{nameError}</div>}
        </div>
        <div className="client-info-address-container">
          <h2>Address</h2>
          {addressLoading ? (
            <div>Loading Address...</div>
          ) : (
            <div className="address-container">
              <div>{address?.street},</div>
              <div>{address?.city},</div>
              <div>{address?.state},</div>
              <div>{address?.zip}</div>
            </div>
          )}
          {addressError && <div>{addressError}</div>}
        </div>

        <div className="client-info-contact-container">
          <h2>Contact Info</h2>
          {contactLoading ? (
            <div>Loading Contact Info...</div>
          ) : (
            <div className="contact-info-container">
              <div>Phone</div>
              <div>{contactInfo?.phone}</div>
              <div>Email</div>
              <div>{contactInfo?.email}</div>
            </div>
          )}
          {contactError && <div>{contactError}</div>}
        </div>
      </div>
      <Button
        type="button"
        text="ADD CASE"
        onClick={() => navigate(`/add-case/${id}`)}
      />
    </div>
  );
};

export default ClientInfoPage;
