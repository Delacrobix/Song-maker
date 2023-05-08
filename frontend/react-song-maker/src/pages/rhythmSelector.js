import React from "react";
import { useLocation } from "react-router-dom";
import RhythmButton from "../components/rhythmButton";

import "../static/css/rhythmSelector.css";

const RhythmSelector = () => {
  const location = useLocation();

  const tonality = location.state.tonality;

  return (
    <div>
      <div className="rhythm-selector-container">
        <div className="rhythm-selector-title">
          <h1>Select rhythm</h1>
        </div>
        <h5>Your actually tonality: {tonality}</h5>
        <div className="rhythm-btn-component-container">
          <RhythmButton rhythm="Bachata" />
          <RhythmButton rhythm="Balada" />
          <RhythmButton rhythm="Pop" />
        </div>
      </div>
    </div>
  );
};

export default RhythmSelector;
