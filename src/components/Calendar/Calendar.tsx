// Sample events calendar build, explained and detailed over at
// https://justacoding.blog/react-calendar-component-example-with-events/
import "./calendar.scss";
import React from "react";
import Button from "../Button/Button";
import Navigation from "./Navigation";
import MiniEvent from "./MiniEvent";
import Grid from "./Grid";
import Event from "./Event";
import Feedback from "./Feedback";
import DayLabels from "./DayLabels";
import EventForm from "./EventForm";
import Loader from "./Loader";
import useEvents from "../../hooks/useEvents";
import { parseEvents } from "./CalendarUtils";
import { ShowingEventFormType, CalendarProps, EventType, FeedbackType, EventTypeWithId } from "./CalendarTypes";
import { saveEvent, editEvent as editEventApiCall, deleteEvent as deleteEventApiCall } from "../../api/apiCalls";
import { useAuthContext } from "../../context/AuthContext";
import camelcaseKeys from "camelcase-keys";
import { useState, useEffect } from "react";

/**
 * Calendar Component
 */

// The "main" component, our actual calendar
const Calendar = ({ month, year, preloadedEvents = [] }: CalendarProps) => {
  const selectedDate = new Date(year, month - 1);

  const [date, setDate] = useState<Date>(selectedDate);
  const [viewingEvent, setViewingEvent] = useState<EventTypeWithId | null>(null);
  const [showingEventForm, setShowingEventForm] = useState<ShowingEventFormType>({ visible: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);

  const { eventsList, eventsError, eventsLoading } = useEvents();
  const parsedEvents = parseEvents(eventsList);
  const [events, setEvents] = useState<EventTypeWithId[]>(parsedEvents);

  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (eventsList) {
      setEvents(eventsList);
    }
  }, [date, eventsList]);

  type ShowFeedbackProps = {
    message: string;
    type: string;
    timeout?: number;
  };

  const addEvent = (event: EventType) => {
    setIsLoading(true);
    setShowingEventForm({ visible: false });
    if (currentUser) {
      saveEvent({ ...event, userId: currentUser.id })
        .then((res) => {
          if (res.status === 201) {
            const formattedEvent = camelcaseKeys(res.data);
            const parsedEvents = parseEvents([formattedEvent]);
            const updatedEvents = [...events];
            updatedEvents.push(parsedEvents[0]);
            setEvents(updatedEvents);
            setIsLoading(false);
            showFeedback({
              message: "Event created successfully!",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
          setIsLoading(false);
          showFeedback({
            message: "There was a problem saving that event.",
            type: "error",
          });
        });
    }
  };

  // Edit event
  const editEvent = (event: EventTypeWithId) => {
    setIsLoading(true);
    setShowingEventForm({ visible: false });

    // remove to and from so they're not stored in the database
    if (currentUser) {
      const cleanedEvent = {
        id: event.id,
        userId: currentUser.id,
        name: event.name,
        dateFrom: event.dateFrom,
        dateTo: event.dateTo,
        meta: event.meta,
        type: event.type,
      };

      editEventApiCall(event.id, cleanedEvent)
        .then((res) => {
          if (res.status === 200) {
            const formattedEvents = camelcaseKeys(res.data);
            const parsedEvent = parseEvents([formattedEvents]);
            const updatedEvents = [...events].map((updatedEvent) => {
              return updatedEvent.id === event.id ? parsedEvent[0] : updatedEvent;
            });
            setEvents(updatedEvents);
            setIsLoading(false);
            showFeedback({
              message: "Event edited successfully!",
              type: "success",
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
          setIsLoading(false);
          showFeedback({
            message: "There was a problem updating that event",
            type: "error",
          });
        });
    }
  };

  // Delete event
  const deleteEvent = (event: EventTypeWithId) => {
    setIsLoading(true);
    setViewingEvent(null);

    deleteEventApiCall(event.id)
      .then((res) => {
        if (res.status === 200) {
          const updatedEvents = [...events].filter((finalEvent) => finalEvent.id != event.id);
          setEvents(updatedEvents);
          setIsLoading(false);
          showFeedback({
            message: "Event deleted successfully!",
            type: "success",
          });
        }
      })
      .catch((err) => {
        console.error(err.message);
        setIsLoading(false);
        showFeedback({
          message: "There was a problem deleting that event.",
          type: "error",
        });
      });
  };

  const showFeedback = ({ message, type, timeout = 2000 }: ShowFeedbackProps) => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback(null);
    }, timeout);
  };

  return (
    <div className="calendar">
      {isLoading && <Loader />}

      {feedback && <Feedback message={feedback.message} type={feedback.type} />}

      <Navigation date={date} setDate={setDate} setShowingEventForm={setShowingEventForm} />
      <div className="day-labels-container">
        <DayLabels />
      </div>

      <Grid
        date={date}
        events={events}
        setShowingEventForm={setShowingEventForm}
        setViewingEvent={setViewingEvent}
        actualDate={date}
      />

      {viewingEvent && (
        <Event
          event={viewingEvent}
          setShowingEventForm={setShowingEventForm}
          setViewingEvent={setViewingEvent}
          deleteEvent={deleteEvent}
        />
      )}

      {showingEventForm && showingEventForm.visible && (
        <EventForm
          withEvent={showingEventForm.withEvent}
          preselectedDate={showingEventForm.preselectedDate}
          setShowingEventForm={setShowingEventForm}
          addEvent={addEvent}
          editEvent={editEvent}
          setViewingEvent={setViewingEvent}
        />
      )}
      {eventsLoading && <div className="loading-events-popup">Loading Events...</div>}
    </div>
  );
};

export default Calendar;
