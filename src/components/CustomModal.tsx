import "./customModal.scss";

type Props = {
  show: boolean;
  children: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
};
const CustomModal = ({ show, onClose, title, children }: Props) => {
  return (
    <>
      {show ? (
        <div
          className={`custom-modal-overlay ${show ? "show" : ""}`}
          onClick={onClose}
        >
          <div
            className="custom-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="custom-modal-title">{title}</div>
            <div className="custom-modal-scroll">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CustomModal;
