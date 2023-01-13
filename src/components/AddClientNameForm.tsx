import { useEffect, useRef, useState } from "react";
import { addClient } from "../api/apiCalls";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";

type AddClientNameFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setClientId: React.Dispatch<React.SetStateAction<number>>;
};

const AddClientNameForm = ({
  setStep,
  setClientId,
}: AddClientNameFormProps) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [firstNameValidationText, setFirstNameValidationText] = useState("");

  const [middleName, setMiddleName] = useState("");
  const [middleNameValid, setMiddleNameValid] = useState(true);
  const [middleNameValidationText, setMiddleNameValidationText] = useState("");

  const [lastName, setLastName] = useState("");
  const [lastNameValid, setLastNameValid] = useState(true);
  const [lastNameValidationText, setLastNameValidationText] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const clearInputs = () => {
    setFirstName("");
    setFirstNameValidationText("");
    setFirstNameValid(true);
    setMiddleName("");
    setMiddleNameValidationText("");
    setMiddleNameValid(true);
    setLastName("");
    setLastNameValidationText("");
    setLastNameValid(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitLoading(true);

    setFirstNameValid(true);
    setMiddleNameValid(true);
    setLastNameValid(true);

    let preventSubmit = false;
    if (!firstName) {
      setFirstNameValid(false);
      setFirstNameValidationText("Please Enter a First Name");
      preventSubmit = true;
    }

    if (!middleName) {
      setMiddleNameValid(false);
      setMiddleNameValidationText("Please Enter a Middle Name");
      preventSubmit = true;
    }

    if (!lastName) {
      setLastNameValid(false);
      setLastNameValidationText("Please Enter a Last Name");
      preventSubmit = true;
    }

    if (preventSubmit) {
      setSubmitLoading(false);
      return;
    }

    const newClient = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
    };

    addClient(newClient)
      .then((res) => {
        if (res.status === 201) {
          clearInputs();
          setClientId(res.data.id);
          setStep((step) => step + 1);
          setSubmitLoading(false);
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
        setSubmitLoading(false);
      });
  };

  return (
    <div className="add-client-form-container">
      <form onSubmit={handleSubmit} className="add-client-form">
        <CustomTextInput
          id="first-name"
          label="FIRST NAME"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          valid={firstNameValid}
          validationText={firstNameValidationText}
          ref={inputRef}
        />

        <CustomTextInput
          id="middle-name"
          label="MIDDLE NAME"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          valid={middleNameValid}
          validationText={middleNameValidationText}
        />

        <CustomTextInput
          id="last-name"
          label="LAST NAME"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          valid={lastNameValid}
          validationText={lastNameValidationText}
        />
        <Button
          type="submit"
          text="ADD CLIENT"
          width="100%"
          disabled={submitLoading}
          loading={submitLoading}
        />
      </form>
    </div>
  );
};

export default AddClientNameForm;
