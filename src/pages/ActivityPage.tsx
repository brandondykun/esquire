import "./activityPage.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActivities } from "../api/apiCalls";
import useActivities from "../hooks/useActivities";
import CustomModal from "../components/CustomModal";
import AddActivityModal from "../components/AddActivityModal";

const ActivityPage = () => {
  const { clientId } = useParams();

  const { activities, activitiesError, activitiesLoading, setActivities } =
    useActivities(clientId);
  const [showModal, setShowModal] = useState(false);

  const handleDateClick = () => {
    const d = new Date();
    console.log("DATE: ", d);
    console.log("DATE TO ISO: ", d.toISOString());
  };

  return (
    <div className="page-container">
      <div className="activity-page-title">Activities</div>
      {activitiesLoading && <div>Activities Loading</div>}
      <button onClick={() => setShowModal(true)}>Show Modal</button>

      <button onClick={handleDateClick}>DATE BUTTON</button>

      <AddActivityModal
        show={showModal}
        setShow={setShowModal}
        activities={activities}
        setActivities={setActivities}
      />
    </div>
  );
};

export default ActivityPage;
