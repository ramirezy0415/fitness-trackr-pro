import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";
import { Outlet, useParams } from "react-router";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";
import { getActivity } from "../api/activities";

export default function ActivitiesPage() {
  const { activityId } = useParams();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!activityId) {
        setSelectedActivity(null);
        return;
      }

      const response = await getActivity(activityId);
      setSelectedActivity(response);
    };

    fetchDetails();
  }, [activityId]);

  const context = {
    selectedActivity,
  };
  return (
    <>
      <section>
        <h1>Activities</h1>
        <ActivityList activities={activities} syncActivities={syncActivities} />
        <ActivityForm syncActivities={syncActivities} />
      </section>
      <section>
        {selectedActivity ? (
          <Outlet context={context} />
        ) : (
          <p>Please Select an Activity to view details</p>
        )}
      </section>
    </>
  );
}
