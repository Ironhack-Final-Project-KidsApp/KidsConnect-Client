import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import activityService from '../services/activity.services';
import FavoriteButton from "../components/FavoriteButton";
import Rating from "../components/Rating";
import rateService from "../services/rate.services";
import { AuthContext } from "../context/auth.context";
import DeleteActivity from "../components/DeleteActivity";

const ActivitiesDetailsPage = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const { idactivity } = useParams();
  const [activity, setActivity] = useState(null);
  const [averageRating, setAverageRating] = useState(null);

  const fetchAverageRating = () => {
    rateService.avarageRate(idactivity)
      .then((response) => {
        // console.log('rate response', response.data.result)
        setAverageRating(response.data.result);
      })
      .catch((error) => {
        console.error("Error fetching average rating:", error);
      });
  };

  useEffect(() => {
    activityService.getActivity(idactivity)
      .then((response) => {
        setActivity(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAverageRating();
  }, [idactivity]);

  useEffect(() => {
    activityService.getActivity(idactivity)
      .then((response) => {
        setActivity(response.data)
      })
      .catch((error) => {
        console.log(error);
      });

    fetchAverageRating();
  }, [idactivity]);

  const updateAverageRating = () => {
    fetchAverageRating();
  };

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
          {activity?.author?.name && <p>Author: {activity.author.name}</p>}
          {activity.author?._id === user._id ?
          <div>
            <DeleteActivity idactivity={idactivity} userid={user._id} />
            <br />
            <Link to='./edit'><button>Edit Activity</button></Link>
          </div> :<></> }
        </>
      )}
    </div>
  );
};

export default ActivitiesDetailsPage;