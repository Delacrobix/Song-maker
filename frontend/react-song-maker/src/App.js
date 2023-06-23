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
import Login from './modules/auth/pages/login';
import Signup from './modules/auth/pages/signup';
import ProtectedRoute from './modules/auth/components/protectedRoute';
import Profile from './modules/auth/pages/profile';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/community' element={<CommunitySongs />} />
        <Route path='/community/:id' element={<CardInfo />} />
        <Route path='/rhythm-selector' element={<RhythmSelector />} />
        <Route path='/results' element={<Results />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route path='/create-song/tone' element={<ToneSelector />} />
        <Route path='/home' element={<HomePage />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute path='/login'>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
