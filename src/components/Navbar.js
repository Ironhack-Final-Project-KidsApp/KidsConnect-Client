import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
//use context to change the login/logout if the user is logged in
//check module 3 week 3 to use the is active feature from navlink

function Navbar() {
  return (
    <div>
        <img src={logo} alt="logo" style={{width: '10rem'}}/>
        <nav>
            <NavLink to="/">Home</NavLink>
        
            <NavLink to="/usertips">User Tips</NavLink>

            <NavLink to="/profile">Profile</NavLink>

            <NavLink to="/login">Log in</NavLink>

            <NavLink to="/signup">Sign up</NavLink>

            <button>Log Out</button>
        </nav>
    </div>
  );
}
 
export default Navbar;