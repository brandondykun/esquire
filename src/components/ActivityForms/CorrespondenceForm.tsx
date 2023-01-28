import CustomDateInput from "../CustomDateInput";
import CustomTextInput from "../CustomTextInput";
import CustomTextAreaInput from "../CustomTextAreaInput";
import CustomSelect from "../CustomSelect";
import { useState } from "react";
import Button from "../Button";

const CorrespondenceForm = () => {
  const defaultDate = new Date();
  const [date, setDate] = useState(defaultDate.toLocaleDateString());

  const [inOut, setInOut] = useState("incoming");

  const [name, setName] = useState("");

  const [partyType, setPartyType] = useState("");

  const [deadline, setDeadline] = useState(defaultDate.toLocaleDateString());

  const [comments, setComments] = useState("");

  const options = [
    { value: "incoming", text: "Incoming" },
    { value: "outgoing", text: "Outgoing" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="correspondence-form-container">
      <form onSubmit={handleSubmit}>
        <CustomDateInput
          id="date"
          label="DATE"
          value={date}
          valid={true}
          validationText="Date validation Text"
          onChange={(e) => setDate(e.target.value)}
        />

        <CustomSelect
          id="in-out"
          value={inOut}
          onChange={(e) => setInOut(e.target.value)}
          options={options}
          label="INCOMING/OUTGOING"
          valid={true}
          validationText="In Out Validation Text"
        />

        <CustomTextInput
          id="name"
          label="NAME"
          value={name}
          valid={true}
          validationText="Name validation text."
          onChange={(e) => setName(e.target.value)}
        />

        <CustomTextInput
          id="party-type"
          label="PARTY TYPE"
          value={partyType}
          valid={true}
          validationText="Party Type validation text."
          onChange={(e) => setPartyType(e.target.value)}
        />

        <CustomDateInput
          id="deadline"
          label="DEADLINE"
          value={deadline}
          valid={true}
          validationText="Validation Text for deadline"
          onChange={(e) => setDeadline(e.target.value)}
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

export default CorrespondenceForm;
