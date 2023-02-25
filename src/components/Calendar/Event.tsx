import { EventType, ShowingEventFormType, EventProps } from "./CalendarTypes";
import Modal from "./Modal";
import Button from "../Button/Button";

/**
 * Event Component
 */

// The main event view, opens in a modal and contains all information
// about the event in question
const Event = ({ event, setViewingEvent, setShowingEventForm, deleteEvent }: EventProps) => {
  // format start and end times to display properly
  const startDateTime = new Date(event.dateFrom);
  const startDate = startDateTime.toLocaleDateString();
  const startHours = startDateTime.getHours();
  const startMinutes = startDateTime.getMinutes();
  const formattedStartHours = startHours < 10 ? "0" + startHours : startHours;
  const formattedStartMinutes = startMinutes < 10 ? "0" + startMinutes : startMinutes;
  const formattedStartTime = `${formattedStartHours}${formattedStartMinutes}`;

  const endDateTime = new Date(event.dateTo);
  const endDate = endDateTime.toLocaleDateString();
  const endHours = endDateTime.getHours();
  const endMinutes = endDateTime.getMinutes();
  const formattedEndHours = endHours < 10 ? "0" + endHours : endHours;
  const formattedEndMinutes = endMinutes < 10 ? "0" + endMinutes : endMinutes;
  const formattedEndTime = `${formattedEndHours}${formattedEndMinutes}`;

  // boolean for if the day is all day event
  const isAllDayEvent = formattedStartTime === "0000" && formattedEndTime === "2359";

  const formatDurationMessage = () => {
    if (startDate === endDate && !isAllDayEvent) {
      return (
        <>
          <span>
            <b>{startDate}</b>
          </span>{" "}
          <span>
            From: <b>{formattedStartTime}</b>
          </span>{" "}
          <span>
            - <b>{formattedEndTime}</b>
          </span>
        </>
      );
    } else if (startDate === endDate && isAllDayEvent) {
      return (
        <>
          <span>
            <b>{startDate}</b>
          </span>{" "}
          <b>- ALL DAY</b>
        </>
      );
    } else {
      return (
        <>
          From{" "}
          <b>
            {startDate} {formattedStartTime}
          </b>{" "}
          to{" "}
          <b>
            {endDate} {formattedEndTime}
          </b>
        </>
      );
    }
  };

  return (
    <Modal
      onClose={() => setViewingEvent(null)}
      title={event.name}
      type={event.type}
      className={`eventModal ${event.type} bottom`}
    >
      <p className="event-time-range">{formatDurationMessage()}</p>
      <p className="event-meta">{event.meta}</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <a className="close" onClick={() => setViewingEvent(null)}>
          Back to calendar
        </a>

        <div style={{ display: "flex", gap: ".5rem", alignItems: "flex-end" }}>
          <Button
            type="button"
            onClick={() => {
              setViewingEvent(null);
              setShowingEventForm({ visible: true, withEvent: event });
            }}
            text="EDIT EVENT"
            margin="0"
            height="30px"
            fontSize=".7rem"
            width="150px"
            minWidth="100px"
          />
          <Button
            type="button"
            onClick={() => deleteEvent(event)}
            text="DELETE EVENT"
            margin="0"
            height="30px"
            fontSize=".7rem"
            width="150px"
            minWidth="100px"
          />
        </div>
      </div>
    </Modal>
  );
};

export default Event;
