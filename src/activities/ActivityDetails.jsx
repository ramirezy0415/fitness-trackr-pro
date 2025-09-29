import React from "react";
import { useNavigate, useParams } from "react-router";

export default function ActivityDetails() {
  const navigate = useNavigate();
  const { activityId } = useParams();
  console.log(activityId);
  return <h1>ActivityDetails</h1>;
}
