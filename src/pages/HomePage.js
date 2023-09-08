
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
// import CarouselHome from "../components/CarouselHome";
import AllActivitiesList from "./AllActivitiesList";
import logo from'../assets/logo2-removebg-preview.png'
// import KidsParkImg from '../assets/kids-park.jpg';
import { Button, CardMedia, Container, Grid, Stack } from "@mui/material";
import './Homepage.css';
import { useNavigate } from "react-router-dom";
import CarouselHome from "../components/CarouselHome";


function HomePage() {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, user } = authContext;
  const navigate = useNavigate();

  return (
    <div>
           
      {isLoggedIn ? (
        <div>
        <h3>Welcome {user?.name}</h3>
        <br/>
        <AllActivitiesList />
        </div>
      ) : (
        <div className="Homepage">
          <section style={{maxWidth:'500px', margin:'auto'}}>
            <CarouselHome/>
          </section>

          <section>
            <img src={logo} alt="" />
            <h2>The ultimate app for kids activities.</h2>
          </section>
          {/* <section> add flex property
            <img src={KidsParkImg} alt="" />
            <h2>Discover Parks</h2>
            <p></p> 
          </section> */}
          <section id="home-usertips">
            <div>
              <h2>Learn more</h2>
              <p>Explore the tips and tricks on how to use KidsConnect.</p>
            </div>
            <Button variant="contained" color="success" onClick={e=>{navigate('/usertips')}}>User Tips</Button>
          </section>
        </div>
        
        // <Container  maxWidth="sm">
        //   <img src={logo} alt="" />
        // </Container>
        // <div>
        //   
        // <h2>Welcome to KidsConnect!</h2>
        // <h4>The ultimate app for kids activities.</h4>
        //     <CarouselHome />
        //     <p>Explore a world of fun and exciting activities for kids!</p>
        // </div>
      )}
    </div>
  );
}

export default HomePage;