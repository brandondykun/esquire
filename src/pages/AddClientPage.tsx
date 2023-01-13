import { useState } from "react";
import AddClientNameForm from "../components/AddClientNameForm";
import AddClientAddressForm from "../components/AddClientAddressForm";
import AddClientContactForm from "../components/AddClientContactForm";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";

const AddClientPage = () => {
  const [clientId, setClientId] = useState<number>(-1);
  const [step, setStep] = useState<number>(0);

  const navigate = useNavigate();

  const handleClientListClick = () => {
    navigate("/client-list");
  };

  const handleClientClick = () => {
    navigate(`/client/${clientId}`);
  };

  return (
    <div className="page-container">
      <h1 className="add-client-page-title">ADD CLIENT</h1>
      <ProgressBar step={step} />
      {step === 0 && (
        <AddClientNameForm setStep={setStep} setClientId={setClientId} />
      )}
      {step === 1 && (
        <AddClientAddressForm setStep={setStep} clientId={clientId} />
      )}
      {step === 2 && (
        <AddClientContactForm setStep={setStep} clientId={clientId} />
      )}
      {step === 3 && (
        <>
          <div className="add-client-success-container">
            <div className="add-client-success-title">
              Client has been successfully created!
            </div>
          </div>

          <div className="add-client-success-button-container">
            <button
              className="add-client-form-button"
              onClick={handleClientClick}
            >
              VIEW CLIENT
            </button>
            <button
              className="add-client-form-button"
              onClick={handleClientListClick}
            >
              CLIENT LIST
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddClientPage;
