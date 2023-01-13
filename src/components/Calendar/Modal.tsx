import { ModalProps } from "./CalendarTypes";

/**
 * Modal Component
 */

// Generic component - modal to present children within
const Modal = ({
  children,
  onClose,
  title,
  type = "",
  className,
}: ModalProps) => {
  const formatTitle = () => {
    if (type !== "") {
      return (
        <>
          <span>{title}</span>
          <span>{type.toUpperCase()}</span>
        </>
      );
    } else {
      return <span>{title}</span>;
    }
  };
  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className={`modal ${className}`}>
        <h3 className="event-modal-title">{formatTitle()}</h3>
        <div className="inner">{children}</div>
      </div>
    </>
  );
};

export default Modal;
