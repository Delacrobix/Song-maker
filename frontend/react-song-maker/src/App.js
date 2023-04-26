import { useEffect } from "react";
import Navbar from "./components/navbar";
import CircleOfFifths from "./components/circleOfFifths";

import './static/css/general.css';

function App() {
  useEffect(() => {
  });

  return (
    <div className="App">
      <Navbar />
      <CircleOfFifths />
    </div>
  );
}

export default App;
