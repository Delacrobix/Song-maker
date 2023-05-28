import { Route, Routes } from 'react-router-dom';
import Navbar from './modules/navigation/components/navbar';
import CommunitySongs from './modules/songMaker/pages/communitySongs';
import Results from './modules/songMaker/pages/results';
import RhythmSelector from './modules/songMaker/pages/rhythmSelector';
import ToneSelector from './modules/songMaker/pages/toneSelector';
import AboutMe from './modules/songMaker/pages/aboutMe';
import Footer from './modules/navigation/components/footer';
import CardInfo from './modules/songMaker/pages/cardInfo';
import HomePage from './modules/songMaker/pages/homePage';

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
