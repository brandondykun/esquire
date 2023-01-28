import { useState, useEffect } from "react";
import { getActivities } from "../api/apiCalls";
import { Activity } from "../types";

const useActivities = (id: string | undefined) => {
  const [activities, setActivities] = useState<Activity[]>(null!);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [activitiesError, setActivitiesError] = useState("");

  useEffect(() => {
    if (id) {
      setActivitiesError("");
      setActivitiesLoading(true);
      getActivities(Number(id))
        .then((res) => {
          if (res.status === 200) {
            setActivities(res.data);
          }
        })
        .catch((err) => {
          console.error("ERROR FETCHING ACTIVITIES", err.message);
          setActivitiesError("There was an issue fetching activities.");
        })
        .finally(() => {
          setActivitiesLoading(false);
        });
    }
  }, [id]);

  return { activities, activitiesLoading, activitiesError, setActivities };
};

export default useActivities;
