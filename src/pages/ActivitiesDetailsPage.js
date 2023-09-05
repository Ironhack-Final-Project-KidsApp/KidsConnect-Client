import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import userService from '../services/user.services';
import activityService from '../services/activity.services';
import { AuthContext } from '../context/auth.context';

const ActivitiesDetailsPage = () => {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const { idActivity } = useParams();
    const [activity, setActivity] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    console.log('user is:', user)
    console.log('activity is:', idActivity)
    
    //fetch activity details - done
    useEffect(() => {
      activityService.getActivity(idActivity)
      .then((response) => {
        console.log(response.data)
        setActivity(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }, [idActivity])

    if (!activity) {
      return <p>Loading...</p>;
    }

    //handle the favorite button
    const handleFavoriteButton = () => {
      try {
        if (isFavorite) {
          userService.removeFavoriteActivity(idActivity)
            .then(() => setIsFavorite(false))
            .catch((err) => console.error(err));
        } else {
          userService.addFavoriteActivity(idActivity)
            .then(() => setIsFavorite(true))
            .catch((err) => console.error(err));
        }
      } catch (err) {
        console.error(err);
      }
    };
     

//display activity details
//display button to add and remove the activity from the favourites depending on the user id    
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
                    <button onClick={handleFavoriteButton}>
                        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                </>
            )}
        </div>
    );
};

export default ActivitiesDetailsPage;