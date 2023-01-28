import CustomDateInput from "../CustomDateInput";
import CustomTextInput from "../CustomTextInput";
import CustomTextAreaInput from "../CustomTextAreaInput";
import Button from "../Button";
import { dateToInputFormat } from "../Calendar/CalendarUtils";
import { useState } from "react";

const FilingForm = () => {
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate);

  const [typeText, setTypeText] = useState("");

  const [filedBy, setFiledBy] = useState("");

  const [deadline, setDeadline] = useState(defaultDate);

  const [comments, setComments] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      type: "filing",
      data: {
        date: date,
        type: typeText,
        filedBy: filedBy,
        deadline: deadline,
        comments: comments,
      },
    };

    console.log("DATAAAA: ", data);
  };

  return (
    <div className="filing-form-container">
      <form onSubmit={handleSubmit}>
        <CustomDateInput
          id="date"
          label="DATE"
          value={dateToInputFormat(date)}
          valid={true}
          validationText="Validation Text"
          onChange={(e) => {
            console.log("DATE e.target.value: ", e.target.value);
            const d = new Date(e.target.value);
            setDate(d);
          }}
        />

        <CustomTextInput
          id="type"
          label="TYPE"
          value={typeText}
          valid={true}
          validationText="Type validation text."
          onChange={(e) => setTypeText(e.target.value)}
        />

        <CustomTextInput
          id="filedBy"
          label="FILED BY"
          value={filedBy}
          valid={true}
          validationText="Filed By validation text."
          onChange={(e) => setFiledBy(e.target.value)}
        />

        <CustomDateInput
          id="deadline"
          label="DEADLINE"
          value={dateToInputFormat(deadline)}
          valid={true}
          validationText="Validation Text for deadline"
          onChange={(e) => {
            const d = new Date(e.target.value);
            setDeadline(d);
          }}
        />

        <CustomTextAreaInput
          id="comment-text"
          label="COMMENTS"
          value={comments}
          valid={true}
          validationText="Comments Validation text"
          onChange={(e) => setComments(e.target.value)}
        />

        <Button type="submit" text="SUBMIT" />
      </form>
    </div>
  );
};

export default FilingForm;
