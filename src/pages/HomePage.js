
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CarouselHome from "../components/CarouselHome";
import AllActivitiesList from "./AllActivitiesList";


function HomePage() {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, user } = authContext;

  return (
    <div>
           
      {isLoggedIn ? (
        <div>
        <h3>Welcome {user?.name}</h3>
        <br/>
        <AllActivitiesList />
        </div>
      ) : (
        <div>
        <h2>Welcome to KidsConnect!</h2>
        <h4>The ultimate app for kids activities.</h4>
            <CarouselHome />
            <p>Explore a world of fun and exciting activities for kids!</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;