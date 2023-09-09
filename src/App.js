import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UserTips from './pages/UserTipsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CreateActivityPage from './pages/CreateActivityPage';
import ActivitiesDetailsPage from './pages/ActivitiesDetailsPage';
import EditActivitiesPage from './pages/EditActivitiesPage';
// import ErrorPage from './pages/ErrorPage';
import { Routes, Route } from 'react-router-dom';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
// import './App.css';
import { Box } from '@mui/material';




function App() {
  return (
    <Box
      className="App"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/usertips" element={<UserTips />} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/profile/:idprofile" element={ <IsPrivate> <ProfilePage /> </IsPrivate>} />
        <Route path="/create-activity" element={ <IsPrivate> <CreateActivityPage /> </IsPrivate>} />
        <Route path='/activity/:idactivity' element={<ActivitiesDetailsPage/>}/> {/* add middleware to protect page */}
        <Route path='/activity/:idactivity/edit' element={<EditActivitiesPage/>}/> {/* add middleware to protect page */}
      {/* <Route path="*" element={ <ErrorPage /> } />   */}  
      </Routes>

      <Footer />
    </Box>
  );
}

export default App;
