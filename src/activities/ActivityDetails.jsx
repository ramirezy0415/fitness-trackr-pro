import React from "react";
import { useNavigate, useOutletContext } from "react-router";

export default function ActivityDetails() {
  const navigate = useNavigate();

  const { selectedActivity, tryDelete, token } = useOutletContext();

  return (
    <section>
      <h3> {selectedActivity.name}</h3>
      <p>Description: {selectedActivity.description}</p>
      <p>Created By: {selectedActivity.creatorName}</p>
      {token && <button onClick={tryDelete}>Delete</button>}
    </section>
  );
}
