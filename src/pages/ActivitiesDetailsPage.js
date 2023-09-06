import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import activityService from '../services/activity.services';
import FavoriteButton from "../components/FavoriteButton";
import Rating from "../components/Rating";
import rateService from "../services/rate.services";
import { AuthContext } from "../context/auth.context";


const ActivitiesDetailsPage = () => {
  const { idactivity } = useParams();
  const [activity, setActivity] = useState(null);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  //test rating     
  const [averageRating, setAverageRating] = useState(null); 
  
  useEffect(() => {
    activityService.getActivity(idactivity)
    .then((response) => {
      //console.log(response.data)
      setActivity(response.data)
    })
    .catch((error) => {
      console.log(error);
    });

    // Fetch average rating
    rateService.avarageRate(idactivity)
    .then((response) => {
      console.log('rate response', response.data.result)
        setAverageRating(response.data.result);
    })
    .catch((error) => {
        console.error("Error fetching average rating:", error);
    });
  }, [idactivity])

  if (!activity) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {activity && (
        <>
          <img src={activity?.image} alt="activity-img" />
          <h1>{activity?.title}</h1>
          <p>Description: {activity?.description}</p>
          <p>Stroller: {activity?.stroller ? "Yes" : "No"}</p>
          <p>Min. Age: {activity?.ageMin}</p>
          <p>Max. Age: {activity?.ageMax}</p>
          <p>Location: {activity?.location}</p>
          <p>Priced: {activity?.priced ? "Yes" : "No"}</p>
          <p>Venue type: {activity?.venuetype}</p>
          <FavoriteButton idactivity={idactivity} />
          <Rating idactivity={idactivity} onUpdateAverageRating={updateAverageRating} />
          {averageRating !== null && (
            <p>Average Rating: {averageRating}</p>
          )}
        </>
      )}
    </div>
  );
};

export default ActivitiesDetailsPage;