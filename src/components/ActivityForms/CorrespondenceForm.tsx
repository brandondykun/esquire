import CustomDateInput from "../CustomDateInput";
import CustomTextInput from "../CustomTextInput";
import CustomTextAreaInput from "../CustomTextAreaInput";
import CustomSelect from "../CustomSelect";
import { useState } from "react";
import Button from "../Button";
import { dateToInputFormat } from "../Calendar/CalendarUtils";
import { useParams } from "react-router-dom";

const CorrespondenceForm = () => {
  const defaultDate = new Date();

  const { clientId } = useParams();

  const [submitLoading, setSubmitLoading] = useState(false);

  const [date, setDate] = useState(defaultDate);
  const [dateErrorText, setDateErrorText] = useState("");

  const [inOut, setInOut] = useState("incoming");
  const [inOutErrorText, setInOutErrorText] = useState("");

  const [name, setName] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");

  const [partyType, setPartyType] = useState("");
  const [partyTypeErrorText, setPartyTypeErrorText] = useState("");

  const [deadline, setDeadline] = useState(defaultDate);
  const [deadlineErrorText, setDeadlineErrorText] = useState("");

  const [comments, setComments] = useState("");
  const [commentsErrorText, setCommentsErrorText] = useState("");

  const options = [
    { value: "incoming", text: "Incoming" },
    { value: "outgoing", text: "Outgoing" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDateErrorText("");
    setInOutErrorText("");
    setNameErrorText("");
    setPartyTypeErrorText("");
    setDeadlineErrorText("");
    setCommentsErrorText("");

    let error = false;

    if (!date) {
      setDateErrorText("Please enter a date.");
      error = true;
    }
    if (!inOut) {
      setInOutErrorText("Please enter an In/Out value.");
      error = true;
    }
    if (!name) {
      setNameErrorText("Please enter a name.");
      error = true;
    }
    if (!partyType) {
      setPartyTypeErrorText("Please enter a party type.");
      error = true;
    }
    if (!deadline) {
      setDeadlineErrorText("Please enter a deadline.");
      error = true;
    }
    if (!comments) {
      setCommentsErrorText("Please enter a comment.");
      error = true;
    }
    if (error) return;

    const data = {
      type: "correspondence",
      data: {
        date,
        inOut,
        name,
        partyType,
        deadline,
        comments,
        clientId,
      },
    };

    // API CALL TO ADD THIS
  };
  return (
    <div className="correspondence-form-container">
      <form onSubmit={handleSubmit}>
        <CustomDateInput
          id="date"
          label="DATE"
          value={dateToInputFormat(date)}
          valid={!dateErrorText}
          validationText={dateErrorText}
          onChange={(e) => {
            const d = new Date(e.target.value);
            setDate(d);
          }}
        />

        <CustomSelect
          id="in-out"
          value={inOut}
          onChange={(e) => setInOut(e.target.value)}
          options={options}
          label="INCOMING/OUTGOING"
          valid={!inOutErrorText}
          validationText={inOutErrorText}
        />

        <CustomTextInput
          id="name"
          label="NAME"
          value={name}
          valid={!nameErrorText}
          validationText={nameErrorText}
          onChange={(e) => setName(e.target.value)}
        />

        <CustomTextInput
          id="party-type"
          label="PARTY TYPE"
          value={partyType}
          valid={!partyTypeErrorText}
          validationText={partyTypeErrorText}
          onChange={(e) => setPartyType(e.target.value)}
        />

        <CustomDateInput
          id="deadline"
          label="DEADLINE"
          value={dateToInputFormat(deadline)}
          valid={!deadlineErrorText}
          validationText={deadlineErrorText}
          onChange={(e) => {
            const d = new Date(e.target.value);
            setDeadline(d);
          }}
        />

        <CustomTextAreaInput
          id="comment-text"
          label="COMMENTS"
          placeholder="Comments..."
          value={comments}
          valid={!commentsErrorText}
          validationText={commentsErrorText}
          onChange={(e) => setComments(e.target.value)}
        />
        <Button type="submit" text="SUBMIT" />
      </form>
    </div>
  );
};

export default CorrespondenceForm;
