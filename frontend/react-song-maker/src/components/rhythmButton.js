import React from "react";
import { doMajorChord } from "../modules/tone module/controllers/controllers";

const RhythmButton = (props) => {
  const { rhythm } = props;

  return (
    <div>
      <div className="rhythm-button-container">
        <div className="rhythm-btn-title">
          <h6>{rhythm}:</h6>
        </div>
        <button className="rhythm-btn-left" onClick={() => doMajorChord("G", 0, "min")}>Listen</button>
        <button className="rhythm-btn-right">Select</button>
      </div>
    </div>
  );
};

export default RhythmButton;
