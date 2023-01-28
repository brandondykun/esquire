import { EventType, EventTypeWithId } from "./CalendarTypes";
import * as dayjs from "dayjs";

export const toStartOfDay = (date: string | Date) => {
  const newDate = new Date(date);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);
  return newDate;
};

export const findEventsForDate = (events: EventTypeWithId[], date: Date) => {
  const dateTime = date.getTime();
  if (events) {
    return events.filter((event: EventType) => {
      const eventFromTime = toStartOfDay(event.dateFrom).getTime();
      const eventToTime = toStartOfDay(event.dateTo).getTime();

      return dateTime >= eventFromTime && dateTime <= eventToTime;
    });
  }
  return [];
};

const pad = (input: number) => {
  return input < 10 ? "0" + input : input;
};

// I'm using default <input type="datetime-local">,
// so a specific date format is required
export const dateToInputFormat = (date: Date | undefined) => {
  if (!date) {
    return "";
  }

  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${date.getFullYear()}-${month}-${day}T${hours}:${minutes}`;
};

// Could be used to filter out invalid events data also
// (ie. missing properties) or events that can't be parsed
// to contain valid to/from dates
export const parseEvents = (events: EventTypeWithId[] | null) => {
  if (!events) {
    return [];
  }
  return events.map((event) => {
    const from = new Date(event.dateFrom);
    const to = new Date(event.dateTo);

    return {
      ...event,
      from,
      to,
    };
  });
};
