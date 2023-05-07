import React from "react";
import { playRhythm } from "../modules/tone module/controllers/controllers";

const RhythmButton = (props) => {
  const { rhythm } = props;
  const testObject = {
    rhythm: "Bachata",
    tempo: 115,
    measureMap: [
      { chord: "C", inversion: 0, duration: 1 },
      { chord: "C", inversion: 0, duration: 1 },
      { chord: "C", inversion: 0, duration: 2 },
      { chord: "D", seventh: "7min", inversion: 0, duration: 1 },
      { chord: "G", seventh: "7min", inversion: 0, duration: 1 },
      { chord: "C", inversion: 0, duration: 2 },
    ]
  };

  return (
    <div>
      <div className="rhythm-button-container">
        <div className="rhythm-btn-title">
          <h6>{rhythm}:</h6>
        </div>
        <button
          className="rhythm-btn-left"
          onClick={() => playRhythm(testObject)}
        >
          Listen
        </button>
        <button className="rhythm-btn-right">Select</button>
      </div>
    </div>
  );
};

export default RhythmButton;
