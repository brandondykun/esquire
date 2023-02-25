import CustomDateInput from "../CustomDateInput";
import CustomTextInput from "../CustomTextInput";
import CustomTextAreaInput from "../CustomTextAreaInput";
import Button from "../Button/Button";
import { dateToInputFormat } from "../Calendar/CalendarUtils";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FilingForm = () => {
  const defaultDate = new Date();

  const { clientId } = useParams();

  const [submitLoading, setSubmitLoading] = useState(false);

  const [date, setDate] = useState(defaultDate);
  const [dateErrorText, setDateErrorText] = useState("");

  const [typeText, setTypeText] = useState("");
  const [typeTextErrorText, setTypeTextErrorText] = useState("");

  const [filedBy, setFiledBy] = useState("");
  const [filedByErrorText, setFiledByErrorText] = useState("");

  const [deadline, setDeadline] = useState(defaultDate);
  const [deadlineErrorText, setDeadlineErrorText] = useState("");

  const [comments, setComments] = useState("");
  const [commentsErrorText, setCommentsErrorText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setDateErrorText("");
    setTypeTextErrorText("");
    setFiledByErrorText("");
    setDeadlineErrorText("");
    setCommentsErrorText("");

    let error = false;

    if (!date) {
      setDateErrorText("Please enter a date.");
      error = true;
    }
    if (!typeText) {
      setTypeTextErrorText("Please enter a type.");
      error = true;
    }
    if (!filedBy) {
      setFiledByErrorText("Please enter who filed this.");
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
      type: "filing",
      data: {
        date: date,
        type: typeText,
        filedBy: filedBy,
        deadline: deadline,
        comments: comments,
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

        <CustomTextInput
          id="type"
          label="TYPE"
          value={typeText}
          valid={!typeTextErrorText}
          validationText={typeTextErrorText}
          onChange={(e) => setTypeText(e.target.value)}
        />

        <CustomTextInput
          id="filedBy"
          label="FILED BY"
          value={filedBy}
          valid={!filedByErrorText}
          validationText={filedByErrorText}
          onChange={(e) => setFiledBy(e.target.value)}
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

export default FilingForm;
