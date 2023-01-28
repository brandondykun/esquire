import { useState, useRef, useEffect } from "react";
import { addAddress } from "../api/apiCalls";
import CustomTextInput from "./CustomTextInput";
import Button from "./Button";

type AddClientAddressFormProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  clientId: number;
};
const AddClientAddressForm = ({
  setStep,
  clientId,
}: AddClientAddressFormProps) => {
  const [street, setStreet] = useState("");
  const [streetValid, setStreetValid] = useState(true);
  const [streetValidationText, setStreetValidationText] = useState("");

  const [city, setCity] = useState("");
  const [cityValid, setCityValid] = useState(true);
  const [cityValidationText, setCityValidationText] = useState("");

  const [state, setState] = useState("");
  const [stateValid, setStateValid] = useState(true);
  const [stateValidationText, setStateValidationText] = useState("");

  const [zip, setZip] = useState("");
  const [zipValid, setZipValid] = useState(true);
  const [zipValidationText, setZipValidationText] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const clearInputs = () => {
    setStreet("");
    setStreetValidationText("");
    setStreetValid(true);
    setCity("");
    setCityValidationText("");
    setCityValid(true);
    setState("");
    setStateValidationText("");
    setStateValid(true);
    setZip("");
    setZipValidationText("");
    setZipValid(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitLoading(true);

    setStreetValid(true);
    setCityValid(true);
    setStateValid(true);
    setZipValid(true);

    let preventSubmit = false;
    if (!state) {
      setStreetValid(false);
      setStreetValidationText("Please Enter a State");
      preventSubmit = true;
    }

    if (!city) {
      setCityValid(false);
      setCityValidationText("Please Enter a City");
      preventSubmit = true;
    }

    if (!state) {
      setStateValid(false);
      setStateValidationText("Please Enter a Last State");
      preventSubmit = true;
    }

    if (!zip) {
      setZipValid(false);
      setZipValidationText("Please Enter a Last State");
      preventSubmit = true;
    }

    if (preventSubmit) {
      setSubmitLoading(false);
      return;
    }

    const newAddress = {
      clientId: clientId,
      street: street,
      city: city,
      state: state,
      zip: zip,
    };

    addAddress(newAddress)
      .then((res) => {
        if (res.status === 201) {
          clearInputs();
          setStep((step) => step + 1);
        }
        setSubmitLoading(false);
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
          id="street"
          label="STREET"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          valid={streetValid}
          validationText={streetValidationText}
          ref={inputRef}
        />

        <CustomTextInput
          id="city"
          label="CITY"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          valid={cityValid}
          validationText={cityValidationText}
        />

        <CustomTextInput
          id="state"
          label="STATE"
          value={state}
          onChange={(e) => setState(e.target.value)}
          valid={stateValid}
          validationText={stateValidationText}
        />

        <CustomTextInput
          id="zip"
          label="ZIP CODE"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          valid={zipValid}
          validationText={zipValidationText}
        />

        <Button
          type="submit"
          text="ADD ADDRESS"
          width="100%"
          disabled={submitLoading}
          loading={submitLoading}
        />
      </form>
    </div>
  );
};

export default AddClientAddressForm;
