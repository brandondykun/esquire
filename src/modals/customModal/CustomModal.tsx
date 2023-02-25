import { useEffect } from "react";
import "./customModal.scss";
import FocusTrap from "focus-trap-react";

type Props = {
  show: boolean;
  children: React.ReactNode;
  onClose: React.MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
};
const CustomModal = ({ show, onClose, title, children }: Props) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  return (
    <>
      {show ? (
        <FocusTrap>
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
        </FocusTrap>
      ) : null}
    </>
  );
};

export default CustomModal;
