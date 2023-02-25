import "./activityCards.scss";

const val = {
  type: "filing",
  data: {
    date: "This is the date",
    type: "This is the type",
    filedBy: "Gillian Perez",
    deadline: "deadline",
    comments:
      "This is another comment about this and its a little longer than the rest.",
    clientId: 1,
  },
};

type Props = {
  activity: {
    type: string;
    data: {
      date: string;
      type: string;
      filedBy: string;
      deadline: string;
      comments: string;
      clientId: number;
    };
  };
};

const FilingCard = ({ activity }: Props) => {
  return (
    <div className="activity-card">
      <div className="activity-card-header">
        <div className="card-faded-text">Filing</div>
        <div>{activity.data.date}</div>
      </div>
      <div className="activity-card-body">
        <div>{activity.data.type}</div>
        <div>
          {" "}
          <span className="card-faded-text">Filed By:</span>{" "}
          {activity.data.filedBy}
        </div>
        <div>
          <span className="card-faded-text">Deadline:</span>{" "}
          {activity.data.deadline}
        </div>
        <div className="activity-card-comment">
          <div>{activity.data.comments}</div>
        </div>
      </div>
    </div>
  );
};

export default FilingCard;
