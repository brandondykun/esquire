import { useState, useEffect } from "react";
import { getEvents } from "../api/apiCalls";
import { EventTypeWithId } from "../components/Calendar/CalendarTypes";

const useEvents = () => {
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);
  const [eventsList, setEventsList] = useState<null | EventTypeWithId[]>(null);
  const [eventsError, setEventsError] = useState<null | string>(null);

  useEffect(() => {
    getEvents()
      .then((res) => {
        setEventsList(res.data);
        setEventsLoading(false);
      })
      .catch((err) => {
        setEventsError("There was a problem fetching your list");
        setEventsLoading(false);
      });
  }, []);
  return { eventsLoading, eventsList, eventsError };
};

export default useEvents;
