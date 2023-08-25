//if the user its not logged in just display title/small description and some carrousel with some images
//if the user its logged in display the same and a searchbar filters and all activities

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CarouselHome from "../components/CarouselHome";

function HomePage() {
  const authContext = useContext(AuthContext);
  const { isLoggedIn, user } = authContext;

  return (
    <div>
           
      {isLoggedIn ? (
        <div>
        <h3>Welcome {user.name}</h3>
        <br/>
          <input type="text" placeholder="Search activities..." />
          {/* Add filters and activity list components here */}
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