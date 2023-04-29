import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import CommunitySongs from "./pages/communitySongs";
import Results from "./pages/results";
import RhythmSelector from "./pages/rhythmSelector";
import ToneSelector from "./pages/toneSelector";
import AboutMe from "./pages/aboutMe";
import Footer from "./components/footer";

import "./static/css/responsive.css";
import "./static/css/general.css";

function App() {
  useEffect(() => {});

  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/community" element={<CommunitySongs />} />
        <Route exact path="/" element={<ToneSelector />} />
        <Route path="/rhythm-selector" element={<RhythmSelector />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about-me" element={<AboutMe />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;
