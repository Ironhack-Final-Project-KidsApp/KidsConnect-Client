import { NavLink } from 'react-router-dom';
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context"
import logo from '../assets/logo.png';

//use context to change the login/logout if the user is logged in
//check module 3 week 3 to use the is active feature from navlink

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
        <img src={logo} alt="logo" style={{width: '10rem'}}/>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/usertips">User Tips</NavLink>

          {isLoggedIn && (
            <div>
              <NavLink to="/profile">Profile</NavLink>
              <button onClick={logOutUser}>Log Out</button>
              <span>{user && user.name}</span>
            </div> 
          )}
          
          {!isLoggedIn && (
            <div>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
            </div>
          )}            
        </nav>
    </div>
  );
}
 
export default Navbar;