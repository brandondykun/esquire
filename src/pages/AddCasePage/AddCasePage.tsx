import "./addCasePage.scss";
import "../AddClientPage/addClientPage.scss";
import { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput/CustomTextInput";
import PulseLoader from "react-spinners/PulseLoader";
import { useParams } from "react-router-dom";
import { addCase } from "../../api/apiCalls";
import useClient from "../../hooks/useClient";
import Button from "../../components/Button/Button";

const AddCasePage = () => {
  const { clientId } = useParams();

  const { nameLoading, clientName, nameError } = useClient(clientId);

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
        if (res.status === 201) {
          clearInputs();
          setSubmitLoading(false);
          setCaseAddComplete(true);
        }
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
        setSubmitLoading(false);
      });
  };

  return (
    <div className="page-container">
      <h1 className="add-case-page-title">ADD CASE</h1>
      <div className="add-case-name-container">
        {nameLoading ? (
          <div>Loading client name...</div>
        ) : (
          <div>
            {clientName?.lastName}, {clientName?.firstName}
          </div>
        )}
      </div>
      <div className="add-case-container">
        {!caseAddComplete ? (
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
              width="100%"
            />
          </form>
        ) : (
          <div className="case-add-complete-container">
            <h2>Case Added Successfully!</h2>
            <div style={{ display: "flex", gap: "2rem" }}>
              <Button text="VIEW CASE" type="button" />
              <Button text="ADD ANOTHER" type="button" onClick={() => setCaseAddComplete(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCasePage;
