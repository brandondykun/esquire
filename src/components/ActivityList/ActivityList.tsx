import ActivityFilter from "../ActivityFilter/ActivityFilter";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddActivityModal from "../../modals/addActivityModal/AddActivityModal";
import { useEffect, useState } from "react";
import useActivities from "../../hooks/useActivities";
import CorrespondenceCard from "../ActivityCards/CorrespondenceCard";
import CourtCard from "../ActivityCards/CourtCard";
import FilingCard from "../ActivityCards/FilingCard";
import MeetingCard from "../ActivityCards/MeetingCard";
import PhoneEmailCard from "../ActivityCards/PhoneEmailCard";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "./activityList.scss";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const activitie = [
  {
    id: 0,
    type: "correspondence",
    data: {
      date: "Feb 2, 2023",
      inOut: "outgoing",
      name: "Anderson Cooper",
      partyType: "Client", // opposing counsel, case worker
      deadline: "March 15, 2023", // could also be N/A
      comments: "This is a comment about this",
      clientId: 1,
    },
  },
  {
    id: 1,
    type: "courtAppearance",
    data: {
      duration: "1.5",
      date: "Jan 30, 2023",
      county: "Westmoreland",
      deadline: "Feb 17, 2023", // could also be N/A
      comments: "Ayyyyy another comment up in here.",
      clientId: 1,
    },
  },
  {
    id: 2,
    type: "filing",
    data: {
      date: "Jan 19, 2023",
      type: "Civil complaint", // Entry of appearance, court order
      filedBy: "Gillian Perez",
      deadline: "Feb 23, 2023", // Could be N/A
      comments: "This is another comment about this and its a little longer than the rest.",
      clientId: 1,
    },
  },
  {
    id: 3,
    type: "meeting",
    data: {
      date: "Feb 14, 2023",
      duration: "1.0",
      name: "Anderson Cooper",
      partyType: "Client", // opposing counsel, case worker
      comments: "This is a comment about this.",
      clientId: 1,
    },
  },
  {
    id: 4,
    type: "phoneEmail",
    data: {
      date: "Dec 15, 2022",
      inOut: "incoming",
      name: "Anderson Cooper",
      partyType: "Client",
      deadline: "March 1, 2023",
      duration: ".5",
      clientId: 1,
      comments: "This is the phone and email comment",
    },
  },
  {
    id: 5,
    type: "meeting",
    data: {
      date: "Feb 23, 2023",
      duration: "1.5",
      name: "Anderson Cooper",
      partyType: "Client",
      comments: "Great meeting, it was basically a party.",
      clientId: 1,
    },
  },
];

type Param = {
  clientId: string;
};

type Props = {
  setShowAddCaseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActivityList = ({ setShowAddCaseModal }: Props) => {
  let { clientId } = useParams<Param>();
  const id: number = Number(clientId);

  const [active, setActive] = useState("all");

  const [filtered, setFiltered] = useState(activitie);

  const { activities, activitiesError, activitiesLoading, setActivities } = useActivities(clientId);

  const [showActivityModal, setShowActivityModal] = useState(false);

  useEffect(() => {
    let filteredActs;
    if (active === "all") {
      setFiltered(activitie);
    } else {
      filteredActs = activitie.filter((a) => {
        return a.type === active;
      });
      setFiltered(filteredActs);
    }
  }, [active]);

  return (
    <>
      <div className="filter-menu-container">
        <ActivityFilter active={active} setActive={setActive} />
        <Menu
          menuButton={<button className="activity-list-menu-trigger">+</button>}
          className="custom-menu"
          position="auto"
          align="end"
          offsetY={7}
        >
          <MenuItem onClick={() => setShowActivityModal(true)}>Add Activity</MenuItem>
          <MenuItem onClick={() => setShowAddCaseModal(true)}>Add Case</MenuItem>
        </Menu>
      </div>
      {filtered.map((a) => {
        return renderCard(a);
      })}
      <AddActivityModal
        show={showActivityModal}
        setShow={setShowActivityModal}
        activities={activities}
        setActivities={setActivities}
      />
    </>
  );
};

export default ActivityList;

const renderCard = (activity: any) => {
  const type = activity.type;
  if (type === "correspondence") {
    return <CorrespondenceCard activity={activity} key={activity.id} />;
  } else if (type === "courtAppearance") {
    return <CourtCard activity={activity} key={activity.id} />;
  } else if (type === "filing") {
    return <FilingCard activity={activity} key={activity.id} />;
  } else if (type === "meeting") {
    return <MeetingCard activity={activity} key={activity.id} />;
  } else if (type === "phoneEmail") {
    return <PhoneEmailCard activity={activity} key={activity.id} />;
  }
};
