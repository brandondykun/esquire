import CustomModal from "../customModal/CustomModal";
import AddClientNameForm from "../../forms/AddClientNameForm";
import { useParams } from "react-router-dom";
import "./editClientNameModal.scss";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  firstName: string | undefined;
  middleName: string | undefined;
  lastName: string | undefined;
};
const EditClientNameModal = ({ show, setShow, firstName, middleName, lastName }: Props) => {
  const { clientId } = useParams();

  const handleClose = () => {
    setShow(false);
  };
  return (
    <CustomModal title="EDIT NAME" show={show} onClose={handleClose}>
      <div className="custom-modal-inner">
        <AddClientNameForm
          edit={true}
          firstNameEdit={firstName}
          middleNameEdit={middleName}
          lastNameEdit={lastName}
          clientId={Number(clientId)}
          setShow={setShow}
        />
      </div>
    </CustomModal>
  );
};

export default EditClientNameModal;
