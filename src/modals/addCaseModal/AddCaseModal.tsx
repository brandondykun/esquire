import { useEffect, useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import PulseLoader from "react-spinners/PulseLoader";
import { useParams } from "react-router-dom";
import { addCase } from "../../api/apiCalls";
import useClient from "../../hooks/useClient";
import Button from "../../components/Button/Button";
import CustomModal from "../customModal/CustomModal";
import { Case } from "../../types";
import camelcaseKeys from "camelcase-keys";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCases: React.Dispatch<React.SetStateAction<Case[] | null>>;
  cases: Case[] | null;
};

const AddCaseModal = ({ show, setShow, setCases, cases }: Props) => {
  const { clientId } = useParams();

  const { nameLoading, clientName, nameError } = useClient(Number(clientId));

  const [caseName, setCaseName] = useState("");
  const [caseNameValid, setCaseNameValid] = useState(true);
  const [caseNameValidationText, setCaseNameValidationText] = useState("");

  const [caseNumber, setCaseNumber] = useState("");
  const [caseNumberValid, setCaseNumberValid] = useState(true);
  const [caseNumberValidationText, setCaseNumberValidationText] = useState("");

  const [caseType, setCaseType] = useState("");
  const [caseTypeValid, setCaseTypeValid] = useState(true);
  const [caseTypeValidationText, setCaseTypeValidationText] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  const [caseAddComplete, setCaseAddComplete] = useState(false);

  const clearInputs = () => {
    setCaseName("");
    setCaseNameValidationText("");
    setCaseNameValid(true);

    setCaseNumber("");
    setCaseNumberValidationText("");
    setCaseNumberValid(true);

    setCaseType("");
    setCaseTypeValidationText("");
    setCaseTypeValid(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitLoading(true);

    setCaseNameValid(true);
    setCaseNumberValid(true);
    setCaseTypeValid(true);

    let preventSubmit = false;
    if (!caseName) {
      setCaseNameValid(false);
      setCaseNameValidationText("Please Enter a Case Name");
      preventSubmit = true;
    }
    if (!caseNumber) {
      setCaseNumberValid(false);
      setCaseNumberValidationText("Please Enter a Case Number");
      preventSubmit = true;
    }
    if (!caseType) {
      setCaseTypeValid(false);
      setCaseTypeValidationText("Please Enter a Case Type");
      preventSubmit = true;
    }

    if (preventSubmit) {
      setSubmitLoading(false);
      return;
    }

    const newCaseInfo = {
      clientId: Number(clientId),
      name: caseName,
      caseNumber: caseNumber,
      type: caseType,
    };

    addCase(newCaseInfo)
      .then((res) => {
        if (res.status === 201 && cases) {
          console.log("ADD CASE RES: ", res);
          const formatted = camelcaseKeys(res.data);
          setCases([...cases, formatted]);
          clearInputs();
          setSubmitLoading(false);
          setCaseAddComplete(true);
          setShow(false);
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
        setSubmitLoading(false);
      });
  };

  const handleModalClose = () => {
    setShow(false);
    clearInputs();
  };

  return (
    <CustomModal title="ADD CASE" show={show} onClose={handleModalClose}>
      <div className="add-activity-modal-inner">
        <form className="add-case-form" onSubmit={handleSubmit}>
          <CustomTextInput
            id="case-name"
            label="NAME"
            value={caseName}
            onChange={(e) => setCaseName(e.target.value)}
            valid={caseNameValid}
            validationText={caseNameValidationText}
          />

          <CustomTextInput
            id="case-number"
            label="NUMBER"
            value={caseNumber}
            onChange={(e) => setCaseNumber(e.target.value)}
            valid={caseNumberValid}
            validationText={caseNumberValidationText}
          />

          <CustomTextInput
            id="case-type"
            label="TYPE"
            value={caseType}
            onChange={(e) => setCaseType(e.target.value)}
            valid={caseTypeValid}
            validationText={caseTypeValidationText}
          />
          <Button
            type="submit"
            // className="add-client-form-button"
            loading={submitLoading}
            text="ADD CASE"
          />
        </form>
      </div>
    </CustomModal>
  );
};

export default AddCaseModal;
