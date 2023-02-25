import { useState } from "react";
import CustomDateInput from "../CustomDateInput/CustomDateInput";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomTextAreaInput from "../CustomTextAreaInput/CustomTextAreaInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import Button from "../Button/Button";
import { dateToInputFormat } from "../Calendar/CalendarUtils";
import CustomNumberInput from "../CustomNumberInput/CustomNumberInput";
import { useParams } from "react-router-dom";

const PhoneEmailForm = () => {
  const defaultDate = new Date();

  const { clientId } = useParams();

  const [submitLoading, setSubmitLoading] = useState(false);

  const [date, setDate] = useState(defaultDate);
  const [dateErrorText, setDateErrorText] = useState("");

  const [inOut, setInOut] = useState("");
  const [inOutErrorText, setInOutErrorText] = useState("");

  const [name, setName] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");

  const [partyType, setPartyType] = useState("");
  const [partyTypeErrorText, setPartyTypeErrorText] = useState("");

  const [deadline, setDeadline] = useState(defaultDate);
  const [deadlineErrorText, setDeadlineErrorText] = useState("");

  const [duration, setDuration] = useState<string | number>(0);
  const [durationErrorText, setDurationErrorText] = useState("");

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
    setDurationErrorText("");
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
    if (!duration) {
      setDurationErrorText("Please enter a duration.");
      error = true;
    }
    if (!comments) {
      setCommentsErrorText("Please enter a comment.");
      error = true;
    }
    if (error) return;

    const data = {
      type: "phoneEmail",
      data: {
        date,
        inOut,
        name,
        partyType,
        deadline,
        duration,
        clientId,
      },
    };

    // SEND API CALL
  };
  return (
    <div className="filing-form-container">
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
          label="TYPE"
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

        <CustomNumberInput
          id="duration"
          label="DURATION (hours)"
          placeholder={undefined}
          setVal={setDuration}
          valid={!durationErrorText}
          validationText={durationErrorText}
          value={duration}
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

export default PhoneEmailForm;
