
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import CarouselHome from "../components/CarouselHome";
import SearchBar from "../components/SearchBar";
import activityService from "../services/activity.services";


function HomePage() {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, user } = authContext;

  const [activitiesList, setActivitiesList] = useState([]);

  useEffect(() => {
    activityService
      .getAllActivities()
      .then((response) => {
        setActivitiesList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}, []);

  return (
    <div>
           
      {isLoggedIn ? (
        <div>
        <h3>Welcome {user.name}</h3>
        <br/>
        <SearchBar activitiesList={activitiesList} />
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