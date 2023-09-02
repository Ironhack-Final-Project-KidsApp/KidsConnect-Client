import { useParams } from "react-router-dom";
import activityService from "../services/activity.services";
import { useEffect, useState, useContext } from "react";
import userService from "../services/user.services";
import { AuthContext } from '../context/auth.context';

const ActivitiesDetailsPage = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const params = useParams();
    const {idactivity} = params;
    const [activity, setActivity] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    console.log("idactivity:", idactivity)

    useEffect(()=>{
        activityService
            .getActivity(idactivity)
            .then(response => setActivity(response.data));
          userService
            .toggleFavorite(idactivity)
            .then(favourite => setIsFavorite(favourite));
    },[idactivity])
    
    const handleToggleFavorite = async () => {
        try {
          const response = await userService.toggleFavorite(user._id, idactivity);
          setIsFavorite(response.data.isFavorite);
        } catch (error) {
          console.error('Error in the favorite status:', error);
        }
      };

    return (
    <div>
      {activity && (
        <>
          <img src={activity?.image} alt="activity-img" />
          <h1>{activity?.title}</h1>
          <p>Description:{activity?.description}</p>
          <p>Stroller:{activity?.stroller}</p>
          <p>Min. Age:{activity?.ageMin}</p>
          <p>Max. Age:{activity?.ageMax}</p>
          <p>Location: {activity?.location}</p>
          {isFavorite ? (
            <button onClick={handleToggleFavorite}></button>
          ) : (
            <button onClick={handleToggleFavorite}></button>
          )}
        </>
      )}
    </div>
  );
};
 
export default ActivitiesDetailsPage;