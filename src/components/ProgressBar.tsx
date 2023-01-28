import "./progressBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type ProgressBarProps = {
  step: number;
};

const ProgressBar = ({ step }: ProgressBarProps) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className={`progress-circle ${step >= 0 ? "complete" : ""}`}>
          {step > 0 ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <span className="progress-bar-number">1</span>
          )}
        </div>
        <div className="progress-connector connector-one"></div>
        <div className={`progress-circle ${step >= 1 ? "complete" : ""}`}>
          {step > 1 ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <span className="progress-bar-number">2</span>
          )}
        </div>
        <div className="progress-connector connector-two"></div>
        <div className={`progress-circle ${step >= 2 ? "complete" : ""}`}>
          {step > 2 ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <span className="progress-bar-number">3</span>
          )}
        </div>
      </div>
      <div className="progress-bar-labels">
        <div className={`progress-bar-label ${step >= 0 ? "complete" : ""}`}>
          Name
        </div>
        <div className={`progress-bar-label ${step >= 1 ? "complete" : ""}`}>
          Address
        </div>
        <div className={`progress-bar-label ${step >= 2 ? "complete" : ""}`}>
          Contact
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
