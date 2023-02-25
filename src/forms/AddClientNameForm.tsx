import { useEffect, useRef, useState } from "react";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { getCurrentUser } from "../reducers/authSlice";
import {
  getClientNameEditStatus,
  editClientName,
  getClientNameEditError,
  resetClientNameEditStatus,
} from "../reducers/clientSlice";
import {
  getCreateNewClientStatus,
  getCreateNewClientError,
  getNewClientId,
  createNewClient,
  resetAddClientStatus,
} from "../reducers/clientsSlice";

type AddClientNameFormProps = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
  setClientId?: React.Dispatch<React.SetStateAction<number>>;
  clientId?: number;
  firstNameEdit?: string;
  middleNameEdit?: string;
  lastNameEdit?: string;
  edit?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddClientNameForm = ({
  setStep,
  setClientId,
  clientId,
  firstNameEdit,
  middleNameEdit,
  lastNameEdit,
  edit,
  setShow,
}: AddClientNameFormProps) => {
  // FORM STATE
  const [firstName, setFirstName] = useState(firstNameEdit ? firstNameEdit : "");
  const [firstNameValidationText, setFirstNameValidationText] = useState("");
  const [middleName, setMiddleName] = useState(middleNameEdit ? middleNameEdit : "");
  const [middleNameValidationText, setMiddleNameValidationText] = useState("");
  const [lastName, setLastName] = useState(lastNameEdit ? lastNameEdit : "");
  const [lastNameValidationText, setLastNameValidationText] = useState("");
  // Edit client state
  const clientNameEditStatus = useSelector(getClientNameEditStatus);
  const clientNameEditError = useSelector(getClientNameEditError);
  // New client state
  const newClientNameStatus = useSelector(getCreateNewClientStatus);
  const newClientNameError = useSelector(getCreateNewClientError);
  // New client id if this is not a client being edited
  const newClientId = useSelector(getNewClientId);
  // current logged in user
  const currentUser = useSelector(getCurrentUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Helper for resetting the inputs
  const clearInputs = () => {
    setFirstName("");
    setFirstNameValidationText("");
    setMiddleName("");
    setMiddleNameValidationText("");
    setLastName("");
    setLastNameValidationText("");
  };

  // Focus first input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Run when edit status changes
  useEffect(() => {
    if (clientNameEditStatus === "succeeded") {
      clearInputs();
      setShow && setShow(false);
      dispatch(resetClientNameEditStatus());
    }
  }, [clientNameEditStatus]);

  // Run when create new client status changes
  useEffect(() => {
    if (newClientNameStatus === "succeeded") {
      clearInputs();
      newClientId && setClientId && setClientId(newClientId);
      newClientId && setStep && setStep((step) => step + 1);
      dispatch(resetAddClientStatus());
    }
  }, [newClientNameStatus]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentUser) {
      setFirstNameValidationText("");
      setMiddleNameValidationText("");
      setLastNameValidationText("");

      let preventSubmit = false;
      if (!firstName || !middleName || !lastName) {
        preventSubmit = true;
      }

      if (!firstName) {
        setFirstNameValidationText("Please Enter a First Name");
      }

      if (!middleName) {
        setMiddleNameValidationText("Please Enter a Middle Name");
      }

      if (!lastName) {
        setLastNameValidationText("Please Enter a Last Name");
      }

      if (preventSubmit) {
        return;
      }

      const newClient = {
        user: currentUser?.id,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
      };

      // CAN REMOVE SOME OF THESE IN THE IF STATEMENTS
      if (!edit && setClientId && setStep) {
        // STILL NEED TO HANDLE SETTING ERROR STATUS FOR THIS
        dispatch(createNewClient(newClient));
      } else if (clientId && setShow) {
        // STILL NEED TO HANDLE SETTING ERROR STATUS FOR THIS
        dispatch(editClientName({ id: clientId, ...newClient }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-client-form">
      <CustomTextInput
        id="first-name"
        label="FIRST NAME"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        valid={firstNameValidationText ? false : true}
        validationText={firstNameValidationText}
        ref={inputRef}
      />

      <CustomTextInput
        id="middle-name"
        label="MIDDLE NAME"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
        valid={middleNameValidationText ? false : true}
        validationText={middleNameValidationText}
      />

      <CustomTextInput
        id="last-name"
        label="LAST NAME"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        valid={lastNameValidationText ? false : true}
        validationText={lastNameValidationText}
      />
      <Button
        type="submit"
        text="SUBMIT"
        disabled={clientNameEditStatus === "loading" || newClientNameStatus === "loading"}
        loading={clientNameEditStatus === "loading" || newClientNameStatus === "loading"}
      />
    </form>
  );
};

export default AddClientNameForm;
