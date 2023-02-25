import "./activityCards.scss";

const val = {
  type: "courtAppearance",
  data: {
    duration: "1.5",
    date: "This is the date",
    county: "Westmoreland",
    deadline: "deadline",
    comments: "Ayyyyy another comment up in here.",
    clientId: 1,
  },
};

type Props = {
  activity: {
    type: string;
    data: {
      duration: string;
      date: string;
      county: string;
      deadline: string;
      comments: string;
      clientId: number;
    };
  };
};

const CourtCard = ({ activity }: Props) => {
  return (
    <div className="activity-card">
      <div className="activity-card-header">
        <div className="card-faded-text">Court Appearance</div>
        <div>{activity.data.date}</div>
      </div>
      <div className="activity-card-body">
        <div>
          <span className="card-faded-text">Duration: </span>{" "}
          {activity.data.duration} hrs
        </div>
        <div>
          <span className="card-faded-text">County: </span>
          {activity.data.county}
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

export default CourtCard;
