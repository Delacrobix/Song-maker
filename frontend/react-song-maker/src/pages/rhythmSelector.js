import React from "react";
import { useLocation } from "react-router-dom";

const RhythmSelector = () => {
  const location = useLocation();
  console.log("TON: " + JSON.stringify(location.state));
  return <div>rhythmSelector</div>;
};

export default RhythmSelector;
