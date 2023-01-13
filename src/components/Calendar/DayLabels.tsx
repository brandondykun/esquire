/**
 * Day Labels Component
 */

const DAYS_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Week day headers: Mon, Tue, Wed etc
const DayLabels = () => {
  return (
    <>
      {DAYS_SHORT.map((dayLabel, index) => {
        return (
          <div className="dayLabel cell" key={index}>
            {dayLabel}
          </div>
        );
      })}
    </>
  );
};

export default DayLabels;
