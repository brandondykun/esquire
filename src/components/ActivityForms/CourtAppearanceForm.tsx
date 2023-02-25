import { useState } from "react";
import CustomDateInput from "../CustomDateInput";
import CustomTextInput from "../CustomTextInput";
import CustomTextAreaInput from "../CustomTextAreaInput";
import Button from "../Button/Button";
import { dateToInputFormat } from "../Calendar/CalendarUtils";
import CustomNumberInput from "../CustomNumberInput";
import { useParams } from "react-router-dom";

const CourtAppearanceForm = () => {
  const defaultDate = new Date();

  const { clientId } = useParams();

  const [submitLoading, setSubmitLoading] = useState(false);

  const [date, setDate] = useState(defaultDate);
  const [dateErrorText, setDateErrorText] = useState("");

  const [county, setCounty] = useState("");
  const [countyErrorText, setCountyErrorText] = useState("");

  const [duration, setDuration] = useState<string | number>(1);
  const [durationErrorText, setDurationErrorText] = useState("");

  const [deadline, setDeadline] = useState(defaultDate);
  const [deadlineErrorText, setDeadlineErrorText] = useState("");

  const [comments, setComments] = useState("");
  const [commentsErrorText, setCommentsErrorText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDateErrorText("");
    setCountyErrorText("");
    setDurationErrorText("");
    setDeadlineErrorText("");
    setCommentsErrorText("");

    let error = false;

    if (!date) {
      setDateErrorText("Please enter a date.");
      error = true;
    }

    if (!county) {
      setCountyErrorText("Please enter a county.");
      error = true;
    }

    if (!duration) {
      setDurationErrorText("Please enter a duration.");
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

    const durationInMins = Number(duration) * 60;
    const data = {
      type: "courtAppearance",
      data: {
        duration: durationInMins,
        date,
        county,
        deadline,
        comments,
        clientId,
      },
    };
    // API CALL TO ADD THIS
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

        <CustomTextInput
          id="county"
          label="COUNTY"
          value={county}
          valid={!countyErrorText}
          validationText={countyErrorText}
          onChange={(e) => setCounty(e.target.value)}
        />

        <CustomNumberInput
          id="duration"
          label="DURATION (hours)"
          value={duration}
          valid={!durationErrorText}
          validationText={durationErrorText}
          setVal={setDuration}
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
          id="comments"
          label="COMMENTS"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          valid={!commentsErrorText}
          validationText={commentsErrorText}
          placeholder="Comments..."
        />

        <Button type="submit" text="SUBMIT" />
      </form>
    </div>
  );
};

export default CourtAppearanceForm;
