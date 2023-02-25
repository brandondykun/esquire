import "./activityCards.scss";

const val = {
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
};

type Props = {
  activity: {
    type: string;
    data: {
      date: string;
      inOut: string;
      name: string;
      partyType: string;
      deadline: string;
      comments: string;
      clientId: number;
    };
  };
};
const CorrespondenceCard = ({ activity }: Props) => {
  return (
    <div className="activity-card">
      <div className="activity-card-header">
        <div className="card-faded-text">
          Correspondence - <span>{activity.data.inOut}</span>
        </div>
        <div>{activity.data.date}</div>
      </div>
      <div className="activity-card-body">
        <div>{activity.data.name}</div>
        <div>
          <span className="card-faded-text">Party Type: </span>{" "}
          {activity.data.partyType}
        </div>
        <div>
          <span className="card-faded-text">Deadline: </span>{" "}
          {activity.data.deadline}
        </div>
        <div className="activity-card-comment">
          <div>{activity.data.comments}</div>
        </div>
      </div>
    </div>
  );
};

export default CorrespondenceCard;
