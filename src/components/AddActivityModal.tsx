import "./addActivityModal.scss";
import CustomModal from "./CustomModal";
import { Activity } from "../types";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import FilingForm from "./ActivityForms/FilingForm";
import CorrespondenceForm from "./ActivityForms/CorrespondenceForm";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  activities: Activity[] | null;
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
};

const optionsArray = [
  { value: "filing", text: "Filing" },
  { value: "correspondence", text: "Correspondence" },
  { value: "phoneEmail", text: "Phone/Email" },
  { value: "courtAppearance", text: "Court Appearance" },
  { value: "meeting", text: "Meeting" },
];

// ADD ACTIVITY MODAL
const AddActivityModal = ({ show, setShow, activities }: Props) => {
  const [activityType, setActivityType] = useState(optionsArray[0]);

  const handleModalClose = () => {
    setShow(false);
    setActivityType(optionsArray[0]);
  };

  return (
    <CustomModal
      title={`ADD ACTIVITY - ${activityType.text.toUpperCase()}`}
      show={show}
      onClose={handleModalClose}
    >
      <div className="add-activity-modal-inner">
        <CustomSelect
          id="activity-type-select"
          label="ACTIVITY TYPE"
          value={activityType.value}
          valid={true}
          validationText="Please select an activity type."
          options={optionsArray}
          onChange={(e) => {
            const opt = optionsArray.find((o) => o.value === e.target.value);
            setActivityType(opt ? opt : optionsArray[0]);
          }}
        />

        {activityType.value === "filing" && <FilingForm />}
        {activityType.value === "correspondence" && <CorrespondenceForm />}
        {activityType.value === "phoneEmail" && (
          <div>This is the phoneEmail form</div>
        )}
        {activityType.value === "courtAppearance" && (
          <div>This is the courtAppearance form</div>
        )}
        {activityType.value === "meeting" && (
          <div>This is the meeting form</div>
        )}
      </div>
    </CustomModal>
  );
};

export default AddActivityModal;
