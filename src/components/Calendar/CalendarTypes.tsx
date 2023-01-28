export type EventType = {
  id?: number;
  userId: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  meta: string;
  type: string;
};

export type EventTypeWithId = {
  id: number;
  userId: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  meta: string;
  type: string;
};

export type ShowingEventFormType = {
  visible: boolean;
  withEvent?: EventTypeWithId | undefined;
  preselectedDate?: Date | undefined;
};

export type ModalProps = {
  children: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
  className: string;
  type?: string;
};

export type FeedbackProps = {
  message: string;
  type: string;
};

export type FormErrorType = {
  name: string;
  dateFrom: string;
  dateTo: string;
  type: string;
  meta: string;
};

export type EventFormProps = {
  setShowingEventForm: React.Dispatch<
    React.SetStateAction<ShowingEventFormType>
  >;
  addEvent: (event: EventType) => void;
  editEvent: (event: EventTypeWithId) => void;
  withEvent: EventTypeWithId | undefined; // This is correct
  setViewingEvent: React.Dispatch<React.SetStateAction<EventTypeWithId | null>>;
  preselectedDate?: Date;
};

export type EventProps = {
  event: EventTypeWithId;
  setViewingEvent: React.Dispatch<React.SetStateAction<EventTypeWithId | null>>;
  setShowingEventForm: React.Dispatch<
    React.SetStateAction<ShowingEventFormType>
  >;
  deleteEvent: (event: EventTypeWithId) => void;
};

export type CalendarProps = {
  month: number;
  year: number;
  preloadedEvents?: EventType[];
};

export type FeedbackType = {
  message: string;
  type: string;
};
