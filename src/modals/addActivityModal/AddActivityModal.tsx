import "./addActivityModal.scss";
import CustomModal from "../customModal/CustomModal";
import { Activity } from "../../types";
import CustomSelect from "../../components/CustomSelect";
import { useState } from "react";
import FilingForm from "../../components/ActivityForms/FilingForm";
import CorrespondenceForm from "../../components/ActivityForms/CorrespondenceForm";
import PhoneEmailForm from "../../components/ActivityForms/PhoneEmailForm";
import CourtAppearanceForm from "../../components/ActivityForms/CourtAppearanceForm";
import MeetingForm from "../../components/ActivityForms/MeetingForm";

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
        {activityType.value === "phoneEmail" && <PhoneEmailForm />}
        {activityType.value === "courtAppearance" && <CourtAppearanceForm />}
        {activityType.value === "meeting" && <MeetingForm />}
      </div>
    </CustomModal>
  );
};

export default AddActivityModal;
