import { FeedbackProps } from "./CalendarTypes";

/**
 * Feedback Component
 */

// Generic component - simple feedback after an action has taken place
const Feedback = ({ message, type }: FeedbackProps) => {
  return <div className={`feedback ${type}`}>{message}</div>;
};

export default Feedback;
