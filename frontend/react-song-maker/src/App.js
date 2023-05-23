import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import CommunitySongs from './pages/communitySongs';
import Results from './pages/results';
import RhythmSelector from './pages/rhythmSelector';
import ToneSelector from './pages/toneSelector';
import AboutMe from './pages/aboutMe';
import Footer from './components/footer';
import CardInfo from './pages/cardInfo';
import HomePage from './pages/homePage';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/community' element={<CommunitySongs />} />
        <Route path='/community/:id' element={<CardInfo />} />
        <Route path='/rhythm-selector' element={<RhythmSelector />} />
        <Route path='/results' element={<Results />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route exact path='/create-song/tone' element={<ToneSelector />} />
        <Route exact path='/home' element={<HomePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
