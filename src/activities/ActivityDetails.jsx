import React, { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";

export default function ActivityDetails() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const { selectedActivity } = useOutletContext();

  return (
    <section>
      <h3> {selectedActivity.name}</h3>
      <p>Description: {selectedActivity.description}</p>
      <p>Created By: {selectedActivity.creatorName}</p>
    </section>
  );
}
