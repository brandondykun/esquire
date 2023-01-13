import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Navigation Component
 */

type NavigationProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setShowingEventForm: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
    }>
  >;
};

// Top bar, contains the month/year combo as well as back/forward links
const Navigation = ({
  date,
  setDate,
  setShowingEventForm,
}: NavigationProps) => {
  return (
    <div className="navigation">
      <div
        className="back"
        onClick={() => {
          const newDate = new Date(date);
          newDate.setMonth(newDate.getMonth() - 1);
          setDate(newDate);
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span className="navigation-month">
          {MONTHS[date.getMonth() == 0 ? 11 : date.getMonth() - 1]}
        </span>
      </div>

      <div className="monthAndYear">
        {MONTHS[date.getMonth()]} {date.getFullYear()}
        <a
          className="add-event-main-button"
          onClick={() => setShowingEventForm({ visible: true })}
        >
          +
        </a>
      </div>
      <div
        className="forward"
        onClick={() => {
          const newDate = new Date(date);
          newDate.setMonth(newDate.getMonth() + 1);
          setDate(newDate);
        }}
      >
        <span className="navigation-month">
          {MONTHS[date.getMonth() == 11 ? 0 : date.getMonth() + 1]}{" "}
        </span>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};

export default Navigation;
