import { useState, useEffect } from "react";
import { getActivities, getActivity, deleteActivity } from "../api/activities";
import { Outlet, useParams } from "react-router";
import { useAuth } from "../auth/AuthContext";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const { token } = useAuth();
  const { activityId } = useParams();
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const [error, setError] = useState(null);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activityId);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };
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
    tryDelete,
    token,
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
