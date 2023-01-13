import MiniEvent from "./MiniEvent";
import {
  EventType,
  ShowingEventFormType,
  EventTypeWithId,
} from "./CalendarTypes";
import { toStartOfDay, findEventsForDate } from "./CalendarUtils";

/**
 * Grid Component
 */

type GridProps = {
  date: Date;
  events: EventTypeWithId[];
  setViewingEvent: React.Dispatch<React.SetStateAction<EventTypeWithId | null>>;
  setShowingEventForm: React.Dispatch<
    React.SetStateAction<ShowingEventFormType>
  >;
  actualDate: Date;
};
// The grid of days, renders a month's worth of days and
// also populates the events on the relevant dates
const Grid = ({
  date,
  events,
  setViewingEvent,
  setShowingEventForm,
  actualDate,
}: GridProps) => {
  const ROWS_COUNT = 5;
  const currentDate = toStartOfDay(new Date());

  // Finds the closest Monday relative to the first day of
  // the target month/year combination
  // Then increment upon this day until we have a full set
  // of date objects to work with
  const startingDate = new Date(date.getFullYear(), date.getMonth(), 1);
  startingDate.setDate(startingDate.getDate() - startingDate.getDay());

  const dates = [];
  for (let i = 0; i < ROWS_COUNT * 7; i++) {
    const date = new Date(startingDate);
    dates.push({ date, events: findEventsForDate(events, date) });
    startingDate.setDate(startingDate.getDate() + 1);
  }

  return (
    <div className="days-container">
      {dates.map((date) => {
        const isCurrentDay = date.date.getTime() == currentDate.getTime();
        const isCurrentMonth = date.date.getMonth() != actualDate.getMonth();
        return (
          <div
            key={date.date.getTime()}
            className={`cell ${isCurrentDay ? "current" : ""} ${
              isCurrentMonth ? "otherMonth" : ""
            }`}
          >
            <div className="date">
              {date.date.getDate()}
              {isCurrentDay && <span style={{ fontSize: ".8rem" }}>TODAY</span>}
              <a
                className="addEventOnDay"
                onClick={() => {
                  setShowingEventForm({
                    visible: true,
                    preselectedDate: date.date,
                  });
                }}
              >
                +
              </a>
            </div>
            {date?.events
              .sort((a, b) => {
                return +new Date(a.dateFrom) - +new Date(b.dateFrom);
              })
              .map((event: EventTypeWithId) => (
                <MiniEvent
                  key={event.id}
                  keyProp={event.id}
                  event={event}
                  setViewingEvent={setViewingEvent}
                />
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
