import Modal from "./Modal";
import { dateToInputFormat } from "./CalendarUtils";
import { EventFormProps, EventTypeWithId, EventType } from "./CalendarTypes";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import CustomTextInput from "../CustomTextInput";
import CustomDateInput from "../CustomDateInput";
import CustomSelect from "../CustomSelect";
import CustomTextAreaInput from "../CustomTextAreaInput";
import CustomModal from "../../modals/customModal/CustomModal";
/**
 * EventForm Component
 */

const formErrorTemplate = {
  name: "",
  dateTo: "",
  dateFrom: "",
  type: "",
  meta: "",
};

const typeOptions = [
  { value: "reminder", text: "Reminder" },
  { value: "court", text: "Court" },
  { value: "meeting", text: "Meeting" },
  { value: "deadline", text: "Deadline" },
  { value: "event", text: "Event" },
];

// Form to add new events or edit existing events
// In a real implementation, we'd have some frontend
// validation and also the equivalent in our
// backend service...
const EventForm = ({
  setShowingEventForm,
  addEvent,
  editEvent,
  withEvent,
  setViewingEvent,
  preselectedDate,
}: EventFormProps) => {
  const dateNow = new Date().toDateString();
  const newEvent = withEvent || {
    id: undefined,
    type: "reminder",
    dateFrom: dateNow,
    dateTo: dateNow,
    name: "",
    meta: "",
  };
  if (!withEvent && !!preselectedDate) {
    newEvent.dateFrom = dateToInputFormat(preselectedDate);
    newEvent.dateTo = dateToInputFormat(preselectedDate);
  }
  const [event, setEvent] = useState<EventType>(newEvent);
  const [formErrors, setFormErrors] = useState({
    name: "",
    dateFrom: "",
    dateTo: "",
    type: "",
    meta: "",
  });

  const isNewEvent = !withEvent;

  useEffect(() => {
    return setFormErrors(formErrorTemplate);
  }, []);

  const submitEvent = () => {
    let updatedEvent = { ...event };

    const newErrors = {
      name: "",
      dateTo: "",
      dateFrom: "",
      type: "",
      meta: "",
    };

    setFormErrors(newErrors);
    let hasErrors = false;

    const startTime = new Date(event.dateFrom);
    const endTime = new Date(event.dateTo);

    if (!event.name) {
      newErrors.name = "Please enter a name.";
      hasErrors = true;
    }
    if (!event.dateFrom) {
      newErrors.dateFrom = "Please enter a starting date.";
      hasErrors = true;
    }

    if (!event.dateTo) {
      newErrors.dateTo = "Please enter an ending date.";
      hasErrors = true;
    }
    if (endTime < startTime) {
      newErrors.dateTo = "End time cannot be before start time.";
      hasErrors = true;
    }
    if (!event.type) {
      newErrors.type = "Please enter an event type.";
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(newErrors);
      return;
    }

    if (isNewEvent) {
      addEvent(updatedEvent);
    } else {
      if (updatedEvent.id !== undefined) {
        editEvent(updatedEvent);
      }
    }
  };

  return (
    <Modal
      onClose={() => setShowingEventForm({ visible: false })}
      title={`${withEvent ? "Edit Event" : "Add Event"}`}
      className="calendar-modal"
    >
      <div className="form">
        <CustomTextInput
          id="name-input"
          label="NAME"
          value={event?.name ? event?.name : ""}
          onChange={(e) => setEvent({ ...event, name: e.target.value })}
          placeholder="ie. My Event"
          valid={formErrors.name === ""}
          validationText={formErrors.name}
        />

        <CustomDateInput
          id="date-from-input"
          label="START TIME"
          value={event.dateFrom || dateToInputFormat(preselectedDate)}
          valid={formErrors.dateFrom === ""}
          validationText={formErrors.dateFrom}
          onChange={(e) => setEvent({ ...event, dateFrom: e.target.value })}
        />

        <CustomDateInput
          id="date-to-input"
          label="END TIME"
          value={event.dateTo || dateToInputFormat(preselectedDate)}
          valid={formErrors.dateTo === ""}
          validationText={formErrors.dateTo}
          onChange={(e) => setEvent({ ...event, dateTo: e.target.value })}
        />

        <CustomSelect
          id="type-input"
          label="TYPE"
          value={event.type ? event.type.toLowerCase() : "reminder"}
          valid={formErrors.type === ""}
          validationText={formErrors.type}
          options={typeOptions}
          onChange={(e) => setEvent({ ...event, type: e.target.value })}
        />

        <CustomTextAreaInput
          id="description-input"
          label="DESCRIPTION"
          value={event.meta ? event.meta : ""}
          onChange={(e) => setEvent({ ...event, meta: e.target.value })}
          valid={true}
          validationText=""
          placeholder="Description..."
        />

        {/* <div className="event-form-error-container">{formError}</div> */}

        {withEvent ? (
          <>
            <Button
              onClick={submitEvent}
              text="SUBMIT"
              type="button"
              fontSize=".8rem"
              height="30px"
              margin="0px auto 0px auto"
            />
            <a
              className="close"
              onClick={() => {
                setShowingEventForm({ visible: false });
                setViewingEvent(event);
              }}
            >
              Cancel (go back to event view)
            </a>
          </>
        ) : (
          <>
            <Button onClick={submitEvent} text="ADD EVENT TO CALENDAR" type="button" margin="0px auto 0px auto" />
            <a className="close" onClick={() => setShowingEventForm({ visible: false })}>
              Cancel (go back to calendar)
            </a>
          </>
        )}
      </div>
    </Modal>
  );
};

export default EventForm;
