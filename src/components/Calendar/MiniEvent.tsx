import { EventTypeWithId } from "./CalendarTypes";

/**
 * MiniEvent Component
 */

type MiniEventProps = {
  event: EventTypeWithId;
  setViewingEvent: React.Dispatch<React.SetStateAction<EventTypeWithId | null>>;
};
// An individual event displayed within the calendar grid itself
// can be clicked to open the main event view
const MiniEvent = ({ event, setViewingEvent }: MiniEventProps) => {
  const formattedStartTime = event.dateFrom.split("T")[1];
  const formattedEndTime = event.dateTo.split("T")[1];

  const timeText =
    formattedStartTime === "00:00" &&
    (formattedEndTime === "23:59" || formattedEndTime === "00:00")
      ? null
      : `${formattedStartTime} - ${formattedEndTime}`;

  return (
    <div
      className={`miniEvent ${
        event.type ? event.type.toLowerCase() : "reminder"
      }`}
      onClick={() => setViewingEvent(event)}
    >
      {timeText && <span className="mini-event-time">{timeText}</span>}
      <span>{event.name}</span>
    </div>
  );
};

export default MiniEvent;
