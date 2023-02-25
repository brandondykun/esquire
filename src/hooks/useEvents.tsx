import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../api/apiCalls";
import { EventTypeWithId } from "../components/Calendar/CalendarTypes";
import { useAuthContext } from "../context/AuthContext";
import camelcaseKeys from "camelcase-keys";

const useEvents = () => {
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);
  const [eventsList, setEventsList] = useState<null | EventTypeWithId[]>(null);
  const [eventsError, setEventsError] = useState<null | string>(null);

  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser) {
      getEvents()
        .then((res) => {
          const dbEvents = res.data;
          const formattedEvents = camelcaseKeys(dbEvents);
          setEventsList(formattedEvents);
          setEventsLoading(false);
        })
        .catch((err) => {
          if (err.response?.data?.error === "NO TOKEN") {
            setCurrentUser(null);
            navigate("/login");
          }
          setEventsError("There was a problem fetching your list");
          setEventsLoading(false);
        });
    }
  }, []);
  return { eventsLoading, eventsList, eventsError };
};

export default useEvents;
