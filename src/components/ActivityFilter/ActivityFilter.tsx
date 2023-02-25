import { useState } from "react";
import "./activityFilter.scss";

type Props = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const ActivityFilter = ({ active, setActive }: Props) => {
  return (
    <div className="activity-filter">
      <button
        className={`activity-filter-btn ${active === "all" ? "active" : ""}`}
        onClick={() => setActive("all")}
      >
        All
      </button>
      <button
        className={`activity-filter-btn ${
          active === "correspondence" ? "active" : ""
        }`}
        onClick={() => setActive("correspondence")}
      >
        Correspond
      </button>
      <button
        className={`activity-filter-btn ${
          active === "courtAppearance" ? "active" : ""
        }`}
        onClick={() => setActive("courtAppearance")}
      >
        Court
      </button>
      <button
        className={`activity-filter-btn ${active === "filing" ? "active" : ""}`}
        onClick={() => setActive("filing")}
      >
        Filing
      </button>
      <button
        className={`activity-filter-btn ${
          active === "meeting" ? "active" : ""
        }`}
        onClick={() => setActive("meeting")}
      >
        Meeting
      </button>
      <button
        className={`activity-filter-btn ${
          active === "phoneEmail" ? "active" : ""
        }`}
        onClick={() => setActive("phoneEmail")}
      >
        Phone/Email
      </button>
    </div>
  );
};

export default ActivityFilter;
