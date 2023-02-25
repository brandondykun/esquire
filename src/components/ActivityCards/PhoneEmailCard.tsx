import "./activityCards.scss";

const val = {
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
      duration: string;
      clientId: number;
      comments: string;
    };
  };
};

const PhoneEmailCard = ({ activity }: Props) => {
  return (
    <div className="activity-card">
      <div className="activity-card-header">
        <div className="card-faded-text">
          Phone/Email - <span>{activity.data.inOut}</span>
        </div>
        <div>{activity.data.date}</div>
      </div>
      <div className="activity-card-body">
        <div>{activity.data.name}</div>
        <div>
          <span className="card-faded-text">Party Type: </span>
          {activity.data.partyType}
        </div>
        <div>
          <span className="card-faded-text">Deadline:</span>{" "}
          {activity.data.deadline}
        </div>
        <div>
          <span className="card-faded-text">Duration: </span>
          {activity.data.duration} hrs
        </div>
        <div className="activity-card-comment">
          <div>{activity.data.comments}</div>
        </div>
      </div>
    </div>
  );
};

export default PhoneEmailCard;
