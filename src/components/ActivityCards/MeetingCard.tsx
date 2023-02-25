import "./activityCards.scss";

const val = {
  type: "meeting",
  data: {
    date: "This is the date",
    duration: "1.0",
    name: "This is the name",
    partyType: "party type",
    comments: "This is a comment about this.",
    clientId: 1,
  },
};

type Props = {
  activity: {
    type: string;
    data: {
      date: string;
      duration: string;
      name: string;
      partyType: string;
      comments: string;
      clientId: number;
    };
  };
};

const MeetingCard = ({ activity }: Props) => {
  return (
    <div className="activity-card">
      <div className="activity-card-header">
        <div className="card-faded-text">Meeting</div>
        <div>{activity.data.date}</div>
      </div>
      <div className="activity-card-body">
        <div>{activity.data.name}</div>
        <div>
          <span className="card-faded-text">Duration: </span>{" "}
          {activity.data.duration} hrs
        </div>
        <div>
          <span className="card-faded-text">Party Type:</span>{" "}
          {activity.data.partyType}
        </div>
        <div className="activity-card-comment">
          <div>{activity.data.comments}</div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
