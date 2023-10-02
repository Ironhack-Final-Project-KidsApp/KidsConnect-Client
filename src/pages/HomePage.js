import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import AllActivitiesList from "./AllActivitiesList";
import logo from'../assets/logo2-removebg-preview.png'
import { Button, Divider } from "@mui/material";
import './Homepage.css';
import { Link, useNavigate } from "react-router-dom";
import CarouselHome from "../components/Homepage/CarouselHome";
import HomeDescription from "../components/Homepage/HomeDescription";
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import authService from "../services/auth.services";

function HomePage() {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, user } = authContext;
  const navigate = useNavigate();

  useEffect(
    ()=>{
      if(!isLoggedIn){
      authService.startServer()
        .then(response=> console.log(response))
      }
    },[isLoggedIn])
  
  return (
    <div className="app-background">    
      {isLoggedIn ? (
        <Container maxWidth="xl" style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
          <Card sx={{ width: '90%', margin:8, background: "rgba(255, 255, 255, 1)", '@media (min-width: 768px)': { width: '90%' }  }}>
            <h3 style={{ textAlign: 'center', paddingTop: '3%' }}>Welcome {user?.name}</h3>
            <br/>
            <AllActivitiesList />
          </Card>
        </Container>
      ) : (
        <div className="Homepage">
        <Container maxWidth="xl" style={{display:'flex', flexDirection:'column', alignItems:'center'}} >
        <Card sx={{ width: '90%', margin:8, background: "rgba(255, 255, 255, 0.9)", '@media (min-width: 768px)': { width: '90%' }  }}>
          <section id="home-logo">
            <img src={logo} alt="" />
            <Divider variant="middle" sx={{ borderBottomWidth: 5 }} />
            <h2 style={{width:'100%', margin:'auto'}}>The ultimate app for kids activities.</h2>
          </section>
          <section style={{maxWidth:'100%', margin:'auto'}}>
            <CarouselHome/>
          </section>
          <Divider variant="middle" sx={{ borderBottomWidth: 5, paddingTop: 5 }} />
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
          </Card>
      </Container>
        </div>
      )}
    </div>
  );
}

export default HomePage;
