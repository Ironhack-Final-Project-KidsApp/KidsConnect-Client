import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import AllActivitiesList from "./AllActivitiesList";
import logo from'../assets/logo2-removebg-preview.png'
import { Button, Divider } from "@mui/material";
import './Homepage.css';
import { Link, useNavigate } from "react-router-dom";
import CarouselHome from "../components/Homepage/CarouselHome";
import HomeDescription from "../components/Homepage/HomeDescription";

function HomePage() {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, user } = authContext;
  const navigate = useNavigate();

  return (
    <div>    
      {isLoggedIn ? (
        <div>
        <h3 style={{ textAlign: 'center', marginTop: '3%' }}>Welcome {user?.name}</h3>
        <br/>
        <AllActivitiesList />
        </div>
      ) : (
        <div className="Homepage">
          <section id="home-logo">
            <img src={logo} alt="" />
            <h2 style={{width:'75%', margin:'auto'}}>The ultimate app for kids activities.</h2>
          </section>
          <section style={{maxWidth:'500px', margin:'auto'}}>
            <CarouselHome/>
          </section>
          <HomeDescription/>
          <Divider variant="middle" sx={{ borderBottomWidth: 5 }} />
          <section id="home-usertips">
            <div>
              <h2>Learn more</h2>
              <p style={{width:'75%', margin:'auto'}}>Explore the tips and tricks on how to use KidsConnect.</p>
            </div>
            <br />
            <Button variant="contained" color="success" onClick={e=>{navigate('/usertips')}}>User Tips</Button>
          </section>
          <Divider variant="middle" sx={{ borderBottomWidth: 5 }} />
          <section id="home-getstarted">
            <div>
              <h2>Ready?</h2>
              <p style={{width:'75%', margin:'auto'}}>Simply <Link to='/login'>Log In</Link> to start your child's adventure.</p>
            </div>
            <br />
          </section>
        </div>
      )}
    </div>
  );
}

export default HomePage;