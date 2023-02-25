import "./activityPage.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActivities } from "../../api/apiCalls";
import useActivities from "../../hooks/useActivities";
import CustomModal from "../../modals/customModal/CustomModal";
import AddActivityModal from "../../modals/addActivityModal/AddActivityModal";

const ActivityPage = () => {
  const { clientId } = useParams();

  const { activities, activitiesError, activitiesLoading, setActivities } = useActivities(clientId);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-container">
      <div className="activity-page-title">Activities</div>
      {activitiesLoading && <div>Activities Loading</div>}
      <button onClick={() => setShowModal(true)}>ADD ACTIVITY</button>

      <AddActivityModal show={showModal} setShow={setShowModal} activities={activities} setActivities={setActivities} />
    </div>
  );
};

export default ActivityPage;

const act = [
  {
    type: "correspondence",
    data: {
      date: "This is the date",
      inOut: "outgoing",
      name: "Name Goes Here",
      partyType: "party type",
      deadline: "deadline",
      comments: "This is a comment about this",
      clientId: 1,
    },
  },
  {
    type: "courtAppearance",
    data: {
      duration: "1.5",
      date: "This is the date",
      county: "Westmoreland",
      deadline: "deadline",
      comments: "Ayyyyy another comment up in here.",
      clientId: 1,
    },
  },
  {
    type: "filing",
    data: {
      date: "This is the date",
      type: "This is the type",
      filedBy: "Gillian Perez",
      deadline: "deadline",
      comments: "This is another comment about this and its a little longer than the rest.",
      clientId: 1,
    },
  },
  {
    type: "meeting",
    data: {
      date: "This is the date",
      duration: "1.0",
      name: "This is the name",
      partyType: "party type",
      comments: "This is a comment about this.",
      clientId: 1,
    },
  },
  {
    type: "phoneEmail",
    data: {
      date: "This is the date",
      inOut: "incoming",
      name: "This is the name",
      partyType: "party type",
      deadline: "deadline",
      duration: ".5",
      clientId: 1,
    },
  },
];
