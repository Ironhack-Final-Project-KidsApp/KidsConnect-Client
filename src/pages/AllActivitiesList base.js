import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import activityService from '../services/activity.services';
import FavoriteButton from "../components/FavoriteButton";
import Rating from "../components/Rating";
import rateService from "../services/rate.services";

const ActivitiesDetailsPage = () => {
    const { idactivity } = useParams();
    const [activity, setActivity] = useState(null);  
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
                    <p>Stroller: {activity?.stroller}</p>
                    <p>Min. Age: {activity?.ageMin}</p>
                    <p>Max. Age: {activity?.ageMax}</p>
                    <p>Location: {activity?.location}</p>
                    <FavoriteButton idactivity={idactivity}/>
                    <Rating idactivity={idactivity}/>
                    {averageRating !== null && (
                        <p>Average Rating: {averageRating}</p>
                    )}
                </>
            )}
        </div>
    );
};

export default ActivitiesDetailsPage;

