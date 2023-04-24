import { useEffect } from "react";
import { test } from "./modules/tone module/controllers/controllers";

function App() {
  useEffect(() => {
    const button = document.getElementById("button");

    button.addEventListener("click", () => {
      test();
    });
  });

  return (
    <div className="App">
      <button id="button">BOTON</button>
    </div>
  );
}

export default App;
