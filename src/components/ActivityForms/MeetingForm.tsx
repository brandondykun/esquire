import { useState } from "react";
import CustomDateInput from "../CustomDateInput";
import CustomTextInput from "../CustomTextInput";
import CustomTextAreaInput from "../CustomTextAreaInput";
import CustomSelect from "../CustomSelect";
import Button from "../Button";
import { dateToInputFormat } from "../Calendar/CalendarUtils";
import CustomNumberInput from "../CustomNumberInput";
import { useParams } from "react-router-dom";

// date
// duration
// name
// partyType
// comments

const MeetingForm = () => {
  const defaultDate = new Date();

  const { clientId } = useParams();

  const [submitLoading, setSubmitLoading] = useState(false);

  const [date, setDate] = useState(defaultDate);
  const [dateErrorText, setDateErrorText] = useState("");

  const [duration, setDuration] = useState<string | number>(0);
  const [durationErrorText, setDurationErrorText] = useState("");

  const [name, setName] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");

  const [partyType, setPartyType] = useState("");
  const [partyTypeErrorText, setPartyTypeErrorText] = useState("");

  const [comments, setComments] = useState("");
  const [commentsErrorText, setCommentsErrorText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDateErrorText("");
    setDurationErrorText("");
    setNameErrorText("");
    setPartyTypeErrorText("");
    setCommentsErrorText("");

    let error = false;
    if (!date) {
      setDateErrorText("Please enter a date.");
      error = true;
    }
    if (!duration) {
      setDurationErrorText("Please enter a duration.");
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
    if (!comments) {
      setCommentsErrorText("Please enter a comment.");
      error = true;
    }
    if (error) return;

    const durationMins = Number(duration) * 60;
    const data = {
      type: "meeting",
      data: {
        date,
        duration: durationMins,
        name,
        partyType,
        comments,
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
        <CustomNumberInput
          id="duration"
          label="DURATION (hours)"
          placeholder={undefined}
          setVal={setDuration}
          valid={!durationErrorText}
          validationText={durationErrorText}
          value={duration}
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

export default MeetingForm;
