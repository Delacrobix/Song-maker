import { Route, Routes } from 'react-router-dom';
import Navbar from './modules/navigation/components/navbar';
import CommunitySongs from './modules/songMaker/pages/communitySongs';
import Results from './modules/songMaker/pages/results';
import RhythmSelector from './modules/songMaker/pages/rhythmSelector';
import ToneSelector from './modules/songMaker/pages/toneSelector';
import Footer from './modules/navigation/components/footer';
import CardInfo from './modules/songMaker/pages/cardInfo';
import HomePage from './modules/songMaker/pages/homePage';
import Login from './modules/auth/pages/login';
import Signup from './modules/auth/pages/signup';
import ProtectedRoute from './modules/auth/components/protectedRoute';
import Profile from './modules/auth/pages/profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path='/login'
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path='/signup'
          element={
            <AuthProvider>
              <Signup />
            </AuthProvider>
          }
        />

        <Route path='/community' element={<CommunitySongs />} />
        <Route path='/community/:id' element={<CardInfo />} />
        <Route path='/rhythm-selector' element={<RhythmSelector />} />
        <Route path='/results' element={<Results />} />
        <Route path='/create-song/tone' element={<ToneSelector />} />
        <Route path='/home' element={<HomePage />} />
        <Route
          path='/profile'
          element={
            <AuthProvider>
              <ProtectedRoute redirectTo='/login'>
                <Profile />
              </ProtectedRoute>
            </AuthProvider>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
