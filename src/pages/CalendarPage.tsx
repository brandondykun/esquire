import Calendar from "../components/Calendar/Calendar";

const CalendarPage = () => {
  // get the current month and year to initialize the calendar on the current month and year
  const d = new Date();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return (
    <div className="page-container">
      <Calendar month={month} year={year} />
    </div>
  );
};

export default CalendarPage;
