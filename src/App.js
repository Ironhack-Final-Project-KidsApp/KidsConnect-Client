import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UserTips from './pages/UserTipsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import CreateActivityPage from './pages/CreateActivityPage';
// import ErrorPage from './pages/ErrorPage';
import { Routes, Route } from 'react-router-dom';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/usertips" element={<IsAnon> <UserTips /> </IsAnon>} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={ <IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/profile/:id" element={ <IsPrivate> <ProfilePage /> </IsPrivate>} />
        <Route path="/create-activity" element={ <IsPrivate> <CreateActivityPage /> </IsPrivate>} />
      {/* <Route path="*" element={ <ErrorPage /> } />   */}  
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
