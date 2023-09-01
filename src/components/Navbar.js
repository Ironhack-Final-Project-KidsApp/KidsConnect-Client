import { NavLink } from 'react-router-dom';
import { useContext } from "react";                   
import { AuthContext } from "../context/auth.context"
import logo from '../assets/logo.png';

//check module 3 week 3 to use the is active feature from navlink

function Navbar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <div>
        <img src={logo} alt="logo" style={{width: '8rem'}}/>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br/>
          <NavLink to="/usertips">User Tips</NavLink>

          {isLoggedIn && (
            <div>
              <NavLink to={`/profile/${user._id}`}>Profile</NavLink>
              <br/>
              <NavLink to={`/create-activity`}>Create Activity</NavLink>
              <br />
              <button onClick={logOutUser}>Log Out</button>
            </div> 
          )}
          
          {!isLoggedIn && (
            <div>
            <NavLink to="/login">Log in</NavLink>
            <br/>
            <NavLink to="/signup">Sign up</NavLink>
            </div>
          )}            
        </nav>
    </div>
  );
}
 
export default Navbar;