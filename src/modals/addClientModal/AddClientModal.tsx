import { useState } from "react";
import AddClientNameForm from "../../forms/AddClientNameForm";
import AddClientAddressForm from "../../forms/AddClientAddressForm";
import AddClientContactForm from "../../forms/AddClientContactForm";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import CustomModal from "../customModal/CustomModal";
import "./addClientModal.scss";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddClientModal = ({ show, setShow }: Props) => {
  const [clientId, setClientId] = useState<number>(-1);
  const [step, setStep] = useState<number>(0);

  const handleClose = () => {
    setShow(false);
    setStep(0);
  };

  const onClose = () => {
    setShow(false);
    setStep(0);
  };

  return (
    <CustomModal show={show} title="ADD CLIENT" onClose={onClose}>
      <div className="add-client-modal-inner">
        <ProgressBar step={step} />
        {step === 0 && <AddClientNameForm setStep={setStep} setClientId={setClientId} />}
        {step === 1 && <AddClientAddressForm setStep={setStep} clientId={clientId} />}
        {step === 2 && <AddClientContactForm setStep={setStep} clientId={clientId} />}
        {step === 3 && (
          <>
            <div className="add-client-success-container">
              <div className="add-client-success-title">Client has been successfully created!</div>
            </div>

            <div className="add-client-success-button-container">
              <button className="add-client-form-button" onClick={handleClose}>
                CLOSE
              </button>
            </div>
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default AddClientModal;
