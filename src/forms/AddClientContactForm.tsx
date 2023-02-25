import { useState, useRef, useEffect } from "react";
import { addContactInfo } from "../api/apiCalls";
import CustomTextInput from "../components/CustomTextInput";
import Button from "../components/Button";

type AddClientContactFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  clientId: number;
};

const AddClientContactForm = ({ setStep, clientId }: AddClientContactFormProps) => {
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);
  const [phoneValidationText, setPhoneValidationText] = useState("");

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailValidationText, setEmailValidationText] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const clearInputs = () => {
    setPhone("");
    setPhoneValidationText("");
    setPhoneValid(true);
    setEmail("");
    setEmailValidationText("");
    setEmailValid(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitLoading(true);

    setPhoneValid(true);
    setEmailValid(true);

    let preventSubmit = false;
    if (!phone) {
      setPhoneValid(false);
      setPhoneValidationText("Please Enter a Phone Number");
      preventSubmit = true;
    }

    if (!email) {
      setEmailValid(false);
      setEmailValidationText("Please Enter an Email");
      preventSubmit = true;
    }

    if (preventSubmit) {
      setSubmitLoading(false);
      return;
    }

    const newContactInfo = {
      clientId: clientId,
      phone: phone,
      email: email,
    };

    addContactInfo(newContactInfo)
      .then((res) => {
        if (res.status === 201) {
          clearInputs();
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
    // <div className="add-client-form-container">
    <form onSubmit={handleSubmit} className="add-client-form">
      <CustomTextInput
        id="phone"
        label="PHONE NUMBER"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        valid={phoneValid}
        validationText={phoneValidationText}
        ref={inputRef}
      />

      <CustomTextInput
        id="email"
        label="EMAIL"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        valid={emailValid}
        validationText={emailValidationText}
      />

      <Button
        type="submit"
        text="ADD CONTACT INFO"
        // width="100%"
        disabled={submitLoading}
        loading={submitLoading}
      />
    </form>
    // </div>
  );
};

export default AddClientContactForm;
